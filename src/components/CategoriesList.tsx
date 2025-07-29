import type { Categories } from "@/models/Categories";
import { CategorieCard } from "./CategorieCard";
import { EmptyTable } from "./EmptyTable";

type Props = {
  categories: Categories[];
};

export function CategoriesList({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.length === 0 ? (
        <div className="col-span-full flex flex-col justify-center items-center py-16">
          <EmptyTable
            icon="layout-grid"
            iconSize={44}
            title="Nenhuma categoria encontrada"
          />
        </div>
      ) : (
        categories.map((categorie) => (
          <CategorieCard key={categorie.id} categorie={categorie} />
        ))
      )}
    </div>
  );
}
