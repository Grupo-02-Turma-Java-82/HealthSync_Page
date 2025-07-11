import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Exercises } from "@/models/Exercises";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

type Props = {
  exercises: Exercises;
};

export function ExerciseItem({ exercises }: Props) {
  const createdAt = new Date(exercises.dataCriacao);

  const navigate = useNavigate();

  const distanceToNow = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-md font-bold text-foreground">{exercises.nome}</h1>
        <p className="text-sm text-muted-foreground">Criado {distanceToNow}</p>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate(`/exercicios/editar-exercicio/${exercises.id}`)}
      >
        Editar
      </Button>
    </div>
  );
}
