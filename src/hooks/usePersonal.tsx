import { use } from "react";
import { PersonalContext } from "@/contexts/PersonalContext";

export function usePersonal() {
  const context = use(PersonalContext);

  return context;
}
