import { use } from "react";
import { UsersContext } from "@/contexts/UserContext";

export function useUsers() {
  const context = use(UsersContext);

  return context;
}
