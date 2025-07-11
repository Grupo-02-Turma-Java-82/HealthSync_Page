import type { User } from "@/models/Users";
import usersDataExample from "@/utils/users.json";
import { createContext, useEffect, useState, type ReactNode } from "react";

type DifficultyLevel = "INICIANTE" | "INTERMEDIÁRIO" | "AVANCADO";

type UsersContextData = {
  isLoading: boolean;
  users: User[];
  addUser: (user: Omit<User, "id" | "dataCadastro" | "exercicios">) => void;
  updateUser: (id: number, updatedData: Partial<User>) => void;
};

export const UsersContext = createContext({} as UsersContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    } finally {
      setIsLoading(false);
    }
  }

  function addUser(userData: Omit<User, "id" | "dataCadastro" | "exercicios">) {
    const newUser: User = {
      ...userData,
      id: Date.now(),
      dataCadastro: new Date(),
      exercicios: [],
    };
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  }

  function updateUser(id: number, updatedData: Partial<User>) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      )
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ isLoading, users, addUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}
