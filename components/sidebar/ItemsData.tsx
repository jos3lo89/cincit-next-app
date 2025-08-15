import { Bot, NotebookTabs, UserPlus, Home, Settings } from "lucide-react"; // Asegúrate de importar Home
import { title } from "process";

export const sideBarData = {
  teams: {
    name: "Cincit",
    description: "Edición 2025",
    logo: "/robot.webp",
  },
  navMain: {
    ADMINISTRATOR: [
      {
        title: "Inicio",
        url: "/private/admin",
        icon: Home,
      },
      {
        title: "Asistencia",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Llamar lista",
            url: "/private/attendance-call",
          },
          {
            title: "Control de asistencia",
            url: "/private/attendance-control",
          },
        ],
      },
      {
        title: "Inscripciones",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Todos",
            url: "/private/inscriptions/all",
          },
          {
            title: "Pendientes",
            url: "/private/inscriptions/pending",
          },
          {
            title: "Aprovados",
            url: "/private/inscriptions/approved",
          },
          {
            title: "Rechazados",
            url: "/private/inscriptions/rejected",
          },
        ],
      },
      {
        title: "Reportes",
        url: "#",
        icon: NotebookTabs,
        items: [
          {
            title: "Asistentes",
            url: "/private/reports",
          },
        ],
      },
      {
        title: "Usuarios",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Cambiar rol",
            url: "/private/user/change-role",
          },
        ],
      },
    ],

    INSCRIBER: [
      {
        title: "Inicio",
        url: "/private/attendance",
        icon: Home,
      },
      {
        title: "Asistencia",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Llamar lista",
            url: "/private/attendance",
          },
        ],
      },
      {
        title: "Inscripciones",
        url: "#",
        icon: UserPlus,
        items: [
          {
            title: "Pendientes",
            url: "/private/pending-inscriptions",
          },
          {
            title: "Aprovados",
            url: "/private/inscriptions/approved",
          },
          {
            title: "Rechazados",
            url: "/private/inscriptions/rejected",
          },
        ],
      },
    ],

    PARTICIPANT: [
      {
        title: "Página Principal",
        url: "/",
        icon: Home,
      },
    ],
  },
};
