import type { Categories } from "@/models/Categories";
import { CategorieCard } from "./CategorieCard";

type Props = {
  categories: Categories[];
};

export function CategoriesList({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((categorie) => (
        <CategorieCard key={categorie.id} categorie={categorie} />
      ))}
    </div>
  );
}
