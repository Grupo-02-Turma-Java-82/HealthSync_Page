import { CardDashboard } from "@/components/CardDashboard";
import { CardExercises } from "@/components/CardExercises";
import { CardUsers } from "@/components/CardUsers";
import { FormExercises } from "@/components/FormExercises";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { PlusIcon } from "lucide-react";

export function NewExercise() {
  const { users, isLoading } = useUsers();

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            Montar Exercício
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Cadastre os exercícios para seus alunos.
          </p>
        </div>
      </div>

      <FormExercises />
    </div>
  );
}
