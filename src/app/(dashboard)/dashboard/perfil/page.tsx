"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import UserProfileTable from "@/features/user/components/userProfileTable";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";
import UpdateUserProfile from "@/features/user/lib/updateUserProfile";

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

  const isShowResetPasswordComponent = searchParams.get("showResetPassword");

  const { userProfile, userProfileIsLoading } = GetUserProfile();

  const { errorMessage, form, formTranslation, mutation,successMessage } = UpdateUserProfile();

  useEffect(() => {
    if (isShowResetPasswordComponent === "true") {
      setIsShowPasswordComponent(true);
    } else {
      setIsShowPasswordComponent(false);
    }
  }, [isShowResetPasswordComponent]);

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
          title={translations["cardTitle"]}
        >
          <UserProfileTable
            isLoading={isLoading}
            mutation={mutation}
            setIsLoading={setIsLoading}
            translations={formTranslation["ProfileCard"]}
            userProfileData={userProfile}
            isUserProfileDataLoading={userProfileIsLoading}
          />
        </ContentCard>
      )}
      {isShowPasswordComponent && (
        <ContentCard
          description={formTranslation["ResetPasswordForm"]["cardDescription"]}
          title={formTranslation["ResetPasswordForm"]["cardTitle"]}
        >
          <Form
            cancelButtonLabel={
              formTranslation["ResetPasswordForm"]["cancelLabel"]
            }
            fieldsToRender={[
              {
                label:
                  formTranslation["ResetPasswordForm"]["fields"]["password"][
                    "label"
                  ],
                name: formTranslation["ResetPasswordForm"]["fields"][
                  "password"
                ]["name"],
                type: "password",
              },
            ]}
            form={form}
            onCancel={onCancelHandler}
            showPasswordRules
            submitLabel={formTranslation["ResetPasswordForm"]["submitLabel"]}
            submitLoadingLabel={
              formTranslation["ResetPasswordForm"]["submitLoadingLabel"]
            }
          />
        </ContentCard>
      )}
    </PageLayout>
  );
}
