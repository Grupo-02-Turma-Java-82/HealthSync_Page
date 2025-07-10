import { useState, type ComponentProps } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import type { User } from "@/models/Users";
import { UserItem } from "./UserItem";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  users: User[];
  isLoading: boolean;
};

export function CardUsers({ title, subTitle, icon, users, isLoading }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedUsers = [...users].sort(
    (a, b) => b.dataCadastro.getTime() - a.dataCadastro.getTime()
  );

  const displayedUsers = isExpanded ? sortedUsers : sortedUsers.slice(0, 4);

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
          <div className="flex flex-col gap-4 mt-4">
            {displayedUsers.map((user) => (
              <UserItem key={user.id} users={user} />
            ))}
          </div>

          {users.length > 4 && (
            <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Ver menos" : "Ver todos os alunos"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
