import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
});

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Entre na sua conta
      </h1>

      <p className="text-muted-foreground mb-8">
        Acesse sua conta HealthSync e continue sua jornada fitness
      </p>

      <Card className="rounded-lg bg-card text-card-foreground shadow-sm card-gradient shadow-card border-0 p-6">
        <h1 className="tracking-tight text-xl font-heading font-semibold">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite suas credenciais para acessar sua conta
        </p>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              name="email"
              label="Email"
              control={form.control}
              icon={<Mail size={20} />}
              placeholder="seu@email.com"
            />

            <FormInput
              name="senha"
              label="Senha"
              control={form.control}
              icon={<Lock size={20} />}
              placeholder="Digite usa senha..."
            />

            <p className="hover:underline text-primary cursor-pointer">
              Esqueci minha senha
            </p>

            <Button>Entrar</Button>
          </form>
        </Form>

        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <NavLink to={"/cadastro"} className="text-primary hover:underline">
            Cadastra-se
          </NavLink>
        </p>
      </Card>
      <span className="hover:text-primary transition-colors my-6">
        <NavLink
          className="flex justify-center items-center gap-2"
          to={"/home"}
        >
          <ArrowLeft size={20} />
          <p>Voltar para o início</p>
        </NavLink>
      </span>
    </div>
  );
}
