import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { PersonalSidebar } from "./personal-sidebar";
import { useUsers } from "@/hooks/useUsers";
import { UserProvider } from "@/contexts/UserContext";

export function PersonalLayout() {
  const { users } = useUsers();

  return (
    <main className="w-full md:w-auto">
      <UserProvider>
        <SidebarProvider>
          <PersonalSidebar />

          <main className="w-screen h-full">
            <NavbarDashboard
              nameUser={users[0]?.nomeCompleto}
              typeUser={users[0]?.tipoUsuario}
              photo="https://ik.imagekit.io/brunogodoy/testepersonal.jpeg?updatedAt=1752258464257"
            />
            <Outlet />
          </main>
        </SidebarProvider>
      </UserProvider>
    </main>
  );
}
