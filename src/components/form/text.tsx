"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Text({
  field,
  fieldToRender,
  isLoading,
  onBlur,
  onChange,
}: any) {
  // const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  // const countChar = Boolean(
  //   isOnFocus && fieldToRender.countChar && fieldToRender.countCharMaxChar
  // );
  const countChar = Boolean(
    fieldToRender.countChar && fieldToRender.countCharMaxChar
  );
  return (
    <>
      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
      <Input
        id={field.name}
        disabled={fieldToRender.disabled || isLoading}
        maxLength={fieldToRender.maxLength}
        name={field.name}
        onBlur={() => {
          // setIsOnFocus(false);
          onBlur();
        }}
        onChange={onChange}
        // onFocusCapture={() => setIsOnFocus(true)}
        placeholder={fieldToRender.placeholder}
        required={fieldToRender.required}
        type="text"
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
