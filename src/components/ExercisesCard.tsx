import type { Exercises } from "@/models/Exercises";

interface ExercisesCardProps {
  treino: Exercises;
}

export default function ExercisesCard({ treino }: ExercisesCardProps) {
  const iniciarTreino = () => {
    console.log("Iniciando exercício:", treino.nome);
  };

  const verDetalhes = () => {
    console.log("Ver detalhes do exercício:", treino.nome);
  };

  return (
    <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{treino.nome}</h2>
          <div className="text-muted-foreground mt-2 text-sm flex flex-wrap gap-2">
            <span>
              Categoria:{" "}
              <span className="text-foreground">{treino.categoria.nome}</span>
            </span>
            <span>•</span>
            <span>Nível: {treino.nivel_dificuldade.toLowerCase()}</span>
          </div>
          {treino.equipamento_necessario && (
            <p className="text-sm text-muted-foreground mt-1">
              Equipamento necessário:{" "}
              <span className="text-foreground">
                {treino.equipamento_necessario}
              </span>
            </p>
          )}
        </div>
      </header>

      {treino.descricao_detalhada && (
        <p className="text-sm text-muted-foreground">
          {treino.descricao_detalhada}
        </p>
      )}

      {treino.url_video_demonstrativo && (
        <a
          href={treino.url_video_demonstrativo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-healthsync-orange underline hover:text-orange-600 transition-colors block"
        >
          Ver vídeo demonstrativo
        </a>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={iniciarTreino}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          Iniciar Exercício
        </button>

        <button
          onClick={verDetalhes}
          className="border bg-background dark:bg-input/30 dark:border-input hover:bg-accent hover:text-accent-foreground text-sm font-medium px-4 py-2 rounded-md shadow-xs transition-all"
        >
          Ver Detalhes
        </button>
      </div>
    </section>
  );
}
