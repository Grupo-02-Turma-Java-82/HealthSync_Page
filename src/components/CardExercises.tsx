import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import type { User } from "@/models/Users";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { ExerciseItem } from "./ExerciseItem";

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  users: User[];
  isLoading: boolean;
};

export function CardExercises({
  title,
  subTitle,
  icon,
  users,
  isLoading,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allExercises = users
    .flatMap((user) => user.exercicios)
    .sort(
      (a, b) =>
        new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
    );

  const displayedExercises = isExpanded
    ? allExercises
    : allExercises.slice(0, 4);

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
          <div className="flex flex-col gap-4 mt-4">
            {displayedExercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercises={exercise} />
            ))}
          </div>

          {allExercises.length > 4 && (
            <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Ver menos" : "Ver todos os exercícios"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
