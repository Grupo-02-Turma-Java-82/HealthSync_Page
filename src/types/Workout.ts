export interface ExercicioTreino {
  nome: string;
  series: number;
  repeticoes: string;
  carga: string;
  descanso: string;
}

export interface Treino {
  nome: string;
  nivel: 'INICIANTE' | 'INTERMEDIÁRIO' | 'AVANÇADO';
  duracaoMin: number;
  calorias: number;
  exercicios: ExercicioTreino[];
}