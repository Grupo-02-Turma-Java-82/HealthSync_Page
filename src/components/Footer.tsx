import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted-foreground-health-sync text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a className="flex items-center gap-2 mb-4" href="/">
              <img
                src="https://ik.imagekit.io/brunogodoy/LogoSync.png?updatedAt=1752036904552"
                alt="HealthSync"
                className="w-8 h-8"
              />
              <span className="font-heading font-bold text-xl">HealthSync</span>
            </a>
            <p className="text-timberwolf mb-4 max-w-md">
              A plataforma definitiva para personal trainers e alunos que buscam
              resultados reais. Sincronize sua saúde e performance.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                href="#"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                href="#"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                href="#"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Links Úteis
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/sobre"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/funcionalidades"
                >
                  Funcionalidades
                </a>
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/planos"
                >
                  Planos e Preços
                </a>
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/blog"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-timberwolf">
                <Mail className="w-4 h-4" />
                <span>contato@healthsync.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-timberwolf">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-timberwolf">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-timberwolf text-sm">
            © 2025 HealthSync. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              className="text-timberwolf hover:text-primary transition-fast"
              href="/termos"
            >
              Termos de Serviço
            </a>
            <a
              className="text-timberwolf hover:text-primary transition-fast"
              href="/privacidade"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
