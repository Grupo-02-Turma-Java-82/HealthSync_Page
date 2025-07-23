import { UserLayout } from "@/components/UserLayout";
import { ExercisesProvider } from "@/contexts/ExerciseContext";
import { UserProvider } from "@/contexts/UserContext";
import UserDashboard from "@/pages/UserDashboard";

import { Routes, Route } from "react-router";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserLayout />}>
        <Route
          index
          element={
            <UserProvider>
              <ExercisesProvider>
                <UserDashboard />
              </ExercisesProvider>
            </UserProvider>
          }
        />
      </Route>
    </Routes>
  );
}
