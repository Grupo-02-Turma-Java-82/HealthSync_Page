import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TigerMascot() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="100" cy="100" r="70" fill="#FDB813" />
        <circle cx="50" cy="50" r="20" fill="#FDB813" />
        <circle cx="150" cy="50" r="20" fill="#FDB813" />
        <circle cx="55" cy="55" r="15" fill="#2c2c2c" />
        <circle cx="145" cy="55" r="15" fill="#2c2c2c" />
        <path
          d="M 80 110 C 80 130, 120 130, 120 110 Z"
          fill="white"
          stroke="#2c2c2c"
          strokeWidth="3"
        />
        <path d="M 95 115 C 95 125, 105 125, 105 115 Z" fill="#2c2c2c" />
        <circle cx="80" cy="90" r="8" fill="#2c2c2c" />
        <circle cx="120" cy="90" r="8" fill="#2c2c2c" />
        <path
          d="M 40 80 Q 50 100 40 120"
          stroke="#2c2c2c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 160 80 Q 150 100 160 120"
          stroke="#2c2c2c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 70 60 Q 80 70 90 60"
          stroke="#2c2c2c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 130 60 Q 120 70 110 60"
          stroke="#2c2c2c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <TigerMascot />
      <h1 className="mt-8 text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Oops! Página não encontrada.
      </h2>
      <p className="mt-2 text-muted-foreground max-w-sm">
        Parece que o nosso tigre se perdeu pelo caminho! Não se preocupe, vamos
        ajudá-lo a voltar para um lugar seguro.
      </p>
      <Button onClick={() => navigate(-1)} className="mt-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para a página anterior
      </Button>
    </div>
  );
}
