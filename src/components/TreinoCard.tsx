import type { Exercises } from "@/models/Exercises";
import ExercisesCard from "./ExercisesCard";

interface TreinoCardProps {
  nome: string;
  nivel: string;
  tempoEstimado: string;
  caloriasEstimadas: string;
  exercicios: Exercises[];
}

export default function TreinoCard({
  nome,
  nivel,
  tempoEstimado,
  caloriasEstimadas,
  exercicios,
}: TreinoCardProps) {
  return (
    <section className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border">
      {/* Header */}
      <div className="grid auto-rows-min items-start gap-1.5 px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h2 className="font-semibold text-xl">{nome}</h2>
            <div className="text-muted-foreground mt-2 flex flex-wrap gap-2 text-sm">
              <span>{exercicios.length} exercícios</span>
              <span>•</span>
              <span>{tempoEstimado}</span>
              <span>•</span>
              <span>{nivel}</span>
              <span>•</span>
              <span>{caloriasEstimadas}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              Hoje
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo: exercícios */}
      <div className="px-6 space-y-3 mb-6">
        {exercicios.map((ex, i) => (
          <ExercisesCard key={ex.id} treino={ex} />
        ))}
      </div>
    </section>
  );
}
