import type { Workout } from "@/models/Workout";
import { format } from "date-fns";

type Props = {
  workout: Workout;
};

export function WorkoutItem({ workout }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-md font-bold text-foreground">{workout.nome}</h1>
        {workout.dataCriacao && (
          <p className="text-sm text-muted-foreground">
            Criado em: {format(new Date(workout.dataCriacao), "dd/MM/yyyy")}
          </p>
        )}
      </div>

      {/* <Button
        variant="ghost"
        onClick={() => navigate(`/exercicios/editar-exercicio/${workout.id}`)}
      >
        Editar
      </Button> 
      */}
    </div>
  );
}
