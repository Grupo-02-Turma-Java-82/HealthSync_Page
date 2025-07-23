import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Zap, Users, Target } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 mt-10 mb-8">
      <div className="text-center max-w-4xl mx-auto fade-in">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
          Sincronize sua
          <span className="text-primary"> Saúde </span>e Performance
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A plataforma definitiva para personal trainers e alunos que buscam
          resultados reais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="/#planos">
            <Button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md hero-gradient shadow-hero hover-lift font-heading font-semibold text-lg px-8 cursor-pointer"
              size="lg"
            >
              Conheça os Planos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md font-heading font-semibold text-lg px-8 hover-lift cursor-pointer text-foreground"
            onClick={() => navigate("/login")}
            size="lg"
          >
            Ver Demonstração
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              Performance
            </h3>
            <p className="text-muted-foreground">
              Maximize seus resultados com treinos personalizados
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Conexão</h3>
            <p className="text-muted-foreground">
              Conecte personal trainers e alunos facilmente
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              Resultados
            </h3>
            <p className="text-muted-foreground">
              Acompanhe seu progresso e alcance seus objetivos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
