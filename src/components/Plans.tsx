import { Plan } from "./Plan";
import { Crown, Heart, Users } from "lucide-react";

export function Plans() {
  const plans = [
    {
      id: "personal-trainer",
      title: "Personal Trainer",
      description: "Gerencie seus alunos",
      price: "A partir de R$ 49",
      pricePer: "/mês",
      details:
        "Gerencie todos os seus alunos em um só lugar. O valor se ajusta de acordo com sua base de clientes.",
      features: [
        { text: "Cadastro ilimitado de alunos" },
        { text: "Criação e edição de treinos" },
        { text: "Biblioteca completa de exercícios" },
        { text: "Estatísticas de desempenho" },
        { text: "Suporte prioritário" },
      ],
      buttonText: "Assinar Agora",
      buttonLink: "/cadastro",
      isPopular: true,
      icon: <Crown />,
      iconBgColorClass: "bg-primary",
      buttonColorClass: "bg-primary",
      buttonHoverColorClass: "hover:bg-primary/90",
      ringColorClass: "ring-primary",
    },
    {
      id: "independent-user",
      title: "Usuário Independente",
      description: "Treine por conta própria",
      price: "R$ 29",
      pricePer: "/mês",
      details:
        "Acesso total aos nossos treinos e funcionalidades para você treinar por conta própria.",
      features: [
        { text: "Treinos pré-definidos" },
        { text: "Construtor de treinos personalizado" },
        { text: "Acompanhamento de progresso" },
        { text: "Biblioteca de exercícios" },
        { text: "Relatórios de evolução" },
      ],
      buttonText: "Em Breve...",
      buttonLink: "#",
      isPopular: false,
      icon: <Heart />,
      iconBgColorClass: "bg-secondary",
      buttonColorClass: "bg-secondary",
      buttonHoverColorClass: "hover:bg-secondary/80",
      ringColorClass: "",
    },
    {
      id: "linked-user",
      title: "Usuário Vinculado",
      description: "Acesso sob orientação de um Personal Trainer",
      price: "Gratuito",
      pricePer: "",
      details:
        "Aproveite todas as funcionalidades sob a supervisão do seu personal trainer.",
      features: [
        { text: "Treinos enviados pelo PT" },
        { text: "Acompanhamento do PT" },
        { text: "Chat com o Personal Trainer" },
        { text: "Histórico de treinos" },
      ],
      buttonText: "Conectar-se",
      buttonLink: "/cadastro",
      isPopular: false,
      icon: <Users />,
      iconBgColorClass: "bg-green-500",
      buttonColorClass: "bg-green-500",
      buttonHoverColorClass: "hover:bg-green-600",
      ringColorClass: "",
    },
  ];

  return (
    <section
      id="planos"
      className="py-20 bg-gradient-to-br from-mint-cream to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis para atender suas necessidades específicas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Plan key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
