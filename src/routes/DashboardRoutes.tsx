import { DashboardLayout } from "@/components/DashboardLayout";
import { PersonalDashboard } from "@/pages/PersonalDashboard";
import { UserDashboard } from "@/pages/UserDashboard";
import { Routes, Route } from "react-router";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="/personal-dashboard" element={<PersonalDashboard />} />
      </Route>
    </Routes>
  );
}
