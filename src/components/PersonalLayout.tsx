import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { PersonalSidebar } from "./personal-sidebar";
import { UserProvider } from "@/contexts/UserContext";
import { useAuth } from "@/hooks/useAuth";

export function PersonalLayout() {
  const { session } = useAuth();

  return (
    <main className="w-full md:w-auto">
      <UserProvider>
        <SidebarProvider>
          <PersonalSidebar />

          <main className="w-screen h-full">
            <NavbarDashboard
              nameUser={
                session?.usuarioLogin.nomeCompleto || "Usuário Treinador"
              }
              typeUser="Personal Trainer"
              photo="https://ik.imagekit.io/brunogodoy/testepersonal.jpeg?updatedAt=1752258464257"
            />
            <Outlet />
          </main>
        </SidebarProvider>
      </UserProvider>
    </main>
  );
}
