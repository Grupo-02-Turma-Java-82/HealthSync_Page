import { UserLayout } from "@/components/StudentLayout";
import { ExercisesProvider } from "@/contexts/ExerciseContext";
import { UserProvider } from "@/contexts/UserContext";
import UserDashboard from "@/pages/StudentDashboard";

import { Routes, Route } from "react-router";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
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
