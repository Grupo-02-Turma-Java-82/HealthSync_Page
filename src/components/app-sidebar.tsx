import { LogOutIcon, LayoutDashboard } from "lucide-react";

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
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Treinos",
  //   url: "/treinos",
  //   icon: DumbbellIcon,
  // },
  // {
  //   title: "Meu Perfil",
  //   url: "/perfil",
  //   icon: UserRound,
  // },
];

export function AppSidebar() {
  const { users, isLoading } = useUsers();
  const { remove } = useAuth();

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return new RegExp(`^${path}(/|$)`).test(currentPath);
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground font-medium"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  const personalTrainer = users.find(
    (user) => user.tipoUsuario === "TREINADOR"
  );

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
                src="https://ik.imagekit.io/brunogodoy/testepersonal.jpeg?updatedAt=1752258464257"
                alt="Imagem do Personal"
                className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8"
              />
              <div className="flex flex-col">
                {isLoading ? (
                  <p className="text-sm font-medium animate-pulse">
                    Carregando...
                  </p>
                ) : personalTrainer ? (
                  <h1 className="text-sm font-medium text-foreground">
                    Roberto souza
                  </h1>
                ) : (
                  <h1 className="text-sm font-medium text-foreground">
                    Personal não encontrado
                  </h1>
                )}
                <p className="text-xs text-muted-foreground">
                  Personal Trainer
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-[1px] py-4">
        <Button
          className="w-full justify-start gap-4"
          variant="ghost"
          onClick={() => remove()}
        >
          <LogOutIcon size={24} />
          <p className="text-base">Sair</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
