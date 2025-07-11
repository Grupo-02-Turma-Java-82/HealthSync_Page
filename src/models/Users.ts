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
  tipoUsuario: "ALUNO" | "PERSONAL" | "ADMINISTRADOR";
};

export type UserLogin = {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  tipoUsuario: "ALUNO" | "TREINADOR" | "ADMINISTRADOR";
};

export type UserAPIResponse = {
  token: string;
  usuarioLogin: UserLogin;
};
