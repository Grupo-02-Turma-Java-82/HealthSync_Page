import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { useUsers } from "@/hooks/useUsers";
import { z } from "zod";
import type { User } from "@/models/Users";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { usePersonal } from "@/hooks/usePersonal";
import type { ListStudents } from "@/models/ListStudents";

const formSchema = z.object({
  nomeCompleto: z.string().min(3, { message: "Nome completo é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  urlImagem: z.string().url({ message: "Por favor, insira uma URL válida." }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
    .optional()
    .or(z.literal("")),
  dataNascimento: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de nascimento inválida.",
  }),
  genero: z.enum(["Masculino", "Feminino", "Não-binário", "Outro"]),
  alturaCm: z.coerce
    .number()
    .positive({ message: "Altura deve ser um número positivo." }),
  pesoKg: z.coerce
    .number()
    .positive({ message: "Peso deve ser um número positivo." }),
  objetivoPrincipal: z.string().min(3, { message: "Objetivo é obrigatório." }),
  tipoUsuario: z.enum(["ALUNO", "TREINADOR", "ADMINISTRADOR"]),
});

type FormStudentsProps = {
  isEditMode: boolean;
  initialData?: ListStudents | null;
  onClose?: () => void;
};

export function FormStudents({
  isEditMode,
  initialData,
  onClose,
}: FormStudentsProps) {
  const { update } = useUsers();
  const { create } = usePersonal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      urlImagem: "",
      senha: "",
      dataNascimento: "",
      genero: "Masculino",
      alturaCm: 0,
      pesoKg: 0,
      objetivoPrincipal: "",
      tipoUsuario: "ALUNO",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData?.aluno) {
      form.reset({
        nomeCompleto: initialData.aluno.nomeCompleto,
        email: initialData.aluno.email,
        urlImagem: initialData.aluno.urlImagem,
        dataNascimento: format(
          new Date(initialData.aluno.dataNascimento),
          "yyyy-MM-dd"
        ),
        genero: initialData.aluno.genero as
          | "Masculino"
          | "Feminino"
          | "Não-binário"
          | "Outro",
        alturaCm: initialData.aluno.alturaCm,
        pesoKg: initialData.aluno.pesoKg,
        objetivoPrincipal: initialData.aluno.objetivoPrincipal,
        tipoUsuario: initialData.aluno.tipoUsuario,
      });
    } else {
      form.reset({
        nomeCompleto: "",
        email: "",
        urlImagem: "",
        senha: "",
        dataNascimento: "",
        genero: "Masculino",
        alturaCm: 0,
        pesoKg: 0,
        objetivoPrincipal: "",
        tipoUsuario: "ALUNO",
      });
    }
  }, [isEditMode, initialData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      if (!initialData?.aluno?.id) {
        toast.error("ID do usuário não encontrado para atualização.");
        return;
      }

      const updatePayload: Partial<User> = {
        ...values,
      };

      if (!values.senha) {
        delete updatePayload.senha;
      }

      const dataToUpdate = {
        ...initialData.aluno,
        ...updatePayload,
        id: initialData.aluno.id,
      };

      try {
        console.log(dataToUpdate);
        await update(dataToUpdate as User);
        toast.success("Aluno atualizado com sucesso!");
        if (onClose) onClose();
      } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        toast.error("Não foi possível atualizar o aluno.");
      }
    } else {
      if (!values.senha) {
        form.setError("senha", { message: "Senha é obrigatória." });
        return;
      }

      const dataToCreate: Omit<
        User,
        "id" | "dataCadastro" | "exercicios" | "imc"
      > = {
        ...values,
        senha: values.senha,
        ativo: true,
        dataDesativacao: "",
      };

      try {
        await create(dataToCreate as User);
        form.reset();
        if (onClose) onClose();
      } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        toast.error("Não foi possível cadastrar o aluno.");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-card border border-border p-6 rounded-lg"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="nomeCompleto"
            label="Nome Completo *"
            placeholder="Digite o nome do aluno..."
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email *"
            placeholder="Digite o email do aluno..."
          />
        </div>

        <FormInput
          control={form.control}
          name="urlImagem"
          label="URL da Imagem *"
          placeholder="Cole a URL da imagem do aluno..."
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="dataNascimento"
            label="Data de Nascimento *"
            type="date"
          />
          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gênero *</FormLabel>
                <FormControl className="flex flex-col sm:flex-row items-center">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex space-x-4 py-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Masculino" />
                      </FormControl>
                      <FormLabel className="font-normal">Masculino</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Feminino" />
                      </FormControl>
                      <FormLabel className="font-normal">Feminino</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Outro" />
                      </FormControl>
                      <FormLabel className="font-normal">Outro</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="alturaCm"
            label="Altura (cm) *"
            type="number"
          />
          <FormInput
            control={form.control}
            name="pesoKg"
            label="Peso (Kg) *"
            type="number"
          />
        </div>

        <FormInput
          control={form.control}
          name="objetivoPrincipal"
          label="Objetivo Principal *"
          placeholder="Ex: Hipertrofia, Perda de peso..."
        />

        <FormInput
          control={form.control}
          name="senha"
          label={isEditMode ? "Nova Senha (opcional)" : "Senha *"}
          type="password"
          placeholder={
            isEditMode
              ? "Deixe em branco para não alterar"
              : "Digite a senha..."
          }
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditMode ? "Atualizar Aluno" : "Cadastrar Aluno"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
