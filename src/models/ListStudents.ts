import type { User } from "./Users";

export type ListStudents = {
  id: number;
  aluno: User;
  treinador: User;
  dataVinculo: string;
};
