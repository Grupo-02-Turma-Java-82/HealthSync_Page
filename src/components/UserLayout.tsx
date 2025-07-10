import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function UserLayout() {
  return (
    <main className="w-full md:w-auto">
      <SidebarProvider>
        <AppSidebar />

        <main className="w-screen h-full">
          <NavbarDashboard
            nameUser="Ricardo"
            typeUser="Aluno"
            photo="https://ik.imagekit.io/brunogodoy/default-image.jpg?updatedAt=1747847809671"
          />
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
}
