import { AppLayout } from "@/components/AppLayout";
import { NotFound } from "@/components/NotFound";
import { UserProvider } from "@/contexts/UserContext";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Route, Routes } from "react-router";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cadastro"
          element={
            <UserProvider>
              <Register />
            </UserProvider>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
