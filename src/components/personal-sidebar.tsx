import {
  UsersIcon,
  BookOpen,
  LayoutDashboard,
  DumbbellIcon,
  SettingsIcon,
  LogOutIcon,
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
    url: "/personal-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Meus Alunos",
    url: "/personal-alunos",
    icon: UsersIcon,
  },
  {
    title: "Biblioteca de Exercicios",
    url: "/personal-exercicios",
    icon: BookOpen,
  },
  {
    title: "Montar Exercício",
    url: "/newExercise",
    icon: DumbbellIcon,
  },
  {
    title: "Conta/Assinatura",
    url: "/config",
    icon: SettingsIcon,
  },
];

export function PersonalSidebar() {
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
