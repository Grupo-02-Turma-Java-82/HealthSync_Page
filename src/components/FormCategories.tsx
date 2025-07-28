import { useCategories } from "@/hooks/useCategories";
import type { Categories } from "@/models/Categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { Form } from "./ui/form";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { TextareaInput } from "./TextareaInput";

const formSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O nome deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  descricao: z.string().optional(),
});

type FormCategoriesProps = {
  isEditMode?: boolean;
  initialData?: Categories | null;
  onSubmitSucess?: () => void;
  onClose?: () => void;
};

export function FormCategories({
  initialData,
  isEditMode = false,
  onClose,
  onSubmitSucess,
}: FormCategoriesProps) {
  const { create, update, isLoading } = useCategories();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        nome: initialData.nome,
        descricao: initialData.descricao,
      });
    } else {
      form.reset({
        nome: "",
        descricao: "",
      });
    }
  }, [isEditMode, initialData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          toast.error("ID da categoria não encontrada para atualização");
          return;
        }
        const dataToUpdate = {
          ...initialData,
          ...values,
        };
        await update(dataToUpdate);
      } else {
        const dataToCreate = {
          ...values,
        };
        await create(dataToCreate as Categories);
      }

      if (onSubmitSucess) {
        onSubmitSucess();
      } else {
        navigate("/categorias");
      }
      if (onClose) onClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      toast.error("Não foi possível salvar a categoria.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 bg-card rounded-lg shadow-sm min-h-[300px]">
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
          label="Nome da Categoria *"
          placeholder="Ex: Peito, Costas, Cardio..."
        />
        <TextareaInput
          control={form.control}
          name="descricao"
          label="Descrição"
          placeholder="Descreva o propósito desta categoria de exercícios."
          className="min-h-[120px] resize-none"
        />
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose ? onClose : () => navigate("/categorias")}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : isEditMode ? (
              "Atualizar Categoria"
            ) : (
              "Criar Categoria"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
