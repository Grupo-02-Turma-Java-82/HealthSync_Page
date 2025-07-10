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

const formSchema = z.object({
  nomeCompleto: z.string().min(3, { message: "Nome completo é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
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
});

type FormStudentsProps = {
  isEditMode: boolean;
  initialData?: User | null;
  onClose?: () => void;
};

export function FormExercises({
  isEditMode,
  initialData,
  onClose,
}: FormStudentsProps) {
  const { addUser, updateUser } = useUsers();

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
    },
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        nomeCompleto: initialData.nomeCompleto,
        email: initialData.email,
        dataNascimento: format(initialData.dataNascimento, "yyyy-MM-dd"),
        genero: initialData.genero as
          | "Masculino"
          | "Feminino"
          | "Não-binário"
          | "Outro",
        alturaCm: initialData.alturaCm,
        pesoKg: initialData.pesoKg,
        objetivoPrincipal: initialData.objetivoPrincipal,
      });
    }
  }, [isEditMode, initialData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      ...values,
      dataNascimento: new Date(values.dataNascimento),
    };

    if (isEditMode && !values.senha) {
      delete (dataToSend as Partial<typeof dataToSend>).senha;
    }

    if (isEditMode && initialData) {
      console.log("Updating user:", initialData.id, dataToSend);
    } else {
      console.log("Adding user:", dataToSend);
    }

    if (onClose) onClose();
    form.reset();
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

        {!isEditMode && (
          <FormInput
            control={form.control}
            name="senha"
            label="Senha *"
            type="password"
            placeholder="Digite a senha..."
          />
        )}

        <div className="flex justify-end mt-4">
          <Button type="submit" className="cursor-pointer">
            {!isEditMode ? "Atualizar Aluno" : "Cadastrar Aluno"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
