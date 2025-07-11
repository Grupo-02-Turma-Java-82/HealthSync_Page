import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, Lock, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { AxiosError } from "axios";

const signInSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function signIn(data: SignInSchema) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post("/usuarios/logar", data);

      auth.save(response.data);

      navigate("/dashboard");
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setErrorMessage(
          e.response.data.message || "Usuário ou senha inválidos."
        );
      } else {
        setErrorMessage("Não foi possível entrar! Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Entre na sua conta
      </h1>

      <p className="text-muted-foreground mb-8">
        Acesse sua conta HealthSync e continue sua jornada fitness
      </p>

      <Card className="rounded-lg bg-card text-card-foreground shadow-sm card-gradient shadow-card border-0 p-6 w-full max-w-md">
        <h1 className="tracking-tight text-xl font-heading font-semibold">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite suas credenciais para acessar sua conta
        </p>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(signIn)}
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
              type="password"
              control={form.control}
              icon={<Lock size={20} />}
              placeholder="Digite sua senha..."
            />

            {errorMessage && (
              <p className="text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            )}

            <p className="hover:underline text-primary cursor-pointer text-right text-sm">
              Esqueci minha senha
            </p>

            <Button disabled={isLoading} type="submit" className="w-full mt-2">
              {isLoading ? (
                <Loader size={24} className="animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-muted-foreground mt-6">
          Não tem uma conta?{" "}
          <NavLink
            to={"/cadastro"}
            className="text-primary hover:underline font-semibold"
          >
            Cadastre-se
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
