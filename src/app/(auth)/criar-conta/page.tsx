"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import CreateUserAccount from "@/actions/createUserAccount/actions";
//  import StripePayment from "@/actions/stripe/actions";
import AuthCard from "@/components/auth/auth-card";
import PasswordRules from "@/components/auth/passwordRules";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";
import PLANS from "@/lib/plans";
import { signupSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

type passValidationType = {
  rule1: boolean;
  rule2: boolean;
  rule3: boolean;
  rule4: boolean;
  rule5: boolean;
};

type formValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plan: string;
};

export default function CriarConta() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getPlano = searchParams.get("plano") as "basico" | "avancado" | null;

  const [serverError, setServerError] = useState<boolean | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] =
    useState<passValidationType>({
      rule1: false,
      rule2: false,
      rule3: false,
      rule4: false,
      rule5: false,
    });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      plan: getPlano
        ? `${PLANS[getPlano].name} - R$${PLANS[getPlano].price}`
        : null,
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }: any) => {
      setServerError(null);
      setServerErrorMessage(null);
      try {
        const response = await CreateUserAccount(value as formValuesType);
        if (response?.status === 500) {
          setServerErrorMessage(
            "Ops... algo deu errado. Por favor tente de novo."
          );
          setServerError(true);
        } else if (response?.status === 400) {
          setServerErrorMessage(
            "Esse email já existe, por favor faça o login."
          );
          setServerError(true);
        } else {
          if (getPlano && PLANS[getPlano].name === "basico") {
            router.push("https://pay.kiwify.com.br/vNY2XvG");
          } else {
            router.push("https://pay.kiwify.com.br/tA9jJEx");
          }
        }
      } catch {
        setServerErrorMessage(
          "Ops... algo deu errado. Por favor tente de novo."
        );
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-10 pb-16 px-4">
      {serverError && (
        <AuthCard className="border-0">
          <AlertBanner message={serverErrorMessage} type="error" />
        </AuthCard>
      )}
      <AuthCard>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">
              Primeiro vamos criar a sua conta
            </h1>
            <p className="text-muted-foreground">
              Por favor insira suas informações abaixo
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="firstName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Primeiro nome</Label>
                    <Input
                      id="firstName"
                      maxLength={50}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      placeholder="Nome"
                      required
                      type="text"
                      value={field.state.value}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name="lastName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Último nome</Label>
                    <Input
                      id="lastName"
                      maxLength={50}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      placeholder="Sobre Nome"
                      required
                      type="text"
                      value={field.state.value}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Senha</Label>
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
                </div>
              )}
            </form.Field>
            <PasswordRules passwordValidation={passwordValidation} />
            <form.Field name="plan">
              {(field) => (
                <div className="space-y-2">
                  <Label>Plano</Label>
                  <Input
                    id="plan"
                    onBlur={field.handleBlur}
                    onChange={(e: any) => field.handleChange(e.target.value)}
                    disabled
                    readOnly
                    value={field.state.value}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <Button
              className="w-full"
              disabled={form.state.isSubmitting}
              type="submit"
            >
              {form.state.isSubmitting ? (
                <div className="flex flex-row items-center italic">
                  Criando conta...
                  <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                </div>
              ) : (
                "Criar conta e ir para o pagamento"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            Já possui uma conta?{" "}
            <Link
              className="text-primary hover:underline"
              href="/login"
              prefetch
            >
              Faça o Login.
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
