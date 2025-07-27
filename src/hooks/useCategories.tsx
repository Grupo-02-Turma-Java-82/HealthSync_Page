import { use } from "react";
import { CategoriesContext } from "@/contexts/CategoriesContext";

export function useCategories() {
  const context = use(CategoriesContext);

  return context;
}
