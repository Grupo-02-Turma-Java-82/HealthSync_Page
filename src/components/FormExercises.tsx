import { useEffect } from "react";
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
import type { CreateExercisePayload, Exercises } from "@/models/Exercises";
import { useExercises } from "@/hooks/useExercises";
import { useCategories } from "@/hooks/useCategories";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const formSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O nome deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  categoriaId: z.coerce
    .number()
    .positive({ message: "Selecione uma categoria." }),
  descricaoDetalhada: z.string().optional(),
  nivelDificuldade: z.enum(["INICIANTE", "INTERMEDIÁRIO", "AVANCADO"], {
    errorMap: () => ({ message: "Selecione um nível de dificuldade válido." }),
  }),
  urlVideoDemonstrativo: z
    .string()
    .url({ message: "Insira uma URL de vídeo válida." })
    .optional()
    .or(z.literal("")),
  equipamentoNecessario: z
    .string()
    .min(3, { message: "O equipamento necessário é obrigatório." })
    .optional()
    .or(z.literal("")),
});

type FormExercisesProps = {
  isEditMode?: boolean;
  initialData?: Exercises | null;
  onSubmitSuccess?: () => void;
  onClose?: () => void;
};

export function FormExercises({
  isEditMode = false,
  initialData = null,
  onSubmitSuccess,
  onClose,
}: FormExercisesProps) {
  const { create, update, isLoading } = useExercises();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      categoriaId: undefined,
      descricaoDetalhada: "",
      nivelDificuldade: "INICIANTE",
      urlVideoDemonstrativo: "",
      equipamentoNecessario: "",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData && categories.length > 0) {
      form.reset({
        nome: initialData.nome,
        categoriaId: initialData.categoria.id,
        descricaoDetalhada: initialData.descricaoDetalhada,
        nivelDificuldade: initialData.nivelDificuldade,
        urlVideoDemonstrativo: initialData.urlVideoDemonstrativo,
        equipamentoNecessario: initialData.equipamentoNecessario,
      });
    }
  }, [isEditMode, initialData, categories, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      if (!initialData?.id) {
        toast.error("ID do exercício não encontrado para atualização.");
        return;
      }
      const dataToUpdate = {
        ...initialData,
        id: initialData.id,
        ...values,
        categoria: {
          id: values.categoriaId,
        },
      };
      await update(dataToUpdate as Exercises);
    } else {
      const dataToCreate = {
        ...values,
        categoria: {
          id: values.categoriaId,
        },
      };
      await create(dataToCreate as CreateExercisePayload);
      if (onClose) onClose();
    }
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      navigate("/exercicios");
    }
  }

  if (isLoadingCategories) {
    return (
      <div className="flex items-center justify-center p-6 bg-card rounded-lg shadow-sm min-h-[400px]">
        <Loader size={32} className="animate-spin text-primary" />
      </div>
    );
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
                  {categories?.map((categoria) => (
                    <SelectItem
                      key={categoria.id}
                      value={categoria.id.toString()}
                    >
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricaoDetalhada"
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
          name="nivelDificuldade"
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
          name="urlVideoDemonstrativo"
          label="URL do Vídeo Demonstrativo"
          placeholder="Ex: https://www.youtube.com/watch?v=exemplo"
          type="url"
        />

        <FormInput
          control={form.control}
          name="equipamentoNecessario"
          label="Equipamento Necessário"
          placeholder="Ex: Halteres, Barra, Máquina"
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? (
            <Loader size={26} className="animate-spin" />
          ) : isEditMode ? (
            "Atualizar Exercício"
          ) : (
            "Cadastrar Exercício"
          )}
        </Button>

        <Button variant="outline" className="w-full" onClick={onClose}>
          Cancelar
        </Button>
      </form>
    </Form>
  );
}
