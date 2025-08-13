"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const calculateTimeLeft = (distance: number) => {
  if (distance > 0) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const CountdownTimer = () => {
  const eventDate = new Date("2025-08-13T18:10:00").getTime();

  const getInitialState = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;
    return {
      isActive: distance <= 0,
      initialTime: calculateTimeLeft(distance),
    };
  };

  const [isEventActive, setIsEventActive] = useState(
    getInitialState().isActive
  );

  const [timeLeft, setTimeLeft] = useState(getInitialState().initialTime);

  useEffect(() => {
    // Si el evento ya está activo al cargar, no necesitamos iniciar el intervalo.
    if (isEventActive) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft(calculateTimeLeft(distance));
      } else {
        setIsEventActive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isEventActive, eventDate]); // Se añade isEventActive a las dependencias

  // El resto del componente no cambia...
  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  if (isEventActive) {
    return (
      <div className="text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gradient">
          ¡El evento está en curso!
        </h2>
        <Link
          href="/schedule"
          className="text-lg text-blue-400 hover:text-blue-300 transition-colors underline"
        >
          Ver cronograma
        </Link>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-muted-foreground">
        El evento comienza en:
      </h3>
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="glass-card p-4 rounded-xl text-center hover-glow animate-fade-in-up cursor-default"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl font-bold text-gradient mb-1">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CountdownTimer;
