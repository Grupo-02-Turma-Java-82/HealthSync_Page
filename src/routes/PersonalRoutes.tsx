import { PersonalLayout } from "@/components/PersonalLayout";
import { NewExercise } from "@/pages/NewExercise";
import { Exercises } from "@/pages/Exercises";
import { Students } from "@/pages/Students";
import { Routes, Route } from "react-router";
import { PersonalDashboard } from "@/pages/PersonalDashboard";
import { UserProvider } from "@/contexts/UserContext";
import { ExercisesProvider } from "@/contexts/ExerciseContext";

export function PersonalDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PersonalLayout />}>
        <Route
          index
          element={
            <ExercisesProvider>
              <PersonalDashboard />
            </ExercisesProvider>
          }
        />
      </Route>

      <Route path="/alunos" element={<PersonalLayout />}>
        <Route
          index
          element={
            <UserProvider>
              <Students />
            </UserProvider>
          }
        />
      </Route>

      <Route path="/exercicios" element={<PersonalLayout />}>
        <Route
          index
          element={
            <ExercisesProvider>
              <Exercises />
            </ExercisesProvider>
          }
        />
      </Route>

      <Route path="/novo-exercicio" element={<PersonalLayout />}>
        <Route
          index
          element={
            <ExercisesProvider>
              <NewExercise />
            </ExercisesProvider>
          }
        />
      </Route>

      <Route
        path="/exercicios/editar-exercicio/:id"
        element={<PersonalLayout />}
      >
        <Route
          index
          element={
            <ExercisesProvider>
              <NewExercise />
            </ExercisesProvider>
          }
        />
      </Route>
    </Routes>
  );
}
