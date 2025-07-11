import { use } from "react";
import { UserContext } from "@/contexts/UserContext";

export function useUsers() {
  const context = use(UserContext);

  return context;
}
