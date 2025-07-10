import { Outlet } from "react-router";
import { NavbarDashboard } from "./NavbarDashboard";

export function UserLayout() {
  return (
    <main className="w-full md:w-auto">
      <NavbarDashboard />
      <Outlet />
    </main>
  );
}
