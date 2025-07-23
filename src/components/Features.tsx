import {
  Dumbbell,
  Users,
  BookOpen,
  Smartphone,
  TrendingUp,
  UserCheck,
} from "lucide-react";

export function Features() {
  const trainerFeatures = [
    {
      title: "Gestão de Alunos",
      description:
        "Gerencie todos os seus alunos em um só lugar, com perfis detalhados e acompanhamento personalizado.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Criação de Treinos Ilimitados",
      description:
        "Crie treinos personalizados sem limites, adaptados às necessidades específicas de cada aluno.",
      icon: <Dumbbell className="w-6 h-6 text-primary" />,
    },
    {
      title: "Biblioteca de Exercícios",
      description:
        "Organize sua biblioteca pessoal de exercícios com descrições, vídeos e categorias customizadas.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
  ];

  const studentFeatures = [
    {
      title: "Acesso Fácil aos Treinos",
      description:
        "Acesse seus treinos a qualquer hora, em qualquer lugar, com interface intuitiva e responsiva.",
      icon: <Smartphone className="w-6 h-6 text-primary" />,
    },
    {
      title: "Acompanhamento de Progresso",
      description:
        "Visualize sua evolução com gráficos detalhados e histórico completo de treinos realizados.",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
    {
      title: "Interface Intuitiva",
      description:
        "Navegue facilmente pela plataforma com design moderno e experiência otimizada para resultados.",
      icon: <UserCheck className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white-healthsync">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Funcionalidades Poderosas
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Tudo que você precisa para transformar sua jornada fitness
          </p>
        </div>

        <div className="mt-20">
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Para Personal Trainers
              </h3>
              <p className="text-lg text-muted-foreground">
                Ferramentas profissionais para gerenciar e expandir seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {trainerFeatures.map((feature, index) => (
                <div
                  key={index}
                  data-slot="card"
                  className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    data-slot="card-header"
                    className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <div
                      data-slot="card-title"
                      className="text-xl font-semibold text-foreground"
                    >
                      {feature.title}
                    </div>
                  </div>

                  <div data-slot="card-content" className="px-6">
                    <div
                      data-slot="card-description"
                      className="text-sm text-muted-foreground"
                    >
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Para Alunos
              </h3>
              <p className="text-lg text-muted-foreground">
                Experiência simplificada para focar no que realmente importa:
                seus resultados
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {studentFeatures.map((feature, index) => (
                <div
                  key={index}
                  data-slot="card"
                  className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    data-slot="card-header"
                    className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <div
                      data-slot="card-title"
                      className="text-xl font-semibold text-foreground"
                    >
                      {feature.title}
                    </div>
                  </div>

                  <div data-slot="card-content" className="px-6">
                    <div
                      data-slot="card-description"
                      className="text-sm text-muted-foreground"
                    >
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
