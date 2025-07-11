import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { ExerciseItem } from "./ExerciseItem";
import type { Exercises } from "@/models/Exercises";

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  exercises: Exercises[];
  isLoading: boolean;
};

export function CardRecentExercises({
  title,
  subTitle,
  icon,
  exercises,
  isLoading,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedExercises = isExpanded
    ? exercises || []
    : (exercises || []).slice(0, 4);

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
          {(exercises ?? []).length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>Nenhum exercício encontrado.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {displayedExercises.map((exercise) => (
                <ExerciseItem key={exercise.id} exercises={exercise} />
              ))}
            </div>
          )}

          {(exercises ?? []).length > 4 && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Ver menos" : "Ver todos os exercícios"}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
