import type { Categories } from "./Categories";

export type Exercises = {
  duracao: string;
  id: number;
  nome: string;
  categoria: Categories;
  url_video_demonstrativo: string;
  descricao_detalhada: string;
  nivel_dificuldade: "INICIANTE" | "INTERMEDIÁRIO" | "AVANCADO";
  equipamento_necessario: string;
  dataCriacao: Date;
};
