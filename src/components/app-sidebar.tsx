import {
  DumbbellIcon,
  LogOutIcon,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router";
import { Button } from "./ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Treinos",
    url: "/treinos",
    icon: DumbbellIcon,
  },
  {
    title: "Meu Perfil",
    url: "/perfil",
    icon: UserRound,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return new RegExp(`^${path}(/|$)`).test(currentPath);
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground font-medium"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="py-4 px-2 border-b-[1px]">
          <h1 className="text-xl font-bold text-primary">HealthSync</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="mt-6 p-4 bg-primary/15 rounded-lg ">
            <h1 className="text-xs text-muted-foreground mb-2">
              Seu Personal Trainer
            </h1>
            <div className="flex gap-2">
              <img
                src="https://ik.imagekit.io/brunogodoy/download.jpeg?updatedAt=1752187125543"
                alt="Imagem do Personal ${img.personal}"
                className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8"
              />
              <div className="flex flex-col">
                <h1 className="text-sm font-medium text-foreground">
                  Maria Helena
                </h1>
                <p className="text-xs text-muted-foreground">
                  Personal Trainer
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-[1px] py-4">
        <Button className="w-full justify-start gap-4" variant="ghost">
          <LogOutIcon size={24} />
          <p className="text-base">Sair</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
