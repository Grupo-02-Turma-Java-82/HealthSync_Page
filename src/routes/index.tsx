import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import { PersonalRoutes } from "./PersonalRoutes";
import { UserRoutes } from "./StudentRoutes";
import { Loading } from "@/components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.usuarioLogin.tipoUsuario) {
      case "ALUNO":
        return <UserRoutes />;
      case "TREINADOR":
        return <PersonalRoutes />;
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
