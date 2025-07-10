import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "py-0.5 px-2 inline-flex justify-center items-center rounded-md font-bold transition-colors uppercase text-sm",
  {
    variants: {
      variant: {
        default: "bg-transparent text-primary",
        active: "bg-primary text-primary-foreground",
        inactive: "bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function UserBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant == "active" ? "Ativo" : "Inativo"}
    </span>
  );
}
