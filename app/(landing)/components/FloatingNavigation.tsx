"use client";

import { Home, Calendar, Users, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Calendar, label: "Cronograma", href: "/schedule" },
    {
      icon: Users,
      label: "Sobre Nosotros",
      href: "/#about",
    },
    {
      icon: UserPlus,
      label: "¡Inscríbete!",
      href: "/#form-register",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-nav-background backdrop-blur-lg border border-nav-border rounded-2xl px-3 py-1 shadow-2xl">
        <div className="relative flex items-center gap-1">
          {navItems.map((item) => {
            // La lógica para 'isActive' funciona igual, pero ahora con 'pathname'.
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              // Usamos el componente Link de Next.js para todos los elementos.
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-3 py-2 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "shadow-glow-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                  }
                `}
              >
                <div className="flex justify-center items-center flex-col gap-1">
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-nav-active scale-110"
                        : "group-hover:scale-105"
                    }`}
                  />
                  <span
                    className={`
                      text-xs font-medium transition-all duration-300
                      ${
                        isActive
                          ? "text-nav-active"
                          : "text-nav-text-muted group-hover:text-nav-text"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
