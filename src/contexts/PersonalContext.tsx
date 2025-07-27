import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/models/Users";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { ListStudents } from "@/models/ListStudents";

type PersonalContext = {
  isLoading: boolean;
  students: ListStudents[];
  create: (data: User) => Promise<void>;
};

export const PersonalContext = createContext({} as PersonalContext);

export function PersonalProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<ListStudents[]>([]);

  async function fetchStudents() {
    try {
      setIsLoading(true);
      const response = await api.get("/treinadores/meus-alunos");
      setStudents(response.data ?? []);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        console.error("API Error: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function create(data: User) {
    try {
      setIsLoading(true);
      const response = await api.post("/treinadores/alunos", data);
      setStudents((prevStudent) => [...prevStudent, response.data]);

      toast.success(`Aluno ${data.nomeCompleto} criado com sucesso`);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        console.error("API Error: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <PersonalContext.Provider value={{ isLoading, students, create }}>
      {children}
    </PersonalContext.Provider>
  );
}
