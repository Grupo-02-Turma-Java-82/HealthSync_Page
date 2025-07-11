import type { Exercises } from "@/models/Exercises";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Youtube } from "lucide-react";
import { useExercises } from "@/hooks/useExercises";
import { useNavigate } from "react-router";

interface ExerciseCardProps {
  exercicio: Exercises;
}

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

export function ExerciseCard({ exercicio }: ExerciseCardProps) {
  const { delete: deleteExercise } = useExercises();

  const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full hover:scale-105 transition ease-in-out">
      <CardHeader>
        <CardTitle>{exercicio.nome}</CardTitle>
        <CardDescription>{exercicio.categoria?.nome}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">
          {exercicio.descricao_detalhada}
        </p>
        {exercicio.url_video_demonstrativo && (
          <a
            href={exercicio.url_video_demonstrativo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-blue-500 hover:underline mb-4"
          >
            <Youtube size={24} />
            Assistir ao vídeo de demonstração
          </a>
        )}
        <div className="text-xs text-muted-foreground mt-2 sm:mt-0">
          Criado em:{" "}
          {exercicio.dataCriacao &&
            new Date(exercicio.dataCriacao).toLocaleDateString("pt-BR")}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-2 sm:flex-row sm:flex-wrap sm:justify-between sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Badge variant={getDifficultyVariant(exercicio.nivel_dificuldade)}>
            {exercicio.nivel_dificuldade}
          </Badge>
          <Badge variant="outline">{exercicio.equipamento_necessario}</Badge>
        </div>

        <div className="flex w-full justify-between">
          <div className="text-xs text-muted-foreground mt-2">
            Criado em:{" "}
            {new Date(exercicio.dataCriacao).toLocaleDateString("pt-BR")}
          </div>

          <div className="flex gap-2 mt-2">
            <Edit
              size={20}
              className="hover:opacity-70 transition ease-in-out cursor-pointer"
              onClick={() => navigate(`editar-exercicio/${exercicio.id}`)}
            />
            <Trash
              size={20}
              className="hover:text-red-700 transition ease-in-out cursor-pointer"
              onClick={() => {
                if (window.confirm("Deseja realmente apagar o exercicio?")) {
                  deleteExercise(exercicio.id);
                }
              }}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
