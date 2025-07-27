import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";
import type { ListStudents } from "@/models/ListStudents";

type Props = {
  student: ListStudents;
};

export function StudentItem({ student }: Props) {
  const createdAt = new Date(student.dataVinculo);

  const lastWorkout = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  const status = student.aluno.ativo ? "default" : "secondary";

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-md font-bold text-foreground">
          {student.aluno.nomeCompleto}
        </h1>
        <p className="text-sm text-muted-foreground">
          Último treino: {lastWorkout}
        </p>
      </div>

      <Badge variant={status}>
        {status === "default" ? "Ativo" : "Inativo"}
      </Badge>
    </div>
  );
}
