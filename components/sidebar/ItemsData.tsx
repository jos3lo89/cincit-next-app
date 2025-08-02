import { Bot, NotebookTabs, UserPlus, Home } from "lucide-react"; // Asegúrate de importar Home

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
        ],
      },
      {
        title: "Inscripciones",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Pendientes",
            url: "/private/pending-inscriptions",
          },
          {
            title: "Aprovados",
            url: "/private/inscriptions/approved",
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
            url: "#",
          },
        ],
      },
      {
        title: "Usuarios",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Inscriptores",
            url: "#",
          },
          {
            title: "Administradores",
            url: "#",
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
