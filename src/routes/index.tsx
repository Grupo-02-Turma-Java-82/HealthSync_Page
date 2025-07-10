import { BrowserRouter } from "react-router";
import { DashboardRoutes } from "./DashboardRoutes";
import { AppRoutes } from "./AppRoutes";

export function Routes() {
  const session = false;

  // function Route() {
  //   switch (session) {
  //     case false:
  //       return <DashboardRoutes />;
  //     default:
  //       return <AppRoutes />;
  //   }
  // }

  return (
    <BrowserRouter>
      <DashboardRoutes />
    </BrowserRouter>
  );
}
