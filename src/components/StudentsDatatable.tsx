import type { User } from "@/models/Users";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";
import { format, differenceInYears } from "date-fns";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nomeCompleto",
    header: "Nome",
  },
  {
    id: "idade",
    header: "Idade",
    cell: ({ row }) => {
      const dataNascimento = row.original.dataNascimento;
      if (!dataNascimento) {
        return <span>-</span>;
      }
      const idade = differenceInYears(new Date(), dataNascimento);
      return <div>{idade}</div>;
    },
  },
  {
    accessorKey: "genero",
    header: "Gênero",
  },
  {
    accessorKey: "alturaCm",
    header: "Altura (cm)",
  },
  {
    accessorKey: "pesoKg",
    header: "Peso (Kg)",
  },
  {
    accessorKey: "imc",
    header: "IMC",
  },
  {
    accessorKey: "dataCadastro",
    header: "Cadastrado em",
    cell: ({ row }) => {
      const dataCadastro = row.getValue("dataCadastro") as Date;
      if (!dataCadastro) {
        return <span>-</span>;
      }
      const dataFormatada = format(dataCadastro, "dd/MM/yyyy 'às' HH:mm");
      return <div>{dataFormatada}</div>;
    },
  },
];

interface Props {
  students: User[];
  deleteCustomer?: (id: number) => void;
}

export default function StudentsDatatable({ students }: Props) {
  return <DataTable<User, unknown> columns={columns} data={students} />;
}
