import WeeklySummaryCard from "@/components/WeeklySummaryCard";
import RecentWorkoutsList from "@/components/RecentWorkoutsList";
import EmptyState from "@/components/EmptyState";
import type { WeeklySummary } from "@/models/WeeklySummary";
import { useAuth } from "@/hooks/useAuth";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  const { session } = useAuth();
  const { workouts, isLoading: isLoadingWorkouts, setComplete } = useWorkouts();
  const user = session?.usuarioLogin;

  const studentWorkouts = useMemo(() => {
    if (!user || !workouts) return [];
    return workouts.filter((workout) => workout.usuario?.id === user.id);
  }, [user, workouts]);

  const summary: WeeklySummary = {
    weeklyGoal: studentWorkouts.length,
    workoutsCompleted: studentWorkouts.filter((w) => w.concluido).length,
    totalTimeHours: 24,
    currentStreak: 4,
  };

  const hoje = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const imc = 24;

  const imcClassificacao = (valor: number) => {
    if (valor < 18.5) return "Abaixo do peso";
    if (valor < 25) return "Peso normal";
    if (valor < 30) return "Sobrepeso";
    return "Obesidade";
  };

  if (isLoadingWorkouts || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={32} className="self-center animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-8 bg-background min-h-screen space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Treino</h1>
          <p className="text-muted-foreground">
            Olá, {user.nomeCompleto}! Pronta para mais um treino incrível? 💪
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-muted-foreground">Hoje</p>
          <p className="text-lg font-semibold text-foreground">{hoje}</p>
        </div>
      </div>

      {imc && (
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Seu IMC</h2>
          <p className="text-2xl font-bold text-primary">{imc}</p>
          <p className="text-sm text-muted-foreground">
            Classificação: {imcClassificacao(Number(imc))}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Treinos</h2>
        {studentWorkouts.length === 0 ? (
          <EmptyState message="Você ainda não tem treinos atribuídos." />
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {studentWorkouts.map((workout) => (
              <AccordionItem
                key={workout.id}
                value={`workout-${workout.id}`}
                className="border bg-card rounded-xl shadow-sm"
              >
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <Checkbox
                      id={`workout-check-${workout.id}`}
                      checked={workout.concluido}
                      onCheckedChange={() => {
                        setComplete(workout.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="text-left">
                      <label
                        htmlFor={`workout-check-${workout.id}`}
                        className="font-semibold text-lg text-foreground"
                      >
                        {workout.nome}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {workout.treinoExercicios.length} exercícios
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {workout.descricao}
                    </p>
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold mb-2">Exercícios:</h4>
                      <ul className="space-y-3">
                        {workout.treinoExercicios.map((te) => (
                          <li
                            key={te.id}
                            className="flex justify-between items-center text-sm"
                          >
                            <span>{te.exercicio.nome}</span>
                            <Badge variant="outline" className="capitalize">
                              {te.exercicio.nivelDificuldade.toLowerCase()}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <WeeklySummaryCard summary={summary} />

      <RecentWorkoutsList workouts={studentWorkouts} />
    </main>
  );
}
