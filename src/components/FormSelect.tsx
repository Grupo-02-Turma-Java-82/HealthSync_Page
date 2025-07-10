// Crie este ficheiro em: src/components/FormSelect.tsx

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Control } from "react-hook-form";

// 1. Definindo as props que o nosso componente de select vai aceitar.
interface FormSelectProps {
  control: Control<any>; // O objeto 'control' do react-hook-form.
  name: string; // O nome do campo no seu schema de validação.
  label: string; // O texto que aparecerá acima do campo.
  placeholder: string; // O texto que aparece antes de uma seleção ser feita.
  options: {
    // Um array de objetos para as opções do select.
    value: string;
    label: string;
  }[];
}

export function FormSelect({
  control,
  name,
  label,
  placeholder,
  options,
}: FormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {/* 2. O componente Select do shadcn/ui. */}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value} // Garante que o valor selecionado seja exibido corretamente
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {/* 3. Mapeia o array de opções para criar os itens do dropdown. */}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
