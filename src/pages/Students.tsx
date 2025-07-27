import { useState, useMemo } from "react";
import StudentsDatatable from "@/components/StudentsDatatable";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { FormStudents } from "@/components/FormStudents";
import { usePersonal } from "@/hooks/usePersonal";
import type { ListStudents } from "@/models/ListStudents";
import type { User } from "@/models/Users";

export function Students() {
  const { students, isLoading } = usePersonal();
  const [isForm, setIsForm] = useState(false);

  const normalizedStudents = useMemo(() => {
    if (!Array.isArray(students)) {
      return [];
    }

    return students
      .map((item) => {
        if (!item) {
          return null;
        }

        if ("aluno" in item && item.aluno) {
          return item as ListStudents;
        }

        return { aluno: item as unknown as User } as ListStudents;
      })
      .filter(Boolean) as ListStudents[];
  }, [students]);

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">Alunos</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Veja aqui todos os seus alunos cadastrados.
          </p>
        </div>

        <Button onClick={() => setIsForm(!isForm)}>
          {!isForm && <PlusIcon size={24} />}
          {isForm ? <p>Listar Alunos</p> : <p>Novo Aluno</p>}
        </Button>
      </div>

      {isLoading ? (
        <Loader size={32} className="animate-spin self-center mt-20" />
      ) : (
        <>
          {isForm ? (
            <FormStudents isEditMode={false} onClose={() => setIsForm(false)} />
          ) : (
            <StudentsDatatable students={normalizedStudents} />
          )}
        </>
      )}
    </div>
  );
}
