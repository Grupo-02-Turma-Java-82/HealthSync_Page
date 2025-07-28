import { NotFound } from "@/components/NotFound";
import { UserLayout } from "@/components/StudentLayout";
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import UserDashboard from "@/pages/StudentDashboard";

import { Routes, Route } from "react-router";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route
          index
          element={
            <WorkoutProvider>
              <UserDashboard />
            </WorkoutProvider>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
