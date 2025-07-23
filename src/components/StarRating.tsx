import { StarIcon } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={index} className="w-6 h-w6 fill-primary text-primary" />
      ))}
    </div>
  );
}
