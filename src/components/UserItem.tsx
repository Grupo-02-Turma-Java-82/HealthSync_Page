import type { User } from "@/models/Users";
import { UserBadge } from "./UserBadge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const status = diffHours > 4 ? "inactive" : "active";

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

      <UserBadge variant={status} />
    </div>
  );
}
