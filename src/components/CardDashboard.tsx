import type { ComponentProps } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { IconName } from "lucide-react/dynamic";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function CardDashboardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-5 w-2/4" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
      <Skeleton className="h-8 w-1/3 mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </Card>
  );
}

type Props = ComponentProps<"div"> & {
  title: string;
  subTitle: string;
  icon: IconName;
  data: number;
  porcent?: number;
  isLoading?: boolean;
};

export function CardDashboard({
  title,
  subTitle,
  icon,
  data,
  porcent,
  isLoading,
}: Props) {
  if (isLoading) {
    return <CardDashboardSkeleton />;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-sm font-medium text-muted-foreground">{title}</h1>
        <DynamicIcon name={icon} className="h-5 w-5 text-muted-foreground" />
      </div>

      <h1 className="text-2xl font-bold text-foreground">{data}</h1>

      <div className="flex justify-between mt-1">
        <p className="text-xs text-muted-foreground">{subTitle}</p>

        {porcent != null && porcent > 0 && (
          <p className="text-xs text-emerald-500 font-semibold">+{porcent}%</p>
        )}
      </div>
    </Card>
  );
}
