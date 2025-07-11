import type { ComponentProps, ReactNode } from "react";
import type { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps extends ComponentProps<"input"> {
  control: Control<any>;
  name: string;
  label: string;
  icon?: ReactNode;
}

export function FormInput({
  control,
  name,
  label,
  icon,
  ...rest
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 w-full">
          <FormLabel>
            <h1 className="text-medium">{label}</h1>
          </FormLabel>
          <FormControl>
            <div
              className={cn(
                "flex h-10 w-full items-center rounded-md border border-input bg-background text-sm ring-offset-background",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              )}
            >
              {icon && (
                <span className="flex items-center justify-center pl-3 absolute">
                  {icon}
                </span>
              )}

              <Input
                {...field}
                {...rest}
                className={cn(
                  "h-full w-full border-none bg-transparent p-3 shadow-none outline-none ring-offset-0",
                  "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  icon && "pl-10"
                )}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
