"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import ResetPasswordForEmail from "@/actions/resetPasswordForEmail/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import ProfileTable from "@/components/dashboard/profileTable";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { RESET_PASSWORD_REDIRECT_TO_URL } from "@/lib/constants";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function Perfil() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const translate = useTranslations("Pages.Dashboard.Perfil");

  const [isLoading, setIsLoading] = useState(false);
  // This is control by url once the user has to
  // access the email and then click on the link to return to this page
  const [isShowPasswordComponent, setIsShowPasswordComponent] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isShowResetPasswordComponent = searchParams.get("showResetPassword");

  const { user: userProfileData, isLoading: isUserProfileDataLoading } =
    useUserProfile();

  useEffect(() => {
    if (isShowResetPasswordComponent === "true") {
      setIsShowPasswordComponent(true);
    } else {
      setIsShowPasswordComponent(false);
    }
  }, [isShowResetPasswordComponent]);

  const mutation = useMutation({
    mutationFn: () =>
      ResetPasswordForEmail({
        email: userProfileData?.email,
        redirectToUrl: RESET_PASSWORD_REDIRECT_TO_URL,
      } as any),
    onError: () => {
      setSuccessMessage(null);
      setErrorMessage(translate["form"]["alertMessage"]);
      setIsLoading(false);
    },
    onSuccess: () => {
      setErrorMessage(null);
      setSuccessMessage(translate["pageDescription"]);
      setIsLoading(false);
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
        // SERVER SIDE
        const response = await UpdateUserPassword(
          value as { password: string }
        );
        if (response === false) {
          setSuccessMessage(null);
          setErrorMessage(translate["form"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(translate["pageDescription"]);
          handleSignOut();
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translate["form"]["alertMessage"]);
      }
    },
  });

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

  const onCancelHandler = () => {
    router.replace(pathname);
  };

  const breadcrumbItems = [
    { href: "/dashboard/perfil", label: "Perfil", icon: User },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner message={errorMessage} type="error" />
        </div>
      )}
      {successMessage && (
        <div className="container mb-10">
          <AlertBanner message={successMessage} type="success" />
        </div>
      )}
      {!isShowPasswordComponent && (
        <DefaultCard
          className="p-6"
          title={translate["profileCard"]["cardTitle"]}
        >
          <ProfileTable
            isLoading={isLoading}
            mutation={mutation}
            setIsLoading={setIsLoading}
            translate={translate}
            userProfileData={userProfileData}
            isUserProfileDataLoading={isUserProfileDataLoading}
          />
        </DefaultCard>
      )}
      {isShowPasswordComponent && (
        <DefaultCard
          description={translate["form"]["cardDescription"]}
          title={translate["form"]["cardTitle"]}
        >
          <Form
            cancelButtonLabel={translate["form"]["cancelLabel"]}
            fieldsToRender={[
              {
                label: translate["form"]["fields"]["password"]["label"],
                name: translate["form"]["fields"]["password"]["name"],
                type: "password",
              },
            ]}
            form={form}
            onCancel={onCancelHandler}
            showPasswordRules
            submitLabel={translate["form"]["submitLabel"]}
            submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
          />
        </DefaultCard>
      )}
    </PageLayout>
  );
}
