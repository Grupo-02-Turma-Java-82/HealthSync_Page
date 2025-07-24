import { createContext, useEffect, useState, type ReactNode } from "react";

import type { UserAPIResponse } from "@/models/Users";

import { api } from "@/services/api";
import { toast } from "react-toastify";

type AuthContext = {
  isLoading: boolean;

  session: null | UserAPIResponse;

  save: (data: UserAPIResponse) => void;

  remove: () => void;
};

const LOCAL_STORAGE_KEY = "@healthsync";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);

  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    const { token, ...user } = data;

    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(user));

    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, token);

    api.defaults.headers.common["Authorization"] = `${token}`;

    setSession(data);

    toast.success("Logado com sucesso!");

    loadUser();
  }

  function remove() {
    setSession(null);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    toast.success("Deslogado com sucesso!");
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);

    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `${token}`;

      setSession({
        token,
        usuarioLogin: JSON.parse(user),
      });
    }

    setIsLoading(false);

    toast.success("Seja Bem-vindo(a) novamente! 💪🏼");
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
