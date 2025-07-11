import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useUsers } from "@/hooks/useUsers";

export function UserLayout() {
  const { users } = useUsers();

  return (
    <main className="w-full md:w-auto">
      <SidebarProvider>
        <AppSidebar />

        <main className="w-screen h-full">
          <NavbarDashboard
            nameUser={users[0]?.nomeCompleto}
            typeUser={users[0]?.tipoUsuario}
            photo="https://ik.imagekit.io/brunogodoy/Z.png?updatedAt=1752202872620"
          />
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
}
