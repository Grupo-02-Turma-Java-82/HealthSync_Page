import type { WeeklySummary } from "@/models/WeeklySummary";
import { Calendar, CircleCheckBig, Flame, Target, Timer } from "lucide-react";

interface WeeklySummaryCardProps {
  summary: WeeklySummary;
}

export default function WeeklySummaryCard({ summary }: WeeklySummaryCardProps) {
  const progresso = Math.min(
    Math.round((summary.workoutsCompleted / summary.weeklyGoal) * 100),
    100
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border lg:col-span-1"
      >
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6"
        >
          <div
            data-slot="card-title"
            className="leading-none font-semibold flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Progresso Semanal
          </div>
        </div>
        <div data-slot="card-content" className="px-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Meta da semana</span>
                <span className="font-medium">
                  {summary.workoutsCompleted}/{summary.weeklyGoal}
                </span>
              </div>
              <div
                role="progressbar"
                data-slot="progress"
                className="bg-primary/20 relative w-full overflow-hidden rounded-full h-3"
              >
                <div
                  data-slot="progress-indicator"
                  className="bg-primary h-full w-full transition-all"
                  style={{ transform: `translateX(-${100 - progresso}%)` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {progresso}% concluído
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Você está indo muito bem! Continue assim para bater sua meta. 🌟
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <ResumoMiniCard
          titulo="Treinos Concluídos"
          valor={`${summary.workoutsCompleted}`}
          descricao="Este mês"
          icone={<CircleCheckBig className="h-6 w-6 text-green-600" />}
          bgIcon="bg-green-50 dark:bg-green-950"
        />
        <ResumoMiniCard
          titulo="Sequência Atual"
          valor={`${summary.currentStreak} dias`
          }
          descricao="Sua melhor: 12 dias"
          icone={<Flame className="h-6 w-6 text-orange-600" />}
          bgIcon="bg-orange-50 dark:bg-orange-950"
        />
        <ResumoMiniCard
          titulo="Tempo Total"
          valor={`${summary.totalTimeHours}h`}
          descricao="Este mês"
          icone={<Timer className="h-6 w-6 text-blue-600" />}
          bgIcon="bg-blue-50 dark:bg-blue-950"
        />
        <ResumoMiniCard
          titulo="Meta Semanal"
          valor={`${summary.workoutsCompleted}/${summary.weeklyGoal}`}
          descricao="Treinos realizados"
          icone={<Target className="h-6 w-6 text-purple-600" />}
          bgIcon="bg-purple-50 dark:bg-purple-950"
        />
      </div>
    </div>
  );
}

interface ResumoMiniCardProps {
  titulo: string;
  valor: string;
  descricao: string;
  icone: React.ReactNode;
  bgIcon: string;
}

function ResumoMiniCard({ titulo, valor, descricao, icone, bgIcon }: ResumoMiniCardProps) {
  return (
    <div
      data-slot="card"
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border"
    >
      <div data-slot="card-content" className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{titulo}</p>
            <p className="text-2xl font-bold text-foreground">{valor}</p>
            <p className="text-xs text-muted-foreground">{descricao}</p>
          </div>
          <div className={`p-3 rounded-full ${bgIcon}`}>{icone}</div>
        </div>
      </div>
    </div>
  );
}
