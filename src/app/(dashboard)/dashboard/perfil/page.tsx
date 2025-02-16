"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import GetUser from "@/actions/getUser/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import ResetPasswordForEmail from "@/db/actions/resetPasswordForEmail/actions";
import { createClient } from "@/db/supabase/client";
import AuthCard from "@/components/auth/auth-card";
import PasswordRules from "@/components/auth/passwordRules";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

type passValidationType = {
  rule1: boolean;
  rule2: boolean;
  rule3: boolean;
  rule4: boolean;
  rule5: boolean;
};

export default function Perfil() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isShowResetPasswordComponent = searchParams.get("showResetPassword");

  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // This is control by url once the user has to
  // access the email and then click on the link to return to this page
  const [isShowPasswordComponent, setIsShowPasswordComponent] =
    useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] =
    useState<passValidationType>({
      rule1: false,
      rule2: false,
      rule3: false,
      rule4: false,
      rule5: false,
    });

  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(false);

  useEffect(() => {
    if (isShowResetPasswordComponent) {
      setIsShowPasswordComponent(true);
    }
  }, [isShowResetPasswordComponent]);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => GetUser(),
  });

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile({ userId: userData?.user?.id }),
    enabled: !!userData?.user?.id,
  });

  const mutation = useMutation({
    mutationFn: () =>
      ResetPasswordForEmail({
        email: userProfileData?.email,
        redirectToUrl: `https://www.zaprouter.pro/dashboard/perfil?showResetPassword=true`,
      } as any),
    onError: () => {
      setIsLoading(false);
      setServerError(true);
      setSuccessMessage(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      setServerError(false);
      setSuccessMessage(true);
    },
  });

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
          setSuccessMessage(true);
          handleSignOut();
        }
      } catch {
        setServerError(true);
      }
    },
  });

  return (
    <>
      <main className="min-h-screen pt-24 pb-16 px-4">
        {serverError && (
          <div className="container mx-auto max-w-3xl mb-10">
            <AlertBanner
              message="Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
              type="error"
            />
          </div>
        )}
        {successMessage && (
          <div className="container mx-auto max-w-3xl mb-10">
            <AlertBanner
              message="Por favor verifique o seu email. Enviamos todas as informações para alterar a sua senha."
              type="success"
            />
          </div>
        )}
        <div className="container mx-auto max-w-3xl">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuário</h1>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Primeiro Nome</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="w-full h-6 w-32" />
                    ) : (
                      userProfileData?.first_name
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Último Nome</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.last_name
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.email
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Plano Atual</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.plan
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {!isShowPasswordComponent && (
              <div className="mt-6">
                <Button
                  onClick={() => {
                    if (userProfileData?.email) {
                      setIsLoading(true);
                      mutation.mutate();
                    }
                  }}
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? (
                    <div className="flex flex-row items-center italic">
                      Processando...
                      <LoaderCircle className="animate-spin h-6 w-5 ml-2" />
                    </div>
                  ) : (
                    "Alterar Password"
                  )}
                </Button>
              </div>
            )}
            {isShowPasswordComponent && (
              <div className="pt-16 pb-16 px-4">
                <AuthCard>
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <h1 className="text-2xl font-bold">
                        Crie uma senha nova
                      </h1>
                      <p className="text-muted-foreground">
                        Por favor insira uma senha nova para acessar o nosso
                        sistema.
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
                                  onClick={() =>
                                    setIsShowPassword(!isShowPassword)
                                  }
                                >
                                  <EyeOff className="h-6 w-6 text-primary" />
                                </div>
                              ) : (
                                <div
                                  className="flex w-[25px] absolute right-2 top-8 cursor-pointer text-center justify-center"
                                  onClick={() =>
                                    setIsShowPassword(!isShowPassword)
                                  }
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
                        <PasswordRules
                          passwordValidation={passwordValidation}
                        />
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
                  </div>
                </AuthCard>
              </div>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
