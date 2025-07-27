import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";
import { format, differenceInYears } from "date-fns";
import type { ListStudents } from "@/models/ListStudents";

export const columns: ColumnDef<ListStudents>[] = [
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
      const idade = differenceInYears(new Date(), dataNascimento);
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
    accessorKey: "imc",
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
      const dataFormatada = format(dataCadastro, "dd/MM/yyyy 'às' HH:mm");
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
