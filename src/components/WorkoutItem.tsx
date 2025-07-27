import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import type { Workout } from "@/models/Workout";

type Props = {
  workout: Workout;
};

export function WorkoutItem({ workout }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-md font-bold text-foreground">{workout.nome}</h1>
        <p className="text-sm text-muted-foreground">
          {workout.usuario.length || 1} alunos
        </p>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate(`/exercicios/editar-exercicio/${workout.id}`)}
      >
        Editar
      </Button>
    </div>
  );
}
