import { createContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/models/Users";
import { api } from "@/services/api";
import { AxiosError } from "axios";

type UserContextData = {
  isLoading: boolean;
  users: User[];
  update: (data: User) => Promise<void>;
  create: (
    data: Omit<
      User,
      "id" | "dataCadastro" | "exercicios" | "imc" | "tipoUsuario"
    >
  ) => Promise<void>;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUser() {
    try {
      setIsLoading(true);
      const response = await api.get("/usuarios");
      setUsers(response.data ?? []);
      console.log("Usuários carregados:", response.data);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function create(
    userData: Omit<
      User,
      "id" | "dataCadastro" | "exercicios" | "imc" | "tipoUsuario"
    >
  ) {
    try {
      setIsLoading(true);
      const response = await api.post<User>("/usuarios/cadastrar", userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      alert("Usuário cadastrado com sucesso!");
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error: ", e.response?.data.message);
        alert(
          e.response?.data.message || "Não foi possível cadastrar o usuário."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function update(data: User) {
    try {
      setIsLoading(true);

      await api.put(`/usuarios/atualizar`, data);

      alert("Aluno atualizado com sucesso!");
      fetchUser();
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error: ", e.response?.data.message);
        alert(
          e.response?.data.message || "Não foi possível atualizar o aluno."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (session?.token) {
      fetchUser();
    }
  }, [session?.token]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        users,
        update,
        create,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
