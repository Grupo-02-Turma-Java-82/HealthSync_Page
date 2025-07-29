import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import { Routes } from "./routes";
import { BrowserRouter } from "react-router";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>

      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
}
