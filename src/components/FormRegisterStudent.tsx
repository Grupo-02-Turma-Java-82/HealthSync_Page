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
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const formSchema = z.object({
  nomeCompleto: z.string().min(3, { message: "Nome completo é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
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

type FormRegisterStudentProps = {
  onClose?: () => void;
};

export function FormRegisterStudent({ onClose }: FormRegisterStudentProps) {
  const { create, isLoading: isCreatingUser } = useUsers();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      senha: "",
      dataNascimento: "",
      genero: "Masculino",
      alturaCm: 0,
      pesoKg: 0,
      objetivoPrincipal: "",
      tipoUsuario: "ALUNO",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.senha) {
      console.error(
        "Erro: Senha é obrigatória para o cadastro de um novo usuário."
      );
      form.setError("senha", { message: "Senha é obrigatória." });
      return;
    }

    const dataToCreate: Omit<
      User,
      "id" | "dataCadastro" | "exercicios" | "imc"
    > = {
      ...values,
      dataNascimento: new Date(values.dataNascimento),
      senha: values.senha as string,
      tipoUsuario: values.tipoUsuario,
    };

    console.log("Dados do novo aluno para envio:", dataToCreate);
    try {
      await create(dataToCreate);
      toast.success("Aluno cadastrado com sucesso!");
      form.reset();
      if (onClose) onClose();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      toast.error("Não foi possível cadastrar o aluno.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-card  p-6 rounded-lg"
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
                <FormControl className="flex flex-col ">
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

        <FormField
          control={form.control}
          name="tipoUsuario"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Usuário *</FormLabel>
              <FormControl className="flex flex-col sm:flex-row items-center">
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4 py-2"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ALUNO" />
                    </FormControl>
                    <FormLabel className="font-normal">Aluno</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="TREINADOR" />
                    </FormControl>
                    <FormLabel className="font-normal">Personal</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ADMINISTRADOR" />
                    </FormControl>
                    <FormLabel className="font-normal">Administrador</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInput
          control={form.control}
          name="senha"
          label="Senha *"
          type="password"
          placeholder="Digite a senha..."
        />

        <div className="flex justify-center mt-4">
          <Button
            disabled={isCreatingUser}
            type="submit"
            className="cursor-pointer"
          >
            {isCreatingUser ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              "Cadastrar Aluno"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
