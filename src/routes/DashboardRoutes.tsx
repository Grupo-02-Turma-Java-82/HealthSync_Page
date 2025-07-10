import { PersonalLayout } from "@/components/PersonalLayout";
import { UserLayout } from "@/components/UserLayout";
import { PersonalDashboard } from "@/pages/PersonalDashboard";
import { Students } from "@/pages/Students";
import { UserDashboard } from "@/pages/UserDashboard";
import { Routes, Route } from "react-router";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>

      <Route path="/personal-dashboard" element={<PersonalLayout />}>
        <Route index element={<PersonalDashboard />} />
      </Route>

      <Route path="/personal-alunos" element={<PersonalLayout />}>
        <Route index element={<Students />} />
      </Route>
    </Routes>
  );
}
