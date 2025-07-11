import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Componentes da UI (shadcn/ui)
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";

// Componentes de formulário reutilizáveis (assumindo que existem no seu projeto)
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

// Hooks e Tipos
// import { useExercises } from "@/hooks/useExercises";
import type { Exercises } from "@/models/Exercises";

// --- 1. Schema Zod para o Formulário de Exercícios ---

const exerciseFormSchema = z.object({
  nome: z.string().min(3, { message: "O nome do exercício é obrigatório." }),
  categoriaId: z.coerce.number({ required_error: "Selecione uma categoria." }),
  url_video_demonstrativo: z
    .string()
    .url({ message: "Por favor, insira uma URL válida." })
    .or(z.literal(""))
    .optional(),
  descricao_detalhada: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),
  nivel_dificuldade: z.enum(["INICIANTE", "INTERMEDIÁRIO", "AVANCADO"], {
    required_error: "Selecione o nível de dificuldade.",
  }),
  equipamento_necessario: z
    .string()
    .min(3, { message: "Equipamento é obrigatório." }),
});

// --- 2. Componente Principal do Formulário de Exercícios ---

type FormExercisesProps = {
  isEditMode: boolean;
  initialData?: Exercises | null;
  onClose?: () => void;
};

export function FormExercises({
  isEditMode,
  initialData,
  onClose,
}: FormExercisesProps) {
  // const { addExercise, updateExercise, categories } = useExercises();

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      nome: "",
      categoriaId: undefined,
      url_video_demonstrativo: "",
      descricao_detalhada: "",
      nivel_dificuldade: undefined,
      equipamento_necessario: "",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        nome: initialData.nome,
        categoriaId: initialData.categoria.id,
        url_video_demonstrativo: initialData.url_video_demonstrativo,
        descricao_detalhada: initialData.descricao_detalhada,
        nivel_dificuldade: initialData.nivel_dificuldade,
        equipamento_necessario: initialData.equipamento_necessario,
      });
    }
  }, [isEditMode, initialData, form]);

  // async function onSubmit(values: z.infer<typeof exerciseFormSchema>) {
  //   const selectedCategory = categories.find(
  //     (cat) => cat.id === values.categoriaId
  //   );
  //   if (!selectedCategory) {
  //     alert("Categoria inválida selecionada.");
  //     return;
  //   }

  //   const dataToSend = { ...values, categoria: selectedCategory };
  //   delete (dataToSend as any).categoriaId;

  //   if (isEditMode && initialData) {
  //     await updateExercise(initialData.id, dataToSend);
  //   } else {
  //     await addExercise(dataToSend);
  //   }

  //   if (onClose) onClose();
  //   form.reset();
  // }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 bg-card border border-border p-6 rounded-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="nome"
            label="Nome do Exercício *"
            placeholder="Ex: Supino Reto"
          />
          {/* <FormSelect
            control={form.control}
            name="categoriaId"
            label="Categoria *"
            placeholder="Selecione uma categoria"
            options={categories.map((cat) => ({
              value: String(cat.id),
              label: cat.nome,
            }))}
          /> */}
        </div>

        <FormInput
          control={form.control}
          name="descricao_detalhada"
          label="Descrição Detalhada *"
          placeholder="Descreva a execução correta do exercício..."
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="nivel_dificuldade"
            label="Nível de Dificuldade *"
            placeholder="Selecione o nível"
            options={[
              { value: "INICIANTE", label: "Iniciante" },
              { value: "INTERMEDIÁRIO", label: "Intermediário" },
              { value: "AVANCADO", label: "Avançado" },
            ]}
          />
          <FormInput
            control={form.control}
            name="equipamento_necessario"
            label="Equipamento Necessário *"
            placeholder="Ex: Halteres, Barra, Nenhum"
          />
        </div>

        <FormInput
          control={form.control}
          name="url_video_demonstrativo"
          label="URL do Vídeo (Opcional)"
          placeholder="https://youtube.com/exemplo"
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" className="cursor-pointer">
            {isEditMode ? "Atualizar Exercício" : "Cadastrar Exercício"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
