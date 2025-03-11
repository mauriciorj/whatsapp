"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Email({
  field,
  fieldToRender,
  isLoading,
  onBlur,
  onChange,
}: any) {
  return (
    <>
      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
      <Input
        id={field.name}
        disabled={fieldToRender.disabled || isLoading}
        name={field.name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={fieldToRender.placeholder}
        required={fieldToRender.required}
        type="email"
        value={field.state.value}
      />
    </>
  );
}
