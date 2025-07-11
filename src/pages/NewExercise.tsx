// src/pages/NewExercise.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router"; // Importar useParams
import { FormExercises } from "@/components/FormExercises";
import { useExercises } from "@/hooks/useExercises"; // Importar useExercises
import type { Exercises } from "@/models/Exercises"; // Importar o tipo Exercises
import { Loader } from "lucide-react"; // Para exibir um loader

export function NewExercise() {
  const { id } = useParams<{ id?: string }>(); // Pega o ID da URL (pode ser undefined)
  const isEditMode = !!id; // true se o ID existir, false caso contrário

  const { exercises, isLoading: isExercisesLoading } = useExercises(); // Pega todos os exercícios e o estado de carregamento
  const [initialData, setInitialData] = useState<Exercises | null>(null);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true); // Estado para controlar o carregamento dos dados iniciais

  useEffect(() => {
    if (isEditMode && exercises.length > 0) {
      // Se estiver em modo de edição e já tivermos os exercícios carregados
      const foundExercise = exercises.find(
        (exercise) => exercise.id === parseInt(id!)
      ); // Encontra o exercício pelo ID
      if (foundExercise) {
        setInitialData(foundExercise);
      } else {
        // Tratar caso o exercício não seja encontrado (ex: redirecionar, mostrar erro)
        console.warn(`Exercício com ID ${id} não encontrado.`);
        setInitialData(null); // Garante que não há dados iniciais
      }
      setIsFetchingInitialData(false); // Finaliza o carregamento dos dados iniciais
    } else if (!isEditMode) {
      setInitialData(null); // Garante que não há dados iniciais em modo de criação
      setIsFetchingInitialData(false); // Não precisa buscar dados em modo de criação
    } else if (isExercisesLoading) {
      // Se estiver em modo de edição e os exercícios ainda estão carregando,
      // mantém isFetchingInitialData como true
      setIsFetchingInitialData(true);
    } else if (isEditMode && exercises.length === 0 && !isExercisesLoading) {
      // Caso esteja em modo de edição, não há exercícios carregados e não está carregando
      // Isso pode indicar que o exercício não existe ou houve um erro na busca inicial
      console.warn(`Nenhum exercício carregado para ID ${id}.`);
      setInitialData(null);
      setIsFetchingInitialData(false);
    }
  }, [id, isEditMode, exercises, isExercisesLoading]); // Dependências do useEffect

  // Exibir um loader enquanto os dados iniciais estão sendo buscados em modo de edição
  if (isEditMode && isFetchingInitialData) {
    return (
      <div className="flex flex-col p-6 gap-6 items-center justify-center h-screen">
        <Loader className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground">
          Carregando dados do exercício...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            {isEditMode ? "Editar Exercício" : "Montar Exercício"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {isEditMode
              ? "Edite as informações do exercício existente."
              : "Cadastre os exercícios para seus alunos."}
          </p>
        </div>
      </div>

      <FormExercises isEditMode={isEditMode} initialData={initialData} />
    </div>
  );
}
