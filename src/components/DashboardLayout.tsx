import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";

export function DashboardLayout() {
  return (
    <main className="w-full md:w-auto">
      <NavbarDashboard />
      <Outlet />
    </main>
  );
}
