import type { User } from "@/models/Users";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";

type Props = {
  users: User;
};

export function UserItem({ users }: Props) {
  const createdAt = new Date(users.dataCadastro);

  const lastWorkout = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  const diffHours =
    (new Date().getTime() - createdAt.getTime()) / (50000 * 60 * 120);
  const status = diffHours > 4 ? "default" : "secondary";

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-md font-bold text-foreground">
          {users.nomeCompleto}
        </h1>
        <p className="text-sm text-muted-foreground">
          Último treino: {lastWorkout}
        </p>
      </div>

      <Badge variant={status}>
        {status == "default" ? "Ativo" : "Inativo"}
      </Badge>
    </div>
  );
}
