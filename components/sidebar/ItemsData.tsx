import { Bot, NotebookTabs, UserPlus } from "lucide-react";

export const sideBarData = {
  teams: {
    name: "Cincit",
    description: "Edición 2025",
    logo: "/robot.webp",
  },
  navMain: {
    ADMINISTRATOR: [
      {
        title: "Inscripciones",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Pendientes",
            url: "#",
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
        title: "Inscripciones",
        url: "#",
        icon: UserPlus,
        isActive: true,
        items: [
          {
            title: "Pendientes",
            url: "#",
          },
        ],
      },
    ],
    PARTICIPANT: [],
  },
};
