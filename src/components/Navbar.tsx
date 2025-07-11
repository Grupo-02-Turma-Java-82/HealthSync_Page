import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-4 py-6">
      <div className="flex justify-center items-center gap-4">
        <img
          src="https://ik.imagekit.io/brunogodoy/LogoSync.png?updatedAt=1752036904552"
          alt="Imagem de um tigre laranja olhando sério"
          className="w-14 h-12 hidden md:inline-flex"
        />
        <h1 className="font-heading font-bold text-base text-foreground md:text-2xl">
          HealthSync
        </h1>
      </div>

      <div className="flex md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Mudar tema</span>
        </Button>

        <Button variant="ghost" onClick={() => navigate("/login")}>
          Entrar
        </Button>

        <Button onClick={() => navigate("/cadastro")}>Cadastrar</Button>
      </div>
    </nav>
  );
}
