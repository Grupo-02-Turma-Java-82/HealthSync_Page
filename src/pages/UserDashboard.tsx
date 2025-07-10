// pages/UserDashboard.tsx
import { useEffect, useState } from "react";
import type { Treino } from "@/types/Workout";
import { buscarTreinoAtual } from "@/services/Treino";
import TreinoCard from "@/components/TreinoCard";

export default function UserDashboard() {
  const [treino, setTreino] = useState<Treino | null>(null);

  useEffect(() => {
    const carregarTreino = async () => {
      try {
        const idAluno = 1; // <- Substituir pelo ID real (pode vir do login ou contexto)
        const dados = await buscarTreinoAtual(idAluno);
        setTreino(dados);
      } catch (erro) {
        console.error("Erro ao buscar treino:", erro);
      }
    };

    carregarTreino();
  }, []);

  return (
    <main className="p-8 bg-black min-h-screen">
      {treino ? <TreinoCard treino={treino} /> : <p className="text-white">Carregando treino...</p>}
    </main>
  );
}