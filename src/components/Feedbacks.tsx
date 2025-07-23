import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Personal Trainer",
    initials: "CS",
    quote:
      "O HealthSync revolucionou minha forma de trabalhar. Agora consigo gerenciar todos os meus alunos de forma organizada e eficiente. Recomendo para todos os profissionais!",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Usuária Independente",
    initials: "AC",
    quote:
      "Finalmente encontrei uma plataforma que me permite treinar no meu ritmo. Os treinos são bem estruturados e o acompanhamento do progresso é motivador!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Aluno Vinculado",
    initials: "JS",
    quote:
      "Meu personal usa o HealthSync e agora tenho acesso aos meus treinos em qualquer lugar. A interface é super fácil de usar e não perco mais nenhum treino!",
    rating: 5,
  },
];

export function Feedbacks() {
  return (
    <div className="container mx-auto px-4 my-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
          O que nossos usuários dizem
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Histórias reais de pessoas que transformaram seus treinos com o
          HealthSync
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
