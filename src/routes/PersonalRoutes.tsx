import { PersonalLayout } from "@/components/PersonalLayout";
import { NewExercise } from "@/pages/NewExercise";
import { Exercises } from "@/pages/Exercises";
import { Students } from "@/pages/Students";
import { Routes, Route } from "react-router";
import { Personal } from "@/pages/Personal";
import { ExercisesProvider } from "@/contexts/ExerciseContext";
import { PersonalProvider } from "@/contexts/PersonalContext";
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import { CategoriesProvider } from "@/contexts/CategoriesContext";
import { NewWorkout } from "@/pages/NewWorkout";

export function PersonalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PersonalLayout />}>
        <Route
          index
          element={
            <PersonalProvider>
              <WorkoutProvider>
                <CategoriesProvider>
                  <ExercisesProvider>
                    <Personal />
                  </ExercisesProvider>
                </CategoriesProvider>
              </WorkoutProvider>
            </PersonalProvider>
          }
        />
      </Route>

      <Route path="/alunos" element={<PersonalLayout />}>
        <Route
          index
          element={
            <PersonalProvider>
              <Students />
            </PersonalProvider>
          }
        />
      </Route>

      <Route path="/exercicios" element={<PersonalLayout />}>
        <Route
          index
          element={
            <CategoriesProvider>
              <ExercisesProvider>
                <Exercises />
              </ExercisesProvider>
            </CategoriesProvider>
          }
        />
      </Route>

      <Route path="/novo-treino" element={<PersonalLayout />}>
        <Route
          index
          element={
            <WorkoutProvider>
              <CategoriesProvider>
                <PersonalProvider>
                  <ExercisesProvider>
                    <NewWorkout />
                  </ExercisesProvider>
                </PersonalProvider>
              </CategoriesProvider>
            </WorkoutProvider>
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
            <CategoriesProvider>
              <ExercisesProvider>
                <NewExercise />
              </ExercisesProvider>
            </CategoriesProvider>
          }
        />
      </Route>
    </Routes>
  );
}
