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
  const eventDate = new Date("2025-08-17T09:00:00").getTime();

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
  }, [isEventActive, eventDate]);

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  if (isEventActive) {
    return (
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500  to-cyan-700 bg-clip-text text-transparent animate-pulse">
          ¡EVENTO EN CURSO!
        </h2>
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
