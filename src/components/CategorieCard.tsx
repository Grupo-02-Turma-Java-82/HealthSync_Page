import type { Categories } from "@/models/Categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExerciseInCategorieItem } from "./ExerciseInCategorieItem";
import { useState } from "react";
import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { useCategories } from "@/hooks/useCategories";

interface CategoriesCardProps {
  categorie: Categories;
}

export function CategorieCard({ categorie }: CategoriesCardProps) {
  const { deleteCategorie } = useCategories();
  const [showAll, setShowAll] = useState(false);

  const exercises = categorie.exercicios || [];
  const displayedExercises = showAll ? exercises : exercises.slice(0, 4);

  const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full hover:scale-105 transition ease-in-out">
      <CardHeader>
        <CardTitle className="text-2xl">{categorie.nome}</CardTitle>
        <CardDescription className="text-md">
          {categorie.descricao}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4">
        <h1 className="text-xl">Exercícios:</h1>
        {exercises.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {displayedExercises.map((exercicio) => (
                <ExerciseInCategorieItem
                  key={exercicio.id}
                  exercise={exercicio}
                />
              ))}
            </div>

            {exercises.length > 4 && (
              <Button
                variant="ghost"
                className="mt-2 self-center p-0 hover:bg-transparent text-lg w-full"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Ver menos" : "Ver mais"}
              </Button>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum exercício nesta categoria.
          </p>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex gap-3 items-center">
          <Edit
            size={20}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() =>
              navigate(`/categorias/editar-categoria/${categorie.id}`)
            }
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
                  Tem a certeza de que deseja excluir permanentemente a
                  categoria{" "}
                  <span className="font-semibold text-foreground">
                    "{categorie.nome}"
                  </span>
                  ? Os exercícios associados não serão apagados, mas ficarão sem
                  categoria. Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteCategorie(categorie.id)}
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
