import type { Exercises } from "@/models/Exercises";
import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ExercisesCardProps {
  exercise: Exercises;
}

export default function ExercisesCard({ exercise }: ExercisesCardProps) {
  const iniciarTreino = () => {
    console.log("Iniciando exercício:", exercise.nome);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg bg-background/50">
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{exercise.nome}</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {exercise.equipamentoNecessario || "Peso corporal"} •{" "}
          {exercise.nivelDificuldade.toLowerCase()}
        </p>
      </div>

      <Button onClick={iniciarTreino} size="sm">
        <PlayIcon className="mr-2 h-4 w-4" />
        Iniciar
      </Button>
    </div>
  );
}
