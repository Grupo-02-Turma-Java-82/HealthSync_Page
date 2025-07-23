import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { PersonalDashboardRoutes } from "./PersonalDashboardRoutes";
import { UserRoutes } from "./DashboardRoutes";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.usuarioLogin.tipoUsuario) {
      case "ALUNO":
        return <UserRoutes />;
      case "TREINADOR":
        return <PersonalDashboardRoutes />;
      default:
        return <AppRoutes />;
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
