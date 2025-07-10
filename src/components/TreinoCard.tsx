
type Exercicio = {
  id: number;
  nome: string;
  series: number;
  reps: string;
  carga: string;
  descanso: string;
};

const exerciciosMock: Exercicio[] = [
  { id: 1, nome: "Supino Reto", series: 4, reps: "8–12", carga: "70kg", descanso: "90s" },
  { id: 2, nome: "Supino Inclinado", series: 3, reps: "10–15", carga: "60kg", descanso: "75s" },
  { id: 3, nome: "Crucifixo", series: 3, reps: "12–15", carga: "25kg", descanso: "60s" },
  { id: 4, nome: "Tríceps Testa", series: 4, reps: "10–12", carga: "30kg", descanso: "60s" },
  { id: 5, nome: "Tríceps Corda", series: 3, reps: "12–15", carga: "40kg", descanso: "45s" },
];

export default function TreinoAtualCard() {
  const exercicios = exerciciosMock;

  return (
    <section className="bg-[#2d0e00] text-white rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Treino de Peito e Tríceps</h2>
          <p className="text-sm text-orange-400">
            {exercicios.length} exercícios • 45–60 min • Intermediário • 320–450 kcal
          </p>
        </div>
        <p className="text-sm text-zinc-400">Hoje</p>
      </div>

      <ul className="space-y-4">
        {exercicios.map((ex) => (
          <li key={ex.id} className="flex justify-between items-center">
            <div className="flex gap-4">
              <span className="bg-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {ex.id}
              </span>
              <div>
                <h3 className="font-medium">{ex.nome}</h3>
                <p className="text-sm text-zinc-300">
                  {ex.series} séries • {ex.reps} reps • {ex.carga} • Descanso: {ex.descanso}
                </p>
              </div>
            </div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-400 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-4">
        <button className="bg-orange-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-orange-400">
          ▶ Iniciar Treino
        </button>
        <button className="text-sm text-orange-400 hover:underline">Ver Detalhes</button>
      </div>
    </section>
  );
}