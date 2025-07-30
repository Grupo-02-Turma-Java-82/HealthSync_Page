import { Skeleton } from "@/components/ui/skeleton";

export function WorkoutSkeleton() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 1 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 border bg-card rounded-xl shadow-sm p-6"
        >
          <Skeleton className="h-6 w-6 rounded-md" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}
