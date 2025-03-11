"use client";

import { Eye, EyeOff } from "lucide-react";
import PasswordRules from "@/components/auth/passwordRules";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Password({
  field,
  fieldToRender,
  isLoading,
  isShowPassword,
  onBlur,
  onChange,
  passwordValidation,
  setIsShowPassword,
  showPasswordRules,
}: any) {
  return (
    <div className="relative">
      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
      <Input
        className="mt-2"
        disabled={fieldToRender.disabled || isLoading}
        id={field.name}
        name={field.name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={fieldToRender.placeholder}
        required={fieldToRender.required}
        type={isShowPassword ? "text" : "password"}
        value={field.state.value}
      />
      {isShowPassword ? (
        <div
          className="flex w-[25px] absolute right-2 top-10 cursor-pointer text-center justify-center"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          <EyeOff className="h-6 w-6 text-primary" />
        </div>
      ) : (
        <div
          className="flex w-[25px] absolute right-2 top-10 cursor-pointer text-center justify-center"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          <Eye className="h-6 w-6 text-primary" data-testid="showPassword" />
        </div>
      )}
      {showPasswordRules && (
        <div className="mt-3">
          <PasswordRules passwordValidation={passwordValidation} />
        </div>
      )}
    </div>
  );
}
