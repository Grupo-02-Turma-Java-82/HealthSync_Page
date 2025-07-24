import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";
import { useTheme } from "./components/theme-provider";

function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <Routes />
      <ToastContainer theme={theme} autoClose={3000} style={{ zIndex: 9999 }} />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
