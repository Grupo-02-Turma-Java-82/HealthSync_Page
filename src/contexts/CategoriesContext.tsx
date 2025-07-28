import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Categories } from "@/models/Categories";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

type CategoriesContextData = {
  isLoading: boolean;
  categories: Categories[];
  fetchCategoriesById: (id: number) => Promise<void>;
  create: (data: Categories) => Promise<void>;
  update: (data: Categories) => Promise<void>;
  deleteCategorie: (id: number) => Promise<void>;
};

export const CategoriesContext = createContext({} as CategoriesContextData);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await api.get("/categorias");
      setCategories(response.data ?? []);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCategoriesById(id: number) {
    try {
      setIsLoading(true);
      const response = await api.get(`/categorias/${id}`);
      setCategories(response.data);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function create(data: Categories) {
    try {
      setIsLoading(true);
      const response = await api.post("/categorias", data);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      toast.success("Categoria cadastrada com sucesso!");
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível cadastrar a categoria."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function update(data: Categories) {
    try {
      setIsLoading(true);
      await api.put("/categorias", data);

      fetchCategories();
      toast.success(`Categoria ${data.nome} atualizada com sucesso`);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível atualizar a categoria."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCategorie(id: number) {
    try {
      setIsLoading(true);
      await api.delete(`/categorias/${id}`);
      toast.success("Categoria excluída com sucesso!");
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("Erro da API: ", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível excluir a categoria."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (session?.token) {
      fetchCategories();
    }
  }, [session?.token]);

  return (
    <CategoriesContext.Provider
      value={{
        isLoading,
        categories,
        fetchCategoriesById,
        create,
        deleteCategorie,
        update,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
