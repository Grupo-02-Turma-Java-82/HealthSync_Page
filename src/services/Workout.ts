import { api } from "./api";
import type { Treino } from "@/types/Workout";

export async function buscarTreinoAtual(idAluno: number): Promise<Treino> {
  const resposta = await api.get(`/alunos/${idAluno}/treino-atual`);
  return resposta.data;
}