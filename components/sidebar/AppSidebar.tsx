import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { NavMain } from "./NavMain";
import { Organization } from "./Organization";
import { auth } from "@/auth";
import { sideBarData } from "./ItemsData";

export async function AppSidebar() {
  const session = await auth();
  const role = session?.user?.role;

  const navItems = (role && sideBarData.navMain[role]) ?? [];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <Organization teams={sideBarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
