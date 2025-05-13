"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import ResetPasswordForEmail from "@/actions/resetPasswordForEmail/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import ProfileTable from "@/features/user/components/userProfileTable";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import getUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";
import { RESET_PASSWORD_REDIRECT_TO_URL } from "@/lib/constants";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

export default function Perfil() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const translations = useTranslations("Pages.Dashboard.Perfil");

  const [isLoading, setIsLoading] = useState(false);
  // This is control by url once the user has to
  // access the email and then click on the link to return to this page
  const [isShowPasswordComponent, setIsShowPasswordComponent] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isShowResetPasswordComponent = searchParams.get("showResetPassword");

  const { userProfile, userProfileIsLoading } = getUserProfile();

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
        email: userProfile?.email,
        redirectToUrl: RESET_PASSWORD_REDIRECT_TO_URL,
      } as any),
    onError: () => {
      setSuccessMessage(null);
      setErrorMessage(translations["form"]["alertMessage"]);
      setIsLoading(false);
    },
    onSuccess: () => {
      setErrorMessage(null);
      setSuccessMessage(translations["pageDescription"]);
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
          setErrorMessage(translations["form"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(translations["pageDescription"]);
          userhHandleSignOut();
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translations["form"]["alertMessage"]);
      }
    },
  });

  const userhHandleSignOut = async () => {
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
      pageTitle={translations["pageTitle"]}
      pageDescription={translations["pageDescription"]}
    >
      <div className="container mb-10">
        <AlertBanner message={errorMessage} type="error" />
      </div>
      <div className="container mb-10">
        <AlertBanner message={successMessage} type="success" />
      </div>
      {!isShowPasswordComponent && (
        <ContentCard
          className="p-6"
          title={translations["profileCard"]["cardTitle"]}
        >
          <ProfileTable
            isLoading={isLoading}
            mutation={mutation}
            setIsLoading={setIsLoading}
            translations={translations}
            userProfileData={userProfile}
            isUserProfileDataLoading={userProfileIsLoading}
          />
        </ContentCard>
      )}
      {isShowPasswordComponent && (
        <ContentCard
          description={translations["form"]["cardDescription"]}
          title={translations["form"]["cardTitle"]}
        >
          <Form
            cancelButtonLabel={translations["form"]["cancelLabel"]}
            fieldsToRender={[
              {
                label: translations["form"]["fields"]["password"]["label"],
                name: translations["form"]["fields"]["password"]["name"],
                type: "password",
              },
            ]}
            form={form}
            onCancel={onCancelHandler}
            showPasswordRules
            submitLabel={translations["form"]["submitLabel"]}
            submitLoadingLabel={translations["form"]["submitLoadingLabel"]}
          />
        </ContentCard>
      )}
    </PageLayout>
  );
}
