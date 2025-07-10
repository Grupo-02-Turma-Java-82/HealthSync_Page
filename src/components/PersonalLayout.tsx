import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";
import { SidebarProvider } from "./ui/sidebar";
import { PersonalSidebar } from "./personal-sidebar";

export function PersonalLayout() {
  return (
    <main className="w-full md:w-auto">
      <SidebarProvider>
        <PersonalSidebar />

        <main className="w-screen h-full">
          <NavbarDashboard
            nameUser="Ricardo"
            typeUser="Personal Trainer"
            photo="https://ik.imagekit.io/brunogodoy/default-image.jpg?updatedAt=1747847809671"
          />
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
}
