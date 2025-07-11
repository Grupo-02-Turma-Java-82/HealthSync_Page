import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Categories } from "@/models/Categories";
import { useExercises } from "@/hooks/useExercises";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import type { CreateExercisePayload } from "@/models/Exercises";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";

const formSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O nome deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  categoriaId: z.coerce
    .number()
    .positive({ message: "Selecione uma categoria." }),
  descricao_detalhada: z.string().optional(),
  nivel_dificuldade: z.enum(["INICIANTE", "INTERMEDIÁRIO", "AVANCADO"], {
    errorMap: () => ({ message: "Selecione um nível de dificuldade válido." }),
  }),
  url_video_demonstrativo: z
    .string()
    .url({ message: "Insira uma URL de vídeo válida." })
    .optional()
    .or(z.literal("")),
  equipamento_necessario: z
    .string()
    .min(3, { message: "O equipamento necessário é obrigatório." })
    .optional()
    .or(z.literal("")),
});

type FormExercisesProps = {
  // isEditMode?: boolean;
  // initialData?: Exercises | null;
  // onSubmitSuccess?: () => void;
};

export function FormExercises({}: FormExercisesProps) {
  const { create, isLoading } = useExercises();

  const navigate = useNavigate();

  const [categories, setCategories] = useState<Categories[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      categoriaId: undefined,
      descricao_detalhada: "",
      nivel_dificuldade: "INICIANTE",
      url_video_demonstrativo: "",
      equipamento_necessario: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      setIsCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const response = await api.get<Categories[]>("/categorias");
        setCategories(response.data || []);
      } catch (e) {
        console.error("Erro ao buscar categorias:", e);
        if (e instanceof AxiosError) {
          setCategoriesError(
            e.response?.data.message ||
              "Não foi possível carregar as categorias."
          );
        } else {
          setCategoriesError(
            "Ocorreu um erro desconhecido ao carregar categorias."
          );
        }
      } finally {
        setIsCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedCategory = categories.find(
      (cat) => cat.id === values.categoriaId
    );

    if (!selectedCategory) {
      console.error("Categoria selecionada inválida ou não encontrada.");
      form.setError("categoriaId", {
        type: "manual",
        message: "Selecione uma categoria válida.",
      });
      return;
    }

    const newExerciseData: CreateExercisePayload = {
      nome: values.nome,
      categoria: selectedCategory,
      descricao_detalhada: values.descricao_detalhada ?? "",
      nivel_dificuldade: values.nivel_dificuldade,
      url_video_demonstrativo: values.url_video_demonstrativo ?? "",
      equipamento_necessario: values.equipamento_necessario ?? "",
    };

    if (!newExerciseData.categoria) {
      console.error("Categoria selecionada inválida.");
      form.setError("categoriaId", {
        type: "manual",
        message: "Selecione uma categoria válida.",
      });
      return;
    }

    create(newExerciseData);
    navigate("/exercicios");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 bg-card rounded-lg shadow-sm"
      >
        <FormInput
          control={form.control}
          name="nome"
          label="Nome do Exercício *"
          placeholder="Ex: Supino Reto com Barra"
        />

        <FormField
          control={form.control}
          name="categoriaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria *</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isCategoriesLoading ? (
                    <SelectItem value="loading-placeholder" disabled>
                      Carregando categorias...
                    </SelectItem>
                  ) : categoriesError ? (
                    <SelectItem
                      value="error-placeholder"
                      disabled
                      className="text-red-500"
                    >
                      {categoriesError}
                    </SelectItem>
                  ) : categories.length === 0 ? (
                    <SelectItem value="no-categories-placeholder" disabled>
                      Nenhuma categoria encontrada.
                    </SelectItem>
                  ) : (
                    categories.map((categoria) => (
                      <SelectItem
                        key={categoria.id}
                        value={categoria.id.toString()}
                      >
                        {categoria.nome}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao_detalhada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Detalhada</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o exercício em detalhes..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nivel_dificuldade"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Nível de Dificuldade *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="INICIANTE" />
                    </FormControl>
                    <FormLabel className="font-normal">Iniciante</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="INTERMEDIÁRIO" />
                    </FormControl>
                    <FormLabel className="font-normal">Intermediário</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="AVANCADO" />
                    </FormControl>
                    <FormLabel className="font-normal">Avançado</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInput
          control={form.control}
          name="url_video_demonstrativo"
          label="URL do Vídeo Demonstrativo"
          placeholder="Ex: https://www.youtube.com/watch?v=exemplo"
          type="url"
        />

        <FormInput
          control={form.control}
          name="equipamento_necessario"
          label="Equipamento Necessário"
          placeholder="Ex: Halteres, Barra, Máquina"
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? (
            <Loader size={26} className="animate-spin" />
          ) : (
            "Cadastrar Exercício"
          )}
        </Button>
      </form>
    </Form>
  );
}
