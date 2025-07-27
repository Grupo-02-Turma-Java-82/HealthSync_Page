import { FormWorkouts } from "@/components/FormWorkouts";
import { useParams } from "react-router";

export function NewWorkout() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            {isEditMode ? "Editar Treino" : "Montar Treino"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {isEditMode
              ? "Edite as informações do treino existente."
              : "Cadastre os treinos para seus alunos."}
          </p>
        </div>
      </div>

      <FormWorkouts />
    </div>
  );
}
