import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SideBarNavMenu from "@/components/sidebar/SidebarNavmenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SideBarNavMenu />
        <section className="gap-4 p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default PrivateLayout;
