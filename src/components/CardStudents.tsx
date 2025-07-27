import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import { StudentItem } from "./StudentItem";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import type { ListStudents } from "@/models/ListStudents";

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

  const sortedStudents = [...students].sort((a, b) => {
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
        <span className="flex gap-2">
          <DynamicIcon size={20} name={icon} />
          <h1 className="font-semibold">{title}</h1>
        </span>
        <p className="text-muted-foreground text-sm">{subTitle}</p>
      </div>

      {isLoading ? (
        <Loader className="animate-spin self-center" />
      ) : (
        <>
          {(displayedStudents ?? []).length === 0 ? (
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

          {students.length > 4 && (
            <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Ver menos" : "Ver todos os alunos"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
