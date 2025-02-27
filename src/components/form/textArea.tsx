"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextArea({
  field,
  fieldToRender,
  onBlur,
  onChange,
}: any) {
  return (
    <>
      <Textarea
        id={field.name}
        disabled={fieldToRender.disabled}
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
