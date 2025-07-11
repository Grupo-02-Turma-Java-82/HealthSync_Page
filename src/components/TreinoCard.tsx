import { useState } from "react"; // Importar useState
import type { Exercises } from "@/models/Exercises";
import { Button } from "./ui/button"; // Importar Button
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
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a expansão

  // Determina quais exercícios serão exibidos
  const displayedExercises = isExpanded ? exercicios : exercicios.slice(0, 2);

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
        {displayedExercises.map((ex) => (
          <ExercisesCard key={ex.id} treino={ex} />
        ))}
      </div>

      {/* Botão "Ver mais" / "Ver menos" */}
      {exercicios.length > 4 && ( // Só mostra o botão se houver mais de 4 exercícios
        <div className="flex justify-center px-6">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Ver menos" : "Ver mais"}
          </Button>
        </div>
      )}
    </section>
  );
}
