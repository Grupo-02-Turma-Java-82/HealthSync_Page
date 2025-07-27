import type { CreateWorkoutPayload, Workout } from "@/models/Workout";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

type WorkoutContextData = {
  isLoading: boolean;
  workouts: Workout[];
  isComplete: boolean;
  create: (data: CreateWorkoutPayload) => Promise<Workout | null>;
  update: (data: Workout) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
  setComplete: (id: number) => Promise<void>;
  createWorkoutExerciseLink: (linkPayload: linkPayload) => Promise<void>;
};

type linkPayload = {
  treino: {
    id: number;
  };
  exercicio: {
    id: number;
  };
};

export const WorkoutContext = createContext({} as WorkoutContextData);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  async function fetchWorkouts() {
    try {
      setIsLoading(true);
      const response = await api.get("/treinos");
      setWorkouts(response.data ?? []);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function create(
    payload: CreateWorkoutPayload
  ): Promise<Workout | null> {
    try {
      setIsLoading(true);
      const response = await api.post("/treinos", payload);
      setWorkouts((prevWorkout) => [...prevWorkout, response.data]);
      toast.success("Treino cadastrado com sucesso!");

      return response.data;
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível cadastrar o treino."
        );
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function createWorkoutExerciseLink(payload: linkPayload) {
    await api.post("/treinoexercicios", payload);
  }

  async function update(data: Workout) {
    try {
      setIsLoading(true);
      await api.put(`/treinos`, data);

      fetchWorkouts();
      toast.success(`Treinos ${data.nome} atualizado com sucesso`);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível atualizar o treino."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWorkout(id: number) {
    try {
      setIsLoading(true);
      await api.delete(`/treinos/${id}`);
      toast.success("Treino excluído com sucesso!");
      setWorkouts((prevWorkout) =>
        prevWorkout.filter((work) => work.id !== id)
      );
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível excluir o treino."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function setComplete(id: number) {
    try {
      await api.patch(`/treinos/${id}/concluido`);
      setIsComplete(!isComplete);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message ||
            "Não foi possível marcar o treino como concluído."
        );
      }
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        isLoading,
        workouts,
        isComplete,
        create,
        update,
        deleteWorkout,
        setComplete,
        createWorkoutExerciseLink,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
