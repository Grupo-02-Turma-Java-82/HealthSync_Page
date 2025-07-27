import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FormExercises } from "@/components/FormExercises";
import { useExercises } from "@/hooks/useExercises";
import type { Exercises } from "@/models/Exercises";
import { Loader } from "lucide-react";

export function NewExercise() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { exercises, isLoading: isExercisesLoading } = useExercises();
  const [initialData, setInitialData] = useState<Exercises | null>(null);

  useEffect(() => {
    if (!isEditMode) {
      setInitialData(null);
      return;
    }

    if (isEditMode && !isExercisesLoading) {
      const exerciseId = parseInt(id, 10);
      const foundExercise = exercises.find(
        (exercise) => exercise.id === exerciseId
      );
      setInitialData(foundExercise || null);
    }
  }, [id, isEditMode, exercises, isExercisesLoading]);

  if (isEditMode && isExercisesLoading) {
    return (
      <div className="flex flex-col p-6 gap-6 items-center justify-center h-screen">
        <Loader className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground">
          Carregando dados do exercício...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            {isEditMode ? "Editar Exercício" : "Montar Exercício"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {isEditMode
              ? "Edite as informações do exercício existente."
              : "Cadastre os exercícios para seus alunos."}
          </p>
        </div>
      </div>

      <FormExercises isEditMode={isEditMode} initialData={initialData} />
    </div>
  );
}
