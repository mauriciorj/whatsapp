"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextArea({
  field,
  fieldToRender,
  isLoading,
  onBlur,
  onChange,
}: any) {
  return (
    <>
      <Textarea
        id={field.name}
        disabled={fieldToRender.disabled || isLoading}
        name={field.name}
        maxLength={field.maxLength || 500}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={fieldToRender.placeholder}
        required={fieldToRender.required}
        value={field.state.value}
      />
    </>
  );
}
