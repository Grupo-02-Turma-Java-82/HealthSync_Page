import type { Treino } from "@/types/Workout";

interface TreinoCardProps {
  treino: Treino;
}

export default function TreinoCard({ treino }: TreinoCardProps) {
  const iniciarTreino = () => {
    console.log("Iniciando treino:", treino.nome);
    // Aqui você pode redirecionar para /treino/execucao ou abrir modal etc
  };

  const verDetalhes = () => {
    console.log("Ver detalhes do treino:", treino.nome);
    // Pode usar router.push("/treinos/detalhes") se for implementar rota
  };

  return (
    <section className="bg-[#2d0e00] text-white p-6 rounded-xl shadow-md space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{treino.nome}</h2>
          <p className="text-sm text-gray-300">
            {treino.exercicios.length} exercícios • {treino.duracaoMin} min •{" "}
            {treino.nivel.toLowerCase()} • {treino.calorias} kcal
          </p>
        </div>
      </header>

      <ul className="space-y-2">
        {treino.exercicios.map((ex, index) => (
          <li key={index} className="border-l-4 border-orange-500 pl-4">
            <p className="font-medium text-orange-400">{ex.nome}</p>
            <p className="text-sm text-gray-300">
              {ex.series} séries • {ex.repeticoes} reps • {ex.carga} • Descanso:{" "}
              {ex.descanso}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-4 border-t border-orange-900">
        <button
          onClick={iniciarTreino}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-all"
        >
          Iniciar Treino
        </button>
        <button
          onClick={verDetalhes}
          className="text-sm text-gray-300 hover:text-white underline"
        >
          Ver Detalhes
        </button>
      </div>
    </section>
  );
}
