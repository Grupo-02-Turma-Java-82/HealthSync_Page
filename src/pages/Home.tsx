import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";

import { Plans } from "../components/Plans";
import { Feedbacks } from "@/components/Feedbacks";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

export function Home() {
  const { save } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<"trainer" | "student" | null>(null);

  const trainerCredentials = {
    email: "brunotreinador@live.com",
    senha: "senhaforte123456",
  };

  const studentCredentials = {
    email: "bruno@email.com",
    senha: "12345678",
  };

  async function handleDemoLogin(
    credentials: typeof trainerCredentials,
    userType: "trainer" | "student"
  ) {
    setLoading(userType);
    try {
      const response = await api.post("/usuarios/logar", credentials);
      save(response.data);

      navigate("/");
    } catch (error) {
      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "Falha no login de demonstração. Verifique se os usuários existem no banco.";
      toast.error(message);
      console.error("Erro no login de demonstração:", error);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <Hero />
      <Features />
      <Plans />
      <Feedbacks />

      <div className="fixed flex flex-col gap-3 bottom-4 right-4">
        <Button
          className="bg-blue-600 hover:bg-blue-600/80"
          onClick={() => handleDemoLogin(trainerCredentials, "trainer")}
          disabled={!!loading}
        >
          {loading === "trainer" ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            "Demo Treinador"
          )}
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-600/80"
          onClick={() => handleDemoLogin(studentCredentials, "student")}
          disabled={!!loading}
        >
          {loading === "student" ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            "Demo Aluno"
          )}
        </Button>
      </div>
    </div>
  );
}
