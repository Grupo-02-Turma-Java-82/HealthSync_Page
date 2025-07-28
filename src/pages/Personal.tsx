import { useMemo } from "react";
import { PlusIcon } from "lucide-react";

import { CardDashboard } from "@/components/CardDashboard";
import { CardRecentWorkouts } from "@/components/CardRecentWorkouts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useExercises } from "@/hooks/useExercises";
import { usePersonal } from "@/hooks/usePersonal";
import { CardStudents } from "@/components/CardStudents";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useCategories } from "@/hooks/useCategories";

export function Personal() {
  const { students, isLoading: isLoadingStudents } = usePersonal();
  const { workouts, isLoading: isLoadingWorkouts } = useWorkouts();
  const { exercises, isLoading: isLoadingExercises } = useExercises();
  const { categories } = useCategories();

  const navigate = useNavigate();

  const dashboardData = useMemo(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const totalUsers = students.length;
    const newUsersThisMonth = students.filter(
      (user) => user.dataVinculo && new Date(user.dataVinculo) >= startOfMonth
    ).length;
    const usersGrowthPercentage =
      totalUsers > 0 ? Math.round((newUsersThisMonth / totalUsers) * 100) : 0;

    const totalWorkouts = workouts.length;
    const newWorkoutsThisMonth = workouts.filter(
      (workout) => workout && new Date(workout.dataCriacao) >= startOfMonth
    ).length;
    const workoutsGrowthPercentage =
      totalWorkouts > 0
        ? Math.round((newWorkoutsThisMonth / totalWorkouts) * 100)
        : 0;

    const totalExercises = exercises.length;

    return {
      totalUsers,
      newUsersThisMonth,
      usersGrowthPercentage,
      totalWorkouts,
      newWorkoutsThisMonth,
      workoutsGrowthPercentage,
      totalExercises,
    };
  }, [students, workouts, exercises]);

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
          isLoading={isLoadingStudents}
        />
        <CardDashboard
          title="Treinos Criados"
          icon="dumbbell"
          data={dashboardData.totalWorkouts}
          subTitle={`${dashboardData.newWorkoutsThisMonth} novos este mês`}
          porcent={dashboardData.workoutsGrowthPercentage}
          isLoading={isLoadingWorkouts}
        />
        <CardDashboard
          title="Exercícios na Biblioteca"
          icon="book-open"
          data={dashboardData.totalExercises}
          subTitle={`Organizados em ${categories.length} categorias`}
          isLoading={isLoadingExercises}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        <CardStudents
          icon="activity"
          title="Atividade dos Alunos"
          subTitle="Últimas atividades dos seus alunos"
          students={students}
          isLoading={isLoadingStudents}
        />

        <CardRecentWorkouts
          icon="dumbbell"
          title="Treinos Recentes"
          subTitle="Últimos treinos criados"
          workouts={workouts}
          isLoading={isLoadingWorkouts}
        />
      </div>
    </div>
  );
}
