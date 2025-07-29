import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import type { ComponentProps } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = ComponentProps<"nav"> & {
  nameUser: string;
  typeUser: string;
  photo: string;
};

export function NavbarDashboard({ nameUser, typeUser, photo }: Props) {
  const { setTheme, theme } = useTheme();

  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="bg-background/95 backdrop-blur border-b border-border h-16 flex items-center justify-between px-6">
      <SidebarTrigger className="text-foreground cursor-pointer" />

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Mudar tema</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Bell />
        </Button>

        <div className="flex flex-col gap-1 justify-center items-end">
          <h1 className="text-sm font-medium text-foreground">{nameUser}</h1>
          <p className="text-xs text-muted-foreground">{typeUser}</p>
        </div>

        <Avatar>
          <AvatarImage
            src={photo}
            alt={`Foto do usuário ${nameUser}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <AvatarFallback className="w-8 h-8 text-sm">
            {getInitials(nameUser)}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
