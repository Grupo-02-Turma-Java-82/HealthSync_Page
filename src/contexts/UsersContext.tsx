import type { User } from "@/models/Users";
import usersDataExample from "@/utils/users.json";
import { createContext, useEffect, useState, type ReactNode } from "react";

type DifficultyLevel = "INICIANTE" | "INTERMEDIÁRIO" | "AVANCADO";

type UsersContextData = {
  isLoading: boolean;
  users: User[];
};

export const UsersContext = createContext({} as UsersContextData);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const transformedUsers = usersDataExample.map((user) => {
        const { exercicios, ...rest } = user;

        return {
          ...rest,
          dataNascimento: new Date(user.dataNascimento),
          dataCadastro: new Date(user.dataCadastro),
          exercicios: exercicios.map((exercicio) => {
            let correctedLevel: DifficultyLevel;

            switch (exercicio.nivel_dificuldade) {
              case "Iniciante":
                correctedLevel = "INICIANTE";
                break;
              case "Intermediário":
                correctedLevel = "INTERMEDIÁRIO";
                break;
              case "Avançado":
                correctedLevel = "AVANCADO";
                break;
              default:
                correctedLevel = "INICIANTE";
                break;
            }

            return {
              ...exercicio,
              dataCriacao: new Date(exercicio.dataCriacao),
              nivel_dificuldade: correctedLevel,
            };
          }),
        };
      });

      setUsers(transformedUsers);
    } catch (e) {
      console.error("Error loading users.json file: ", e);
      alert("Não foi possível carregar os usuários do arquivo local.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ isLoading, users }}>
      {children}
    </UsersContext.Provider>
  );
}
