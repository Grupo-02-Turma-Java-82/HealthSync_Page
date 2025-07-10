import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo e Título */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-fast">
          <img
            src="https://i.imgur.com/2Mjvyxn_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
            alt="HealthSync"
            className="w-8 h-8"
          />
          <span className="font-heading font-bold text-xl text-foreground">
            HealthSync
          </span>
        </Link>

        {/* Botões */}
        <div className="flex items-center gap-4">
          {/* Alternar Tema */}
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-accent hover:text-accent-foreground">
            {/* Sol (claro) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-sun h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>

            {/* Lua (escuro) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>

            <span className="sr-only">Alternar tema</span>
          </button>

          {/* Botão Entrar */}
          <Link to="/login">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 font-medium">
              Entrar
            </button>
          </Link>

          {/* Botão Cadastrar */}
          <Link to="/cadastro">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hero-gradient shadow-button hover-lift font-medium">
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

