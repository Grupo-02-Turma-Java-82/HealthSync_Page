import { useMemo, useState } from "react";
import type { Workout } from "@/models/Workout";
import { Button } from "./ui/button";
import ExercisesCard from "./ExercisesCard";

interface TreinoCardProps {
  treino: Workout;
}

const DIFICULDADE_ORDEM = {
  INICIANTE: 1,
  INTERMEDIÁRIO: 2,
  AVANCADO: 3,
};

export default function TreinoCard({ treino }: TreinoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const exercicios = treino.treinoExercicios || [];
  const displayedExercises = isExpanded ? exercicios : exercicios.slice(0, 2);

  const nivel = useMemo(() => {
    if (!exercicios || exercicios.length === 0) return "N/A";

    const nivelMaisAlto = exercicios.reduce((max, te) => {
      const nivelAtual = DIFICULDADE_ORDEM[te.exercicio.nivelDificuldade];
      return nivelAtual > max ? nivelAtual : max;
    }, 0);

    return (
      Object.keys(DIFICULDADE_ORDEM).find(
        (key) =>
          DIFICULDADE_ORDEM[key as keyof typeof DIFICULDADE_ORDEM] ===
          nivelMaisAlto
      ) || "Iniciante"
    );
  }, [exercicios]);

  return (
    <section className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border">
      <div className="grid auto-rows-min items-start gap-1.5 px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h2 className="font-semibold text-xl">{treino.nome}</h2>
            <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span>{exercicios.length} exercícios</span>
              <span className="text-xs">•</span>
              <span>{nivel}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              Hoje
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-3">
        {displayedExercises.map((treinoExercicio) => (
          <ExercisesCard
            key={treinoExercicio.id}
            exercise={treinoExercicio.exercicio}
          />
        ))}
      </div>

      {exercicios.length > 2 && (
        <div className="flex justify-center px-6 mt-auto pt-4">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Ver menos" : "Ver mais"}
          </Button>
        </div>
      )}
    </section>
  );
}
