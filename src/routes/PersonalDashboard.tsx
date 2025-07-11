import { PersonalLayout } from "@/components/PersonalLayout";
import { NewExercise } from "@/pages/NewExercise";
import { Exercises } from "@/pages/Exercises";
import { Students } from "@/pages/Students";
import { Routes, Route } from "react-router";
import { PersonalDashboard } from "@/pages/PersonalDashboard";

export function PersonalDashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PersonalLayout />}>
        <Route index element={<PersonalDashboard />} />
      </Route>

      <Route path="/alunos" element={<PersonalLayout />}>
        <Route index element={<Students />} />
      </Route>

      <Route path="/exercicios" element={<PersonalLayout />}>
        <Route index element={<Exercises />} />
      </Route>

      <Route path="/exercicio" element={<PersonalLayout />}>
        <Route index element={<NewExercise />} />
      </Route>
    </Routes>
  );
}
