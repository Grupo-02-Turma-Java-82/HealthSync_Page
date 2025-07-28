import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { UserProvider } from "@/contexts/UserContext";
import { useAuth } from "@/hooks/useAuth";

export function UserLayout() {
  const { session } = useAuth();

  return (
    <main className="w-full md:w-auto">
      <SidebarProvider>
        <UserProvider>
          <AppSidebar />
        </UserProvider>

        <main className="w-screen h-full">
          <NavbarDashboard
            nameUser={session?.usuarioLogin.nomeCompleto || "Usuário Aluno"}
            typeUser="Aluno"
            photo="https://ik.imagekit.io/brunogodoy/teste.jpeg?updatedAt=1752258404705"
          />
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
}
