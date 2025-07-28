import { useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateWorkoutPayload } from "@/models/Workout";
import { useWorkouts } from "@/hooks/useWorkouts";
import { usePersonal } from "@/hooks/usePersonal";
import { useExercises } from "@/hooks/useExercises";
import { Loader, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { TextareaInput } from "./TextareaInput";
import { useCategories } from "@/hooks/useCategories";

const formSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O nome deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  descricao: z.string().optional(),
  usuarioId: z.coerce
    .number({
      invalid_type_error: "Por favor, selecione um aluno.",
    })
    .positive({ message: "Por favor, selecione um aluno." }),
  exerciseIds: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "Você deve selecionar pelo menos um exercício.",
    }),
});

type FormWorkoutsProps = {
  onSubmitSuccess?: () => void;
};

export function FormWorkouts({ onSubmitSuccess }: FormWorkoutsProps) {
  const { create, createWorkoutExerciseLink, isLoading } = useWorkouts();
  const { students, isLoading: isLoadingStudents } = usePersonal();
  const { exercises, isLoading: isLoadingExercises } = useExercises();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      usuarioId: undefined,
      exerciseIds: [],
    },
  });

  const exercisesByCategory = useMemo(() => {
    if (!exercises || !categories) return {};

    return categories.reduce((acc, category) => {
      const exercisesInCategory = exercises.filter(
        (exercise) => exercise.categoria?.id === category.id
      );
      if (exercisesInCategory.length > 0) {
        acc[category.nome] = exercisesInCategory;
      }
      return acc;
    }, {} as Record<string, typeof exercises>);
  }, [exercises, categories]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleCreate(values);

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  }

  async function handleCreate(values: z.infer<typeof formSchema>) {
    try {
      const workoutPayload = {
        nome: values.nome,
        descricao: values.descricao,
        usuario: {
          id: values.usuarioId,
        },
      };

      const newWorkout = await create(workoutPayload as CreateWorkoutPayload);
      if (!newWorkout?.id) {
        toast.error("Falha ao criar o treino. O ID não foi retornado.");
        return;
      }

      const linkPromises = values.exerciseIds.map((exerciseId) => {
        const linkPayload = {
          treino: { id: newWorkout.id },
          exercicio: { id: exerciseId },
        };
        return createWorkoutExerciseLink(linkPayload);
      });

      await Promise.allSettled(linkPromises);

      toast.success("Treino e exercícios vinculados com sucesso!");
    } catch (error) {
      console.error("Erro ao criar treino:", error);
      toast.error("Ocorreu um erro ao criar o treino. Tente novamente.");
    }
  }

  const isLoadingData =
    isLoadingStudents || isLoadingExercises || isLoadingCategories;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 bg-card rounded-lg shadow-sm"
      >
        <FormInput
          control={form.control}
          name="nome"
          label="Nome do Treino *"
          placeholder="Ex: Treino A - Peito e Tríceps"
        />

        <TextareaInput
          control={form.control}
          name="descricao"
          label="Descrição"
          placeholder="Descreva o foco do treino, número de séries, descanso, etc."
          className="min-h-[120px] resize-none"
        />

        <FormField
          control={form.control}
          name="usuarioId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atribuir Aluno *</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                value={field.value?.toString()}
                disabled={isLoadingData}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno para este treino" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingStudents ? (
                    <SelectItem value="loading" disabled>
                      A carregar alunos...
                    </SelectItem>
                  ) : (
                    students?.map((student) => {
                      if (!student || !student.aluno) return null;
                      return (
                        <SelectItem
                          key={student.aluno.id}
                          value={student.aluno.id.toString()}
                        >
                          {student.aluno.nomeCompleto}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exerciseIds"
          render={() => (
            <FormItem>
              <div className="mb-4 flex justify-between items-center">
                <FormLabel className="text-base">
                  Selecione os Exercícios *
                </FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/exercicios/novo")}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Criar Exercício
                </Button>
              </div>
              {isLoadingData ? (
                <div className="flex justify-center items-center h-24">
                  <Loader size={24} className="animate-spin" />
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                  {Object.entries(exercisesByCategory).map(
                    ([categoryName, exercisesList]) => (
                      <div key={categoryName}>
                        <h3 className="text-md font-semibold mb-2">
                          {categoryName}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {exercisesList.map((exercise) => (
                            <FormField
                              key={exercise.id}
                              control={form.control}
                              name="exerciseIds"
                              render={({ field }) => (
                                <FormItem
                                  key={exercise.id}
                                  className="flex flex-row items-center space-x-3 space-y-0 p-2 rounded-md hover:bg-accent"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        exercise.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              exercise.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== exercise.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer flex-1">
                                    {exercise.nome}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 mt-4">
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <Loader size={26} className="animate-spin" />
            ) : (
              "Criar Treino"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
