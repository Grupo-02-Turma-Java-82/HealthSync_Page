import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";
import { format, differenceInYears } from "date-fns";
import type { ListStudents } from "@/models/ListStudents";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const getInitials = (name: string) => {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const columns: ColumnDef<ListStudents>[] = [
  {
    id: "foto",
    header: "Foto",
    cell: ({ row }) => {
      const aluno = row.original.aluno;
      const fotoUrl = aluno.urlImagem;
      const nomeCompleto = aluno.nomeCompleto;

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={fotoUrl}
            alt={`Foto de ${nomeCompleto}`}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="text-xs font-medium">
            {getInitials(nomeCompleto)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorFn: (row) => row.aluno.nomeCompleto,
    id: "nomeCompleto",
    header: "Nome",
  },
  {
    id: "idade",
    header: "Idade",
    cell: ({ row }) => {
      const dataNascimento = row.original.aluno.dataNascimento;
      if (!dataNascimento) {
        return <span>-</span>;
      }
      const idade = differenceInYears(new Date(), new Date(dataNascimento));
      return <div>{idade}</div>;
    },
  },
  {
    accessorFn: (row) => row.aluno.genero,
    id: "genero",
    header: "Gênero",
  },
  {
    accessorFn: (row) => row.aluno.alturaCm,
    id: "alturaCm",
    header: "Altura (cm)",
  },
  {
    accessorFn: (row) => row.aluno.pesoKg,
    id: "pesoKg",
    header: "Peso (Kg)",
  },
  {
    accessorFn: (row) => row.aluno.imc,
    id: "imc",
    header: "IMC",
    cell: ({ row }) => {
      const imc = row.original.aluno.imc;

      if (typeof imc !== "number") {
        return <span>-</span>;
      }

      const imcFormatado = imc.toFixed(2);

      return <div>{imcFormatado}</div>;
    },
  },
  {
    accessorKey: "dataCadastro",
    header: "Cadastrado em",
    cell: ({ row }) => {
      const dataCadastro = row.original.aluno.dataCadastro;
      if (!dataCadastro) {
        return <span>-</span>;
      }
      const dataFormatada = format(
        new Date(dataCadastro),
        "dd/MM/yyyy 'às' HH:mm"
      );
      return <div>{dataFormatada}</div>;
    },
  },
];

interface Props {
  students: ListStudents[];
  deleteCustomer?: (id: number) => void;
}

export default function StudentsDatatable({ students }: Props) {
  return <DataTable<ListStudents, unknown> columns={columns} data={students} />;
}
