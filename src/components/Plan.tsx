import { Check, Crown, Heart, Users } from 'lucide-react';

// types.ts ou no mesmo arquivo do componente
export interface PricingFeature {
  text: string;
  // Você pode adicionar um ícone específico para a feature se quiser
  // icon?: React.ReactNode;
}

export interface PlanProps {
  title: string;
  description: string;
  price: string;
  pricePer?: string; // Ex: "/mês"
  details: string; // Descrição longa
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean; // Para exibir o badge "Mais Popular"
  icon: React.ReactNode; // O SVG do ícone
  iconBgColorClass: string; // Classe Tailwind para a cor de fundo do ícone (ex: 'bg-primary')
  buttonColorClass: string; // Classe Tailwind para a cor do botão (ex: 'bg-primary')
  buttonHoverColorClass: string; // Classe Tailwind para o hover do botão (ex: 'hover:bg-primary/90')
  ringColorClass?: string; // Classe Tailwind para o anel de destaque (ex: 'ring-primary')
}

export function Plan({
  title,
  description,
  price,
  pricePer,
  details,
  features,
  buttonText,
  buttonLink,
  isPopular = false,
  icon,
  iconBgColorClass,
  buttonColorClass,
  buttonHoverColorClass,
  ringColorClass = '', // Default vazio para não aplicar sempre
}: PlanProps) {
  const cardClasses = `rounded-lg bg-card text-card-foreground shadow-sm relative card-gradient shadow-card hover-lift transition-smooth border-0`;
  const buttonClasses = `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${buttonColorClass} text-primary-foreground ${buttonHoverColorClass} h-11 rounded-md px-8 w-full font-heading font-semibold hero-gradient shadow-button hover-lift`;

  return (
    <div className={cardClasses}>
      {isPopular && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 absolute -top-3 left-1/2 transform -translate-x-1/2 hero-gradient text-white font-heading font-semibold">
          Mais Popular
        </div>
      )}
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${iconBgColorClass}`}>
          {icon}
        </div>
        <h3 className="tracking-tight text-2xl font-heading font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-4xl font-heading font-bold text-foreground">{price}</span>
          {pricePer && <span className="text-muted-foreground">{pricePer}</span>}
        </div>
        <p className="text-sm text-muted-foreground">{details}</p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              {/* O ícone de check pode ser fixo ou vir das props da feature */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check w-5 h-5 text-primary flex-shrink-0">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <span className="text-sm text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
        <a className="block" href={buttonLink}>
          <button className={buttonClasses}>
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  );
}