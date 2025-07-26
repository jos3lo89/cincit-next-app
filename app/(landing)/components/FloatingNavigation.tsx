"use client";

import { Home, Calendar, Users, UserPlus, GalleryVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Calendar, label: "Cronograma", href: "/schedule" },
    { icon: GalleryVertical, label: "Galeria", href: "/gallery" },
    {
      icon: Users,
      label: "Nosotros",
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
      <nav className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-2xl px-1 py-1 shadow-2xl shadow-black/20">
        <div className="relative flex items-center md:gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-2 md:px-3 xl:px-4 2xl:px-6 py-2 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-blue-600/20 shadow-lg shadow-blue-500/25 border border-blue-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }
                `}
              >
                <div className="flex justify-center items-center flex-col gap-1">
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-blue-400 scale-110"
                        : "text-slate-300 group-hover:text-white group-hover:scale-105"
                    }`}
                  />
                  <span
                    className={`
                      text-xs font-medium transition-all duration-300
                      ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-400 group-hover:text-white"
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
