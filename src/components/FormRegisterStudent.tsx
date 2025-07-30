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
  urlImagem: z
    .string()
    .url({ message: "Por favor, insira uma URL válida." })
    .optional(),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  dataNascimento: z.string().refine((date) => date, {
    message: "Data de nascimento é obrigatória.",
  }),
  genero: z.enum(["Masculino", "Feminino", "Não-binário", "Outro"]),
});

type FormRegisterUserProps = {
  onClose?: () => void;
};

export function FormRegisterStudent({ onClose }: FormRegisterUserProps) {
  const { create, isLoading: isCreatingUser } = useUsers();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      urlImagem: "",
      senha: "",
      dataNascimento: "",
      genero: "Masculino",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToCreate = {
      ...values,
      tipoUsuario: "TREINADOR",
      ativo: true,
      dataDesativacao: null,
      alturaCm: null,
      pesoKg: null,
      objetivoPrincipal: null,
    };

    try {
      await create(dataToCreate as unknown as User);
      form.reset();
      if (onClose) onClose();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar treinador:", error);
      toast.error("Não foi possível cadastrar o treinador.");
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-card p-6 rounded-lg"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="nomeCompleto"
              label="Nome Completo *"
              placeholder="Digite o nome..."
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email *"
              placeholder="Digite o email..."
            />
          </div>

          <FormInput
            control={form.control}
            name="urlImagem"
            label="URL da Imagem de Perfil"
            placeholder="Cole a URL da imagem..."
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
                <FormItem className="space-y-3 ">
                  <FormLabel>Gênero *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
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

          <FormInput
            control={form.control}
            name="senha"
            label="Senha *"
            type="password"
            placeholder="Digite a senha..."
          />

          <div className="flex justify-center mt-4">
            <Button disabled={isCreatingUser} type="submit">
              {isCreatingUser ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Cadastrar Treinador"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
