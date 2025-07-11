import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { ExercisesProvider } from "./contexts/ExerciseContext";
import { UserProvider } from "./contexts/UserContext";

import { Routes } from "./routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <UserProvider>
          <ExercisesProvider>
            <Routes />
          </ExercisesProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
