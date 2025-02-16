"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import UpdateUserPassword from "@/db/actions/updateUserPassword/actions";
import { createClient } from "@/db/supabase/client";
import AuthCard from "@/components/auth/auth-card";
import PasswordRules from "@/components/auth/passwordRules";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

type passValidationType = {
  rule1: boolean;
  rule2: boolean;
  rule3: boolean;
  rule4: boolean;
  rule5: boolean;
};

export default function ResetPassword() {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [passwordValidation, setPasswordValidation] =
    useState<passValidationType>({
      rule1: false,
      rule2: false,
      rule3: false,
      rule4: false,
      rule5: false,
    });

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await UpdateUserPassword(
          value as { password: string }
        );
        if (response === false) {
          setServerError(true);
        } else {
          handleSignOut();
        }
      } catch {
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-16 pb-16 px-4">
      <AuthCard>
        <div className="space-y-6">
          {serverError && (
            <AlertBanner
              message="Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
              type="error"
            />
          )}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Crie uma senha nova</h1>
            <p className="text-muted-foreground">
              Por favor insira uma senha nova para acessar o nosso sistema.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
              setServerError(false);
            }}
          >
            <div className="space-y-2 relative">
              <Label htmlFor="password">Senha</Label>
              <form.Field name="password">
                {(field) => (
                  <>
                    <Input
                      id="password"
                      onBlur={field.handleBlur}
                      onChange={(e: any) => {
                        field.handleChange(e.target.value);
                        const checkRules = PasswordRulesValidation(
                          e.target.value
                        );
                        setPasswordValidation((prevState: any) => ({
                          ...prevState,
                          ...checkRules,
                        }));
                      }}
                      maxLength={20}
                      type={isShowPassword ? "text" : "password"}
                      required
                      value={field.state.value}
                    />
                    {isShowPassword ? (
                      <div
                        className="flex w-[25px] absolute right-2 top-8 cursor-pointer text-center justify-center"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        <EyeOff className="h-6 w-6 text-primary" />
                      </div>
                    ) : (
                      <div
                        className="flex w-[25px] absolute right-2 top-8 cursor-pointer text-center justify-center"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>
              <PasswordRules passwordValidation={passwordValidation} />
            </div>
            <Button
              className="w-full"
              disabled={form.state.isSubmitting}
              type="submit"
            >
              {form.state.isSubmitting ? (
                <div className="flex flex-row items-center italic">
                  Atualizando senha...
                  <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                </div>
              ) : (
                "Atualizar"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link className="text-primary hover:underline" href="/#planos">
              Crie uma agora mesmo.
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
