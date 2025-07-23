import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import { PersonalDashboardRoutes } from "./PersonalDashboardRoutes";
import { UserRoutes } from "./DashboardRoutes";
import { Loading } from "@/components/Loading";

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
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
