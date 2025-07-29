import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";
import type { ListStudents } from "@/models/ListStudents";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  student: ListStudents;
};

const getInitials = (name: string) => {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
      <div className="flex gap-4 items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={student.aluno.urlImagem}
            alt={`Foto de ${student.aluno.nomeCompleto}`}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="font-medium">
            {getInitials(student.aluno.nomeCompleto)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-md font-bold text-foreground">
            {student.aluno.nomeCompleto}
          </h1>
          <p className="text-sm text-muted-foreground">
            Último treino: {lastWorkout}
          </p>
        </div>
      </div>

      <Badge variant={status}>
        {status === "default" ? "Ativo" : "Inativo"}
      </Badge>
    </div>
  );
}
