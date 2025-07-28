import { useState } from "react";
import type { Exercises } from "@/models/Exercises";
import { Button } from "@/components/ui/button";

interface RecentWorkoutsListProps {
  exercicios: Exercises[];
}

export default function RecentWorkoutsList({
  exercicios,
}: RecentWorkoutsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedExercises = isExpanded ? exercicios : exercicios.slice(0, 4);

  const formatarData = (data: Date): string => {
    const agora = new Date();
    const diffMs = agora.getTime() - data.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return "Hoje";
    if (diffDias === 1) return "Ontem";
    return `${diffDias} dias atrás`;
  };

  return (
    <section
      data-slot="card"
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border"
    >
      <header
        data-slot="card-header"
        className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6"
      >
        <h2 data-slot="card-title" className="leading-none font-semibold">
          Treinos Recentes
        </h2>
        <p
          data-slot="card-description"
          className="text-muted-foreground text-sm"
        >
          Seus últimos treinos e atividades
        </p>
      </header>

      <div data-slot="card-content" className="px-6">
        <div className="space-y-3">
          {displayedExercises.map((exercicio) => (
            <div
              key={exercicio.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {exercicio.nome}
                  </p>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{formatarData(new Date(exercicio.dataCriacao))}</span>
                  </div>
                </div>
              </div>
              <span
                data-slot="badge"
                className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-primary text-primary-foreground"
              >
                Concluído
              </span>
            </div>
          ))}
        </div>

        {exercicios.length > 4 && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4"
          >
            {isExpanded ? "Ver menos" : "Ver Histórico Completo"}
          </Button>
        )}
      </div>
    </section>
  );
}
