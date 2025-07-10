export function Footer() {
  return (

    <footer className="bg-muted-foreground text-white py-16">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagram w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  ></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-facebook w-5 h-5"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  ></path>
                </svg>
              </a>
              <a
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-twitter w-5 h-5"
                >
                  <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/sobre"
                >Sobre Nós</a>
                
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/funcionalidades"
                >Funcionalidades</a>
                
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/planos"
                >Planos e Preços</a>
                
              </li>
              <li>
                <a
                  className="text-timberwolf hover:text-primary transition-fast"
                  href="/blog"
                >Blog</a>
                
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-timberwolf">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mail w-4 h-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>contato@healthsync.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-timberwolf">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-phone w-4 h-4"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-timberwolf">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin w-4 h-4"
                >
                  <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-timberwolf text-sm">
            © 2025 HealthSync. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              className="text-timberwolf hover:text-primary transition-fast"
              href="/termos"
            >Termos de Serviço</a>
          
            <a
              className="text-timberwolf hover:text-primary transition-fast"
              href="/privacidade"
            >Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}