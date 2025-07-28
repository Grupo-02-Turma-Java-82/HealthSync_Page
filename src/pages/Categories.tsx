import { CategoriesList } from "@/components/CategoriesList";
import { FormCategories } from "@/components/FormCategories";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { Loader, PlusIcon } from "lucide-react";
import { useState } from "react";

export function Categories() {
  const { categories, isLoading } = useCategories();
  const [isForm, setIsForm] = useState(false);

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Veja aqui todos as suas categorias cadastrados.
          </p>
        </div>

        <Button onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon size={24} />}
          {isForm ? <p>Listar Categorias</p> : <p>Nova Categoria</p>}
        </Button>
      </div>

      {isLoading ? (
        <Loader size={32} className="animate-spin self-center mt-20" />
      ) : (
        <>
          {isForm ? (
            <FormCategories
              isEditMode={false}
              initialData={null}
              onClose={() => setIsForm(false)}
            />
          ) : (
            <CategoriesList categories={categories} />
          )}
        </>
      )}
    </div>
  );
}
