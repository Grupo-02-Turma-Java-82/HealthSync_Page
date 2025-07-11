import { useMemo } from "react";
import { PlusIcon } from "lucide-react";

import { CardDashboard } from "@/components/CardDashboard";
import { CardRecentExercises } from "@/components/CardExercises";
import { CardUsers } from "@/components/CardUsers";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { useNavigate } from "react-router";
import { useExercises } from "@/hooks/useExercises";

export function PersonalDashboard() {
  const { users, isLoading } = useUsers();
  const { exercises } = useExercises();

  const navigate = useNavigate();

  const dashboardData = useMemo(() => {
    if (!users || users.length === 0) {
      return {
        totalUsers: 0,
        newUsersThisMonth: 0,
        usersGrowthPercentage: 0,
        totalExercises: 0,
        newExercisesThisWeek: 0,
        exercisesGrowthPercentage: 0,
        totalCategories: 0,
      };
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const totalUsers = users.length;
    const newUsersThisMonth = users.filter(
      (user) => user.dataCadastro && new Date(user.dataCadastro) >= startOfMonth
    ).length;
    const usersGrowthPercentage =
      totalUsers > 0 ? Math.round((newUsersThisMonth / totalUsers) * 100) : 0;

    const allExercises = users.flatMap((user) => user.exercicios || []);
    const totalExercises = allExercises.length;
    const newExercisesThisWeek = allExercises.filter(
      (exercise) =>
        exercise.dataCriacao && new Date(exercise.dataCriacao) >= startOfWeek
    ).length;
    const exercisesGrowthPercentage =
      totalExercises > 0
        ? Math.round((newExercisesThisWeek / totalExercises) * 100)
        : 0;

    const categorySet = new Set(allExercises.map((ex) => ex.categoria.nome));
    const totalCategories = categorySet.size;

    return {
      totalUsers,
      newUsersThisMonth,
      usersGrowthPercentage,
      totalExercises,
      newExercisesThisWeek,
      exercisesGrowthPercentage,
      totalCategories,
    };
  }, [users]);

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Bem-vindo de volta! Aqui está um resumo da sua atividade.
          </p>
        </div>

        <Button onClick={() => navigate("/novo-exercicio")}>
          <PlusIcon size={24} className="mr-2" />
          Novo Exercício
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CardDashboard
          title="Alunos Ativos"
          icon="users-2"
          data={dashboardData.totalUsers}
          subTitle={`${dashboardData.newUsersThisMonth} novos este mês`}
          porcent={dashboardData.usersGrowthPercentage}
        />
        <CardDashboard
          title="Exercícios Ativos"
          icon="dumbbell"
          data={dashboardData.totalExercises}
          subTitle={`${dashboardData.newExercisesThisWeek} criados esta semana`}
          porcent={dashboardData.exercisesGrowthPercentage}
        />
        <CardDashboard
          title="Categorias na Biblioteca"
          icon="book-open"
          data={dashboardData.totalCategories}
          subTitle="Categorias de exercícios únicas"
          porcent={0}
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

        <CardRecentExercises
          icon="dumbbell"
          title="Exercícios Recentes"
          subTitle="Últimos exercícios criados"
          exercises={exercises}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
