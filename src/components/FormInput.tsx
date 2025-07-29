import { useState, type ComponentProps, type ReactNode } from "react";
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

import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";

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
  type,
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

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
                "relative flex h-10 w-full items-center rounded-md border border-input text-sm ring-offset-background",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              )}
            >
              {icon && (
                <span className="flex items-center justify-center pl-3 text-muted-foreground">
                  {icon}
                </span>
              )}

              <Input
                {...field}
                {...rest}
                type={inputType}
                className={cn(
                  "h-full w-full border-none bg-transparent p-3 shadow-none outline-none ring-offset-0",
                  "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  icon ? "pl-5" : "pl-3"
                )}
              />

              {type === "password" && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
