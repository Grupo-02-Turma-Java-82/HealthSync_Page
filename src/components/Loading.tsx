import { Loader } from "lucide-react";

export function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <Loader size={48} className="animate-spin text-primary" />
      <h1 className="text-2xl font-semibold">Preparando tudo para você...</h1>
      <p className="text-muted-foreground">Por favor, aguarde um momento.</p>
    </div>
  );
}
