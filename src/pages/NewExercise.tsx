import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FormExercises } from "@/components/FormExercises";
import { useExercises } from "@/hooks/useExercises";
import type { Exercises } from "@/models/Exercises";
import { Loader } from "lucide-react";

export function NewExercise() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  const { exercises, isLoading: isExercisesLoading } = useExercises();
  const [initialData, setInitialData] = useState<Exercises | null>(null);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  useEffect(() => {
    if (isEditMode && exercises.length > 0) {
      const foundExercise = exercises.find(
        (exercise) => exercise.id === parseInt(id!)
      );
      if (foundExercise) {
        setInitialData(foundExercise);
      } else {
        console.warn(`Exercício com ID ${id} não encontrado.`);
        setInitialData(null);
      }
      setIsFetchingInitialData(false);
    } else if (!isEditMode) {
      setInitialData(null);
      setIsFetchingInitialData(false);
    } else if (isExercisesLoading) {
      setIsFetchingInitialData(true);
    } else if (isEditMode && exercises.length === 0 && !isExercisesLoading) {
      console.warn(`Nenhum exercício carregado para ID ${id}.`);
      setInitialData(null);
      setIsFetchingInitialData(false);
    }
  }, [id, isEditMode, exercises, isExercisesLoading]);

  if (isEditMode && isFetchingInitialData) {
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
