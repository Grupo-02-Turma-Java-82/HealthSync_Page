import { Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { UsersProvider } from "./contexts/UsersContext";
import UserDashboard from "./pages/UserDashboard";
import { Routes } from "./routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UsersProvider>
        <Routes />
      </UsersProvider>
    </ThemeProvider>
  );
}
