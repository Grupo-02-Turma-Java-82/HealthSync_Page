import type { ComponentProps } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  data: number;
  porcent?: number;
};

export function CardDashboard({ title, subTitle, icon, data, porcent }: Props) {
  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <h1 className="text-sm font-medium text-muted-foreground">{title}</h1>
        <DynamicIcon name={icon} className="h-4 w-4 text-muted-foreground" />
      </div>

      <h1 className="text-2xl font-bold text-foreground">{data}</h1>

      <div className="flex justify-between">
        <p className="text-xs text-muted-foreground">{subTitle}</p>

        {porcent && (
          <p className="text-xs text-muted-foreground">+{porcent}%</p>
        )}
      </div>
    </Card>
  );
}
