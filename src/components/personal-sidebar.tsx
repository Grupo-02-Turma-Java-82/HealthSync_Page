import {
  UsersIcon,
  BookOpen,
  LayoutDashboard,
  DumbbellIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Meus Alunos",
    url: "/alunos",
    icon: UsersIcon,
  },
  {
    title: "Biblioteca de Exercicios",
    url: "/exercicios",
    icon: BookOpen,
  },
  {
    title: "Montar Treino",
    url: "/novo-treino",
    icon: DumbbellIcon,
  },
  {
    title: "Conta/Assinatura",
    url: "/config",
    icon: SettingsIcon,
  },
];

export function PersonalSidebar() {
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full justify-start gap-4" variant="ghost">
              <LogOutIcon size={24} />
              <p className="text-base">Sair</p>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem certeza que deseja sair?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Você precisará fazer login novamente para acessar sua conta e
                continuar gerenciando seus alunos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={remove}
                className="bg-red-600 text-destructive-foreground hover:bg-red-600/90 transition-colors"
              >
                Confirmar Saída
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
