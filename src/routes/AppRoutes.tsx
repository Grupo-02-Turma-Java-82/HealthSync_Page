import { AppLayout } from "@/components/AppLayout";
import { UserLayout } from "@/components/UserLayout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import UserDashboard from "@/pages/UserDashboard";
import { Route, Routes } from "react-router";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Route>

      <Route path="/usuario-dashboard" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}
