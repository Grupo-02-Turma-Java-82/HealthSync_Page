import { CardDashboard } from "@/components/CardDashboard";
import { CardExercises } from "@/components/CardExercises";
import { CardUsers } from "@/components/CardUsers";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { PlusIcon } from "lucide-react";

export function PersonalDashboard() {
  const { users, isLoading } = useUsers();

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Bem-vindo de volta! Aqui está um resumo da sua atividade.
          </p>
        </div>

        <Button>
          <PlusIcon size={24} />
          Novo Exercicio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CardDashboard
          title="Alunos Ativos"
          icon="users-2"
          data={24}
          subTitle="3 novos este mês"
          porcent={12}
        />
        <CardDashboard
          title="Exercícios Ativos"
          icon="dumbbell"
          data={156}
          subTitle="8 criados esta semana"
          porcent={5}
        />
        <CardDashboard
          title="Exercícios na Biblioteca"
          icon="book-open"
          data={89}
          subTitle="Organizados em 12 categorias"
          porcent={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        <CardUsers
          icon="activity"
          title="Atividade dos Alunos"
          subTitle="Últimas atividades dos seus alunos"
          users={users}
          isLoading={isLoading}
        />

        <CardExercises
          icon="dumbbell"
          title="Exercícios Recentes"
          subTitle="Últimos exercícios criados"
          users={users}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
