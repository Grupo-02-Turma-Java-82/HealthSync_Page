import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { Loader, PlusIcon } from "lucide-react";
import { FormExercises } from "@/components/FormExercises";
import { ExerciseList } from "@/components/ExerciseList";

export function Exercises() {
  const { users, isLoading } = useUsers();
  const [isForm, setIsForm] = useState(false);

  const allExercises = users?.flatMap((user) => user.exercicios) || [];

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">Exercícios</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Veja aqui todos os seus exercícios cadastrados.
          </p>
        </div>

        <Button onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon size={24} />}
          {isForm ? <p>Listar Exercícios</p> : <p>Novo Exercício</p>}
        </Button>
      </div>

      {isLoading ? (
        <Loader size={32} className="animate-spin self-center mt-20" />
      ) : (
        <>
          {isForm ? (
            <FormExercises isEditMode={isForm} />
          ) : (
            <ExerciseList exercises={allExercises} />
          )}
        </>
      )}
    </div>
  );
}
