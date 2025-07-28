import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";
import type { ListStudents } from "@/models/ListStudents";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { SyntheticEvent } from "react";

type Props = {
  student: ListStudents;
};

const PLACEHOLDER_IMG =
  "https://ik.imagekit.io/brunogodoy/placeholder.jpg?updatedAt=1751288384316";

export function StudentItem({ student }: Props) {
  const createdAt = new Date(student.dataVinculo);

  const lastWorkout = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  const status = student.aluno.ativo ? "default" : "secondary";

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMG;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={student.aluno.urlImagem}
            alt={`Foto de ${student.aluno.nomeCompleto}`}
            className="rounded-full object-cover"
            onError={handleImageError}
          />
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
