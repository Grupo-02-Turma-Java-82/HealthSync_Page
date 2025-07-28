import type { Exercises } from "@/models/Exercises";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

type Props = {
  exercise: Exercises;
};

const getDifficultyVariant = (
  level: "INICIANTE" | "INTERMEDIÁRIO" | "AVANCADO"
): "default" | "secondary" | "destructive" => {
  switch (level) {
    case "INICIANTE":
      return "secondary";
    case "INTERMEDIÁRIO":
      return "default";
    case "AVANCADO":
      return "destructive";
    default:
      return "default";
  }
};

export function ExerciseInCategorieItem({ exercise }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-md">{exercise.nome}</h1>
        <span className="flex justify-center items-center gap-2">
          <Badge variant={getDifficultyVariant(exercise.nivelDificuldade)}>
            {exercise.nivelDificuldade}
          </Badge>

          <Badge variant="outline">{exercise.equipamentoNecessario}</Badge>
        </span>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate(`/exercicios/editar-exercicio/${exercise.id}`)}
      >
        Editar
      </Button>
    </div>
  );
}
