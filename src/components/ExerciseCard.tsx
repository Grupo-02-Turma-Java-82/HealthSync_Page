import type { Exercises } from "@/models/Exercises";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
            <Youtube size={20} />
            Assistir ao vídeo de demonstração
          </a>
        )}
        <div className="text-xs text-muted-foreground mt-2">
          Criado em:{" "}
          {exercicio.dataCriacao &&
            new Date(exercicio.dataCriacao).toLocaleDateString("pt-BR")}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant={getDifficultyVariant(exercicio.nivel_dificuldade)}>
            {exercicio.nivel_dificuldade}
          </Badge>
          <Badge variant="outline">{exercicio.equipamento_necessario}</Badge>
        </div>

        <div className="flex gap-3 items-center">
          <Edit
            size={20}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate(`editar-exercicio/${exercicio.id}`)}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash
                size={20}
                className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  o exercício{" "}
                  <span className="font-semibold text-foreground">
                    {exercicio.nome}
                  </span>
                  .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteExercise(exercicio.id)}
                  className="bg-red-600 text-destructive-foreground hover:bg-red-600/90 transition-colors"
                >
                  Confirmar Exclusão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
