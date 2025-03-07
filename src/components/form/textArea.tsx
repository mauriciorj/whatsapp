"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextArea({
  field,
  fieldToRender,
  isLoading,
  onBlur,
  onChange,
}: any) {
  const countChar = Boolean(
    fieldToRender.countChar && fieldToRender.countCharMaxChar
  );
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
      {countChar && (
        <div className="w-full h-6 text-right pr-2 mt-2 text-sm">
          <>
            {field.state.value?.length} / {fieldToRender.countCharMaxChar}
          </>
        </div>
      )}
    </>
  );
}
