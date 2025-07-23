import type { Plan } from "@/models/Plan";
import { Check } from "lucide-react";

export function Plan({ plan }: { plan: Plan }) {
  const cardClasses = `rounded-lg bg-card text-card-foreground shadow-sm relative card-gradient shadow-card hover-lift transition-smooth border-0`;
  const buttonClasses = `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${plan.buttonColorClass} text-primary-foreground ${plan.buttonHoverColorClass} h-11 rounded-md px-8 w-full font-heading font-semibold hero-gradient shadow-button hover-lift`;

  return (
    <div className={cardClasses}>
      {plan.isPopular && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 absolute -top-3 left-1/2 transform -translate-x-1/2 hero-gradient text-white font-heading font-semibold">
          Mais Popular
        </div>
      )}
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${plan.iconBgColorClass}`}
        >
          {plan.icon}
        </div>
        <h3 className="tracking-tight text-2xl font-heading font-bold text-foreground mb-2">
          {plan.title}
        </h3>
        <p className="text-muted-foreground mb-4">{plan.description}</p>
        <div className="mb-4">
          <span className="text-4xl font-heading font-bold text-foreground">
            {plan.price}
          </span>
          {plan.pricePer && (
            <span className="text-muted-foreground">{plan.pricePer}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{plan.details}</p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <a className="block" href={plan.buttonLink}>
          <button className={buttonClasses}>{plan.buttonText}</button>
        </a>
      </div>
    </div>
  );
}
