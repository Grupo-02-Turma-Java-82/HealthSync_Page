import { FormExercises } from "@/components/FormExercises";

export function NewExercise() {
  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <div className="mr-2 md:mr-0">
          <h1 className="text-3xl font-bold text-foreground">
            Montar Exercício
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Cadastre os exercícios para seus alunos.
          </p>
        </div>
      </div>

      <FormExercises />
    </div>
  );
}
