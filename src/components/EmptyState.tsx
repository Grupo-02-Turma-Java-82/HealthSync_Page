import { PackageOpen } from "lucide-react";

type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({
  message = "Nenhum item encontrado.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-card p-10 rounded-xl border border-border shadow-sm space-y-4">
      <PackageOpen
        className="w-16 h-16 text-muted-foreground"
        strokeWidth={1}
      />
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-foreground">
          Nada por aqui ainda
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      </div>
    </div>
  );
}
