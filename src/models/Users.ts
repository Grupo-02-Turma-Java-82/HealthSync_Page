import type { Exercises } from "./Exercises";

export type User = {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  exercicios: Exercises[];
  dataNascimento: Date;
  genero: string;
  alturaCm: number;
  pesoKg: number;
  imc?: number;
  objetivoPrincipal: string;
  dataCadastro: Date;
};
