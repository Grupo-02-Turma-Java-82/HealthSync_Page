<<<<<<< HEAD
import { useContext } from "react";
import { UsersContext } from "@/contexts/UsersContext";
import WeeklySummaryCard from "@/components/WeeklySummaryCard";
import RecentWorkoutsList from "@/components/RecentWorkoutsList";
import TreinoCard from "@/components/TreinoCard";
import EmptyState from "@/components/EmptyState";
import type { WeeklySummary } from "@/models/WeeklySummary";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function UserDashboard() {
  const { users, isLoading } = useContext(UsersContext);
  const user = users[2]; // Simula o usuário logado

  const summaryMock: WeeklySummary = {
    weeklyGoal: 5,
    workoutsCompleted: user?.exercicios.length ?? 0,
    totalTimeHours: 24,
    currentStreak: 4,
  };

  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  if (isLoading || !user) {
    return <p className="text-white p-8">Carregando usuário...</p>;
  }

  return (
    <main className="p-8 bg-black min-h-screen space-y-6">
      {/* Header personalizado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Treino</h1>
          <p className="text-muted-foreground">
            Olá, {user.nome}! Pronta para mais um treino incrível? 💪
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Hoje</p>
          <p className="text-lg font-semibold text-foreground">{hoje}</p>
        </div>
      </div>

      {/* Lista de exercícios agrupada em um card de treino */}
      {user.exercicios.length === 0 ? (
        <EmptyState />
      ) : (
        <TreinoCard
          nome="Treino de Peito e Tríceps"
          nivel="Iniciante"
          tempoEstimado="45-60 min"
          caloriasEstimadas="320-450 kcal"
          exercicios={user.exercicios}
        />
      )}

      {/* Resumo da semana */}
      <WeeklySummaryCard summary={summaryMock} />

      {/* Lista de treinos recentes */}
      <RecentWorkoutsList exercicios={user.exercicios} />
    </main>
  );
}
=======
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
>>>>>>> dbd98a06461fd1f8f4f31aaa973d19453b284066
