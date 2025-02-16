"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import LoginUser from "@/db/actions/login/actions";
import AuthCard from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

export default function Login() {
  const [serverError, setServerError] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }: any) => {
      const response = await LoginUser(
        value as { email: string; password: string }
      );
      if (response === false) {
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-16 pb-16 px-4">
      <AuthCard>
        <div className="space-y-6">
          {serverError && (
            <AlertBanner message="Usuário e/ou senha inválidos." type="error" />
          )}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Seja Bem Vindo</h1>
            <p className="text-muted-foreground">
              Insira suas informações para acessar o sistema
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
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <form.Field name="email">
                {(field) => (
                  <>
                    <Input
                      id="email"
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      required
                      type="email"
                      value={field.state.value}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Senha</Label>
              <form.Field name="password">
                {(field) => (
                  <>
                    <Input
                      id="password"
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      required
                      type={isShowPassword ? "text" : "password"}
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
            </div>
            <div className="text-right">
              <Link
                className="text-sm text-primary hover:underline"
                href="/recuperar-senha"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Button
              className="w-full"
              disabled={form.state.isSubmitting}
              type="submit"
            >
              {form.state.isSubmitting ? (
                <div className="flex flex-row items-center italic">
                  Entrando...
                  <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                </div>
              ) : (
                "Entrar"
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
