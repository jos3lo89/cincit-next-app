import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { Bot, NotebookTabs, UserPlus } from "lucide-react";
import { NavMain } from "./NavMain";
import { Organization } from "./Organization";

export function AppSidebar() {
  const data = {
    teams: {
      name: "Cincit",
      description: "Edición 2025",
      logo: "/robot.webp",
    },
    navMain: [
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
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <Organization teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
