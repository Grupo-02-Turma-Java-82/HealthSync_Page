import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <main className="w-full md:w-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
