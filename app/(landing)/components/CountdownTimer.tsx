"use client";

import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const eventDate = new Date("2025-08-15T09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
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
  );
};
export default CountdownTimer;
