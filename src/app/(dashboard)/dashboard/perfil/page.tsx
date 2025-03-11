"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import ResetPasswordForEmail from "@/actions/resetPasswordForEmail/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import ProfileTable from "@/components/dashboard/profileTable";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export default function Perfil() {
  const translate = useTranslations("Pages.Dashboard.Perfil");

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isShowResetPasswordComponent = searchParams.get("showResetPassword");

  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);

  // This is control by url once the user has to
  // access the email and then click on the link to return to this page
  const [isShowPasswordComponent, setIsShowPasswordComponent] =
    useState<boolean>(false);

  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(false);

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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  // const { data: userProfileData, isLoading: userProfileIsLoading } =
  //   useQuery<any>({
  //     queryKey: ["userProfile"],
  //     queryFn: async () => {
  //       await supabase
  //         .from("user_profile")
  //         .select(
  //           `
  //     email,
  //     subscription_status,
  //     first_name,
  //     last_name,
  //     plan,
  //     user_id,
  //     whatsapp (
  //       numbers,
  //       link
  //     )
  //   `
  //         )
  //         .eq("user_id", userData?.user?.id);
  //     },
  //     enabled: !!userData?.user?.id,
  //   });

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
        // CLIENT SIDE
        // const supabase = await createClient();
        // const { error } = await supabase.auth.updateUser({
        //   password: value?.password,
        // });
        // if (error) {
        //   setServerError(true);
        // } else {
        //   setSuccessMessage(true);
        //   handleSignOut();
        // }

        // SERVER SIDE
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

  const breadcrumbItems = [
    { href: "/dashboard/perfil", label: "Perfil", icon: User },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner
            message={translate["form"]["alertMessage"]}
            type="error"
          />
        </div>
      )}
      {successMessage && (
        <div className="container mb-10">
          <AlertBanner
            message={translate["form"]["successMessage"]}
            type="success"
          />
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
            userProfileIsLoading={userProfileIsLoading}
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
