import { createContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import type { Exercises, CreateExercisePayload } from "@/models/Exercises";
import { format } from "date-fns";

type ExerciseContextData = {
  isLoading: boolean;
  exercises: Exercises[];
  create: (data: CreateExercisePayload) => Promise<void>;
  update: (data: Exercises) => Promise<void>;
  delete: (id: number) => Promise<void>;
};

export const ExerciseContext = createContext({} as ExerciseContextData);

export function ExercisesProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercises[]>([]);

  async function fetchExercises() {
    try {
      setIsLoading(true);
      const response = await api.get("/exercicios");
      setExercises(response.data);
      console.log("Exercícios carregados:", response.data);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function create(exerciseData: CreateExercisePayload) {
    try {
      setIsLoading(true);
      const response = await api.post<Exercises>("/exercicios", {
        ...exerciseData,
        dataCriacao: format(new Date(), "yyyy-MM-dd"),
      });
      setExercises((prevExercises) => [...prevExercises, response.data]);
      alert("Exercício cadastrado com sucesso!");
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        alert(
          e.response?.data.message || "Não foi possível cadastrar o exercício."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function update(data: Exercises) {
    try {
      setIsLoading(true);
      await api.put(`/exercicios`, data);

      fetchExercises();
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        alert(
          e.response?.data.message || "Não foi possível atualizar o exercício."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteExercise(id: number) {
    try {
      setIsLoading(true);
      await api.delete(`/exercicios/${id}`);
      alert("Exercício excluído com sucesso!");
      setExercises((prevExercises) =>
        prevExercises.filter((ex) => ex.id !== id)
      );
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        alert(
          e.response?.data.message || "Não foi possível excluir o exercício."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (session?.token) {
      fetchExercises();
    }
  }, [session?.token]);

  return (
    <ExerciseContext.Provider
      value={{
        isLoading,
        exercises,
        create,
        update,
        delete: deleteExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
