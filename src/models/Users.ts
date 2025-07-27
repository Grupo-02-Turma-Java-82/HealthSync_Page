export type User = {
  id?: number;
  nomeCompleto: string;
  urlImagem: string;
  email: string;
  senha: string;
  dataNascimento: string;
  genero: string;
  alturaCm: number;
  pesoKg: number;
  imc?: number;
  objetivoPrincipal: string;
  dataCadastro?: string;
  dataDesativacao?: string;
  tipoUsuario: "ALUNO" | "TREINADOR" | "ADMINISTRADOR";
  ativo?: boolean;
};

export type UserLogin = {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  tipoUsuario: "ALUNO" | "TREINADOR" | "ADMINISTRADOR";
};

export type UserAPIResponse = {
  token: string;
  usuarioLogin: UserLogin;
};
