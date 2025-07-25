import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";
import { FormRegisterStudent } from "@/components/FormRegisterStudent";

export function Register() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-20">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Crie sua conta
      </h1>
      <p className="text-muted-foreground mb-8">
        Preencha os dados para criar sua conta HealthSync
      </p>
      <Card className="rounded-lg bg-card text-card-foreground shadow-sm card-gradient shadow-card border-0 p-6 w-full max-w-md">
        <h1 className="tracking-tight text-xl font-heading font-semibold">
          Cadastro
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha o formulário para cadastrar sua conta
        </p>

        <FormRegisterStudent />

        <p className="text-sm text-muted-foreground mt-6">
          Já tem uma conta?
          <NavLink
            to={"/login"}
            className="text-primary hover:underline font-semibold"
          >
            {" "}
            Entrar
          </NavLink>
        </p>
      </Card>
      <span className="hover:text-primary transition-colors my-6">
        <NavLink className="flex justify-center items-center gap-2" to={"/"}>
          <ArrowLeft size={20} />
          <p>Voltar para o início</p>
        </NavLink>
      </span>
    </div>
  );
}
