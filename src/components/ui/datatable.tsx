import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { EmptyTable } from "../EmptyTable";
import { Edit, SearchIcon, Eye } from "lucide-react";

import { FormStudents } from "../FormStudents";
import type { ListStudents } from "@/models/ListStudents";
import type { Workout } from "@/models/Workout";
import { useWorkouts } from "@/hooks/useWorkouts";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<
  TData extends ListStudents | null | undefined,
  TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TData | null>(null);

  const [studentWorkouts, setStudentWorkouts] = useState<Workout[]>([]);
  const { workoutsExercise } = useWorkouts();

  const handleOpenDetails = (studentData: TData) => {
    if (!studentData?.aluno) return;

    setSelectedStudent(studentData);
    setDetailsDialogOpen(true);

    const allWorkoutLinks = workoutsExercise;
    const studentId = studentData.aluno.id;

    const workoutsMap = new Map<number, Workout>();

    allWorkoutLinks
      .filter((link) => link.treino.usuario?.id === studentId)
      .forEach((link) => {
        if (!workoutsMap.has(link.treino.id)) {
          workoutsMap.set(link.treino.id, {
            ...link.treino,
            treinoExercicios: [],
          });
        }
        workoutsMap.get(link.treino.id)?.treinoExercicios?.push(link);
      });

    setStudentWorkouts(Array.from(workoutsMap.values()));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const noResultsAfterFilter =
    table.getRowModel().rows?.length === 0 && globalFilter !== "";
  const tableIsInitiallyEmpty = data.length === 0;

  if (tableIsInitiallyEmpty) {
    return (
      <div className="py-16">
        <EmptyTable
          icon="user-2"
          iconSize={44}
          title="Não há alunos cadastrados"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border bg-card p-4">
        <div className="relative flex-1 max-w-sm mb-4">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 bg-background border-white"
          />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <DropdownMenu key={row.id}>
                <AlertDialog>
                  <DropdownMenuTrigger asChild>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    side="top"
                    className="bg-card border py-2 px-2 space-y-1 rounded-lg shadow-lg"
                  >
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="flex items-center cursor-pointer transition-colors"
                      onClick={() => handleOpenDetails(row.original)}
                    >
                      <Eye size={16} className="mr-2" />
                      <span className="text-foreground">Ver detalhes</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedStudent(row.original);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit size={16} className="mr-2" />
                      <span className="text-foreground">Editar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </AlertDialog>
              </DropdownMenu>
            ))}
            {noResultsAfterFilter && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmptyTable
                    icon="search-x"
                    title="Nenhum resultado encontrado"
                    iconSize={44}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer"
        >
          Anterior
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer"
        >
          Próximo
        </Button>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Editar Aluno</DialogTitle>
            <DialogDescription>
              Faça alterações nos dados aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <FormStudents
            isEditMode={true}
            initialData={selectedStudent}
            onClose={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Aluno</DialogTitle>
          </DialogHeader>
          {selectedStudent?.aluno && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedStudent.aluno.urlImagem}
                    alt={selectedStudent.aluno.nomeCompleto}
                  />
                  <AvatarFallback>
                    {selectedStudent.aluno.nomeCompleto.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedStudent.aluno.nomeCompleto}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedStudent.aluno.email}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                  Treinos Atribuídos
                </h3>
                {studentWorkouts.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {studentWorkouts.map((treino) => (
                      <AccordionItem
                        key={treino.id}
                        value={`treino-${treino.id}`}
                      >
                        <AccordionTrigger>{treino.nome}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {treino.descricao}
                            </p>
                            <h4 className="font-semibold">Exercícios:</h4>
                            <ul className="space-y-2">
                              {treino.treinoExercicios?.map((te) => (
                                <li
                                  key={te.id}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span>{te.exercicio.nome}</span>
                                  <Badge variant="outline">
                                    {te.exercicio.nivelDificuldade}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-muted-foreground mt-4">
                    Nenhum treino atribuído a este aluno.
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
