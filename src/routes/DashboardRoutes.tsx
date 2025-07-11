import { UserLayout } from "@/components/UserLayout";
import { UserDashboard } from "@/pages/UserDashboard";
import { Routes, Route } from "react-router";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}
