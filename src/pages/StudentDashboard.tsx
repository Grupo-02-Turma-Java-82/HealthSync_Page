import WeeklySummaryCard from "@/components/WeeklySummaryCard";
import RecentWorkoutsList from "@/components/RecentWorkoutsList";
import TreinoCard from "@/components/TreinoCard";
import EmptyState from "@/components/EmptyState";
import type { WeeklySummary } from "@/models/WeeklySummary";
import type { User } from "@/models/Users"; // Importar o tipo User

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUsers } from "@/hooks/useUsers";
import { Loader } from "lucide-react";
import { useExercises } from "@/hooks/useExercises";

export default function UserDashboard() {
  const { users, isLoading } = useUsers();
  const { exercises } = useExercises();
  // CORREÇÃO: Acessar o primeiro usuário ou lidar com o caso de não haver usuários
  // Se a dashboard é para um usuário logado, você pode querer pegar o usuário do useAuth.
  // Por enquanto, vou assumir que users[1] é intencional, mas adicionarei uma verificação.
  const user: User | undefined = users[1]; // Pode ser undefined se o array for menor

  // CORREÇÃO: Inicializar summaryMock de forma segura para evitar erros se user for undefined
  const summaryMock: WeeklySummary = {
    weeklyGoal: exercises.length,
    // CORREÇÃO: Acessar exercicios de forma segura
    workoutsCompleted: exercises?.length ?? 0,
    totalTimeHours: 24,
    currentStreak: 4,
  };

  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  // CORREÇÃO: Usar as propriedades corretas (pesoKg, alturaCm) e verificar se user existe
  const imc =
    user?.pesoKg && user?.alturaCm
      ? (user.pesoKg / ((user.alturaCm / 100) * (user.alturaCm / 100))).toFixed(
          1
        ) // Altura em cm para metros
      : null;

  const imcClassificacao = (valor: number) => {
    if (valor < 18.5) return "Abaixo do peso";
    if (valor < 25) return "Peso normal";
    if (valor < 30) return "Sobrepeso";
    return "Obesidade";
  };

  // CORREÇÃO: Lidar com o estado de carregamento e a ausência do usuário
  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center pt-30">
        <Loader size={32} className="self-center animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="p-8 bg-background min-h-screen space-y-6">
      {/* Header personalizado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Treino</h1>
          <p className="text-muted-foreground">
            {/* CORREÇÃO: Usar user.nomeCompleto */}
            Olá, {user.nomeCompleto}! Pronta para mais um treino incrível? 💪
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Hoje</p>
          <p className="text-lg font-semibold text-foreground">{hoje}</p>
        </div>
      </div>

      {/* Card de IMC */}
      {imc && (
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Seu IMC</h2>
          <p className="text-2xl font-bold text-primary">{imc}</p>
          <p className="text-sm text-muted-foreground">
            Classificação: {imcClassificacao(Number(imc))}
          </p>
        </div>
      )}

      {/* Lista de exercícios agrupada em um card de treino */}
      {/* CORREÇÃO: Acessar exercicios de forma segura */}
      {exercises?.length === 0 ? (
        <EmptyState />
      ) : (
        <TreinoCard
          nome="Treino de Peito e Tríceps"
          nivel="Iniciante"
          tempoEstimado="45-60 min"
          caloriasEstimadas="320-450 kcal"
          // CORREÇÃO: Passar exercicios de forma segura
          exercicios={exercises || []}
        />
      )}

      {/* Resumo da semana */}
      <WeeklySummaryCard summary={summaryMock} />

      {/* Lista de treinos recentes */}
      {/* CORREÇÃO: Passar exercicios de forma segura */}
      <RecentWorkoutsList exercicios={exercises || []} />
    </main>
  );
}
