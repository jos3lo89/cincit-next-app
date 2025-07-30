import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";

export function Organization({
  teams,
}: {
  teams: {
    name: string;
    logo: string;
    description: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={teams.logo || "/placeholder.svg"}
                alt={teams.name}
              />
            </Avatar>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{teams.name}</span>
            <span className="truncate text-xs">{teams.description}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
