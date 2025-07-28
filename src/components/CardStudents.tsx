import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import { StudentItem } from "./StudentItem";
import { Button } from "./ui/button";
import type { ListStudents } from "@/models/ListStudents";
import { Skeleton } from "./ui/skeleton";

function CardStudentsSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </Card>
  );
}

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  students: ListStudents[];
  isLoading: boolean;
};

export function CardStudents({
  title,
  subTitle,
  icon,
  students,
  isLoading,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <CardStudentsSkeleton />;
  }

  const safeStudents = students || [];

  const sortedStudents = [...safeStudents].sort((a, b) => {
    const dateA = new Date(a.dataVinculo);
    const dateB = new Date(b.dataVinculo);
    return dateB.getTime() - dateA.getTime();
  });

  const displayedStudents = isExpanded
    ? sortedStudents
    : sortedStudents.slice(0, 4);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-1">
        <span className="flex gap-2 items-center">
          <DynamicIcon size={20} name={icon} />
          <h1 className="font-semibold">{title}</h1>
        </span>
        <p className="text-muted-foreground text-sm">{subTitle}</p>
      </div>

      {safeStudents.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <p>Nenhum aluno encontrado.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {displayedStudents.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))}
        </div>
      )}

      {safeStudents.length > 4 && (
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Ver menos" : "Ver todos os alunos"}
          </Button>
        </div>
      )}
    </Card>
  );
}
