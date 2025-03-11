"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
// import CreateUserAccount from "@/actions/createUserAccount/actions";
import AuthCard from "@/components/auth/auth-card";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { signupSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import PageLayout from "@/components/layout/pageLayout";
import { v4 as uuidv4 } from "uuid";

export default function CriarConta() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.CreateAccount");

  const getPlano = searchParams.get("plano") as "basico" | "avancado";

  const [serverError, setServerError] = useState<boolean | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      plan: getPlano
        ? `${BusinessRules[getPlano]?.name} - R$${BusinessRules[getPlano]?.price}`
        : null,
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }: any) => {
      setServerError(null);
      setServerErrorMessage(null);
      // CLIENT SIDE
      const supabase = await createClient();

      if (
        !Object.values(BusinessRules).some((plan) => plan?.name === getPlano)
      ) {
        setServerError(true);
        setServerErrorMessage(
          "Ops... algo deu errado. Por favor tente de novo."
        );
      }

      const data = {
        email: value.email.toLowerCase(),
        password: value.password,
      };

      // Step 1 - Check if account doesn't exist
      const { data: hasUser } = await supabase
        .from("user_profile")
        .select("email")
        .eq("email", value.email);

      if (hasUser && hasUser[0]?.email) {
        setServerError(true);
        setServerErrorMessage("Esse email já existe, por favor faça o login.");
      }

      // Step 2 - Create account
      // Supabase will add the id and email to user_profile table
      const { data: signUpData, error } = await supabase.auth.signUp(data);

      if (error) {
        setServerError(true);
        setServerErrorMessage(
          "Ops... algo deu errado. Por favor tente de novo."
        );
      }

      // Step 3 - Update account after create it
      if (signUpData?.user?.id) {
        const { error } = await supabase
          .from("user_profile")
          .update({
            country: "Brasil",
            irst_name: value.firstName,
            last_name: value.lastName,
            plan: getPlano,
            user_id: signUpData?.user?.id,
            role: "admin",
            account_id: uuidv4(),
          })
          .eq("user_id", signUpData?.user?.id);

        if (error) {
          setServerError(true);
          setServerErrorMessage(
            "Ops... algo deu errado. Por favor tente de novo."
          );
        }
      }

      router.push("https://pay.kiwify.com.br/JeIpGkP");

      // if (getPlano === "basico") {
      //   router.push("https://pay.kiwify.com.br/vNY2XvG");
      // } else if (getPlano === "avancado") {
      //   router.push("https://pay.kiwify.com.br/JeIpGkP");
      // } else {
      //   setServerError(true);
      //   setServerErrorMessage(
      //     "Ops... algo deu errado. Por favor tente de novo."
      //   );
      // }

      // SERVER SIDE
      // try {
      //   const response = await CreateUserAccount({
      //     email: value.email,
      //     firstName: value.firstName,
      //     lastName: value.lastName,
      //     password: value.password,
      //     plan: getPlano,
      //   });
      //   if (response?.status === 500) {
      //     setServerErrorMessage(
      //       "Ops... algo deu errado. Por favor tente de novo."
      //     );
      //     setServerError(true);
      //   } else if (response?.status === 400) {
      //     setServerErrorMessage(
      //       "Esse email já existe, por favor faça o login."
      //     );
      //     setServerError(true);
      //   }
      // } catch {
      //   setServerErrorMessage(
      //     "Ops... algo deu errado. Por favor tente de novo."
      //   );
      //   setServerError(true);
      // }
    },
  });
  const breadcrumbItems = [
    {
      href: `/criar-conta?plano=${getPlano}`,
      label: "Criar Conta",
      icon: UserPlus,
    },
  ];
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {serverError && <AlertBanner message={serverErrorMessage} type="error" />}
      <AuthCard
        title={translate["cardTitle"]}
        description={translate["cardDescription"]}
      >
        <Form
          createAccountLinkLabel={translate["form"]["createAccountLinkLabel"]}
          fieldsToRender={[
            {
              label: translate["form"]["fields"]["firstName"]["label"],
              name: translate["form"]["fields"]["firstName"]["name"],
              placeholder:
                translate["form"]["fields"]["firstName"]["placeholder"],
              type: "text",
            },
            {
              label: translate["form"]["fields"]["lastName"]["label"],
              name: translate["form"]["fields"]["lastName"]["name"],
              placeholder:
                translate["form"]["fields"]["lastName"]["placeholder"],
              type: "text",
            },
            {
              label: translate["form"]["fields"]["email"]["label"],
              name: translate["form"]["fields"]["email"]["name"],
              placeholder: translate["form"]["fields"]["email"]["placeholder"],
              type: "email",
            },
            {
              label: translate["form"]["fields"]["password"]["label"],
              name: translate["form"]["fields"]["password"]["name"],
              type: "password",
            },
            {
              disabled: true,
              label: translate["form"]["fields"]["plan"]["label"],
              name: translate["form"]["fields"]["plan"]["name"],
              type: "text",
            },
          ]}
          forgotPasswordLabel={translate["form"]["forgotPasswordLabel"]}
          form={form}
          makeLoginLabel={translate["makeLoginLabel"]}
          showPasswordRules
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </AuthCard>
    </PageLayout>
  );
}
