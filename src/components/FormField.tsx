import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-light-100 font-medium">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className="bg-slate-800/40 h-10 border-slate-700 text-light-100 placeholder:text-light-300/50"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
