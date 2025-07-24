import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import { Routes } from "./routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
}
