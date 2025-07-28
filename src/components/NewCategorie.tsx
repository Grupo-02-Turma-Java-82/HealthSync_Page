import { useCategories } from "@/hooks/useCategories";
import type { Categories } from "@/models/Categories";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FormCategories } from "./FormCategories";

export function NewCategorie() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { categories, isLoading } = useCategories();
  const [initialData, setInitialData] = useState<Categories | null>(null);

  useEffect(() => {
    if (!isEditMode) {
      setInitialData(null);
      return;
    }

    if (isEditMode && !isLoading) {
      const exerciseId = parseInt(id, 10);
      const foundExercise = categories.find(
        (categorie) => categorie.id === exerciseId
      );
      setInitialData(foundExercise || null);
    }
  }, [id, isEditMode, categories, isLoading]);

  if (isEditMode && isLoading) {
    return (
      <div className="flex flex-col p-6 gap-6 items-center justify-center h-screen">
        <Loader className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground">
          Carregando dados da categoria...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            {isEditMode ? "Editar Categoria" : "Criar Categoria"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {isEditMode
              ? "Edite as informações da categoria existente."
              : "Cadastre as categorias para seus alunos."}
          </p>
        </div>
      </div>

      <FormCategories isEditMode={isEditMode} initialData={initialData} />
    </div>
  );
}
