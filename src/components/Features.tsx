
// Importe os ícones que você vai usar
import { Dumbbell, Users, BookOpen, Smartphone, TrendingUp, UserCheck } from 'lucide-react';

import Feature from './Feature';

export function Features() {
  const trainerFeatures = [
    {
      title: 'Gestão de Alunos',
      description: 'Gerencie todos os seus alunos em um só lugar de forma intuitiva',
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Criação de Treinos Ilimitados',
      description: 'Crie treinos personalizados sem limitações',
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Biblioteca de Exercícios',
      description: 'Acesso completo à nossa biblioteca de exercícios com vídeos',
      icon: <Dumbbell className="w-6 h-6 text-primary" />,
    },
  ];

  const studentFeatures = [
    {
      title: 'Acesso Fácil aos Treinos',
      description: 'Acesse seus treinos de qualquer lugar, a qualquer hora',
      icon: <Smartphone className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Acompanhamento de Progresso',
      description: 'Visualize sua evolução com gráficos e estatísticas',
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Interface Intuitiva',
      description: 'Design simples e fácil de usar para todos os níveis',
      icon: <UserCheck className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Funcionalidades Poderosas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para transformar seus treinos e alcançar seus objetivos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Seção para Personal Trainers */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-8 text-center">
              Para Personal Trainers
            </h3>
            <div className="space-y-6">
              {trainerFeatures.map((feature, index) => (
                <Feature
                  key={index} // Use uma chave única se a ordem dos itens puder mudar
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>

          {/* Seção para Alunos */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-8 text-center">
              Para Alunos
            </h3>
            <div className="space-y-6">
              {studentFeatures.map((feature, index) => (
                <Feature
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}