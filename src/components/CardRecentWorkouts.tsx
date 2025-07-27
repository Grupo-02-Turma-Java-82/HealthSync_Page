import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { WorkoutItem } from "./WorkoutItem";
import type { Workout } from "@/models/Workout";

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  workouts: Workout[];
  isLoading: boolean;
};

export function CardRecentWorkouts({
  title,
  subTitle,
  icon,
  workouts,
  isLoading,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedWorkouts = isExpanded
    ? workouts || []
    : (workouts || []).slice(0, 4);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-1">
        <span className="flex gap-2 items-center">
          <DynamicIcon size={20} name={icon} />
          <h1 className="font-semibold">{title}</h1>
        </span>
        <p className="text-muted-foreground text-sm">{subTitle}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          {(workouts ?? []).length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>Nenhum treino encontrado.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {displayedWorkouts.map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} />
              ))}
            </div>
          )}

          {(workouts ?? []).length > 4 && (
            <div className="mt-4 flex justify-center w-full">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Ver menos" : "Ver todos os treinos"}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
