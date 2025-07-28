import { useState } from "react";
import type { Workout } from "@/models/Workout";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import EmptyState from "./EmptyState";

interface RecentWorkoutsListProps {
  workouts: Workout[];
}

export default function RecentWorkoutsList({
  workouts,
}: RecentWorkoutsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedWorkouts = workouts
    .filter((workout) => workout.concluido)
    .sort(
      (a, b) =>
        new Date(b.dataUltimaConclusao || 0).getTime() -
        new Date(a.dataUltimaConclusao || 0).getTime()
    );

  const displayedWorkouts = isExpanded
    ? completedWorkouts
    : completedWorkouts.slice(0, 4);

  return (
    <section className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border">
      <header className="grid auto-rows-min items-start gap-1.5 px-6">
        <h2 className="leading-none font-semibold text-xl">Treinos Recentes</h2>
        <p className="text-muted-foreground text-sm">
          Seus últimos treinos e atividades concluídas.
        </p>
      </header>

      <div className="px-6">
        {completedWorkouts.length === 0 ? (
          <EmptyState message="Conclua um treino para o ver no seu histórico." />
        ) : (
          <div className="space-y-3">
            {displayedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {workout.nome}
                    </p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>
                        {workout.dataUltimaConclusao
                          ? formatDistanceToNow(
                              new Date(workout.dataUltimaConclusao),
                              {
                                addSuffix: true,
                                locale: ptBR,
                              }
                            )
                          : "Concluído agora"}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="default">Concluído</Badge>
              </div>
            ))}
          </div>
        )}

        {completedWorkouts.length > 4 && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 text-primary hover:bg-primary/10"
          >
            {isExpanded ? "Ver menos" : "Ver Histórico Completo"}
          </Button>
        )}
      </div>
    </section>
  );
}
