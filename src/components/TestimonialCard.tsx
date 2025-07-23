import type { Testimonial } from "@/models/Testimonial";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { StarRating } from "./StarRating";

export type Props = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className="hover:scale-105 transition ease-in-out flex flex-col h-full">
      <CardHeader>
        <StarRating rating={testimonial.rating} />
      </CardHeader>

      <CardContent className="text-muted-foreground italic flex-grow">
        "{testimonial.quote}"
      </CardContent>

      <CardFooter className="flex items-center gap-3">
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-semibold">
            {testimonial.initials}
          </span>
        </span>

        <div>
          <h4 className="font-heading font-semibold text-foreground">
            {testimonial.name}
          </h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
