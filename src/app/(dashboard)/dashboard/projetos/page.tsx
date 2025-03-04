"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PanelsTopLeft, Plus } from "lucide-react";
// import CreateProjects from "@/actions/createProjects/actions";
// import GetUserProjects from "@/actions/getUserProjects/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { createClient } from "@/supabase/client";
// import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Skeleton } from "@/components/ui/skeleton";

type FormType = {
  project: string;
};

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const translate = useTranslations("Pages.Dashboard.Projects");

  const projectName = searchParams.get('project')

  // const [isLoading, setIsLoading] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(false);

  const { data: userProfileData, isLoading: isProfileDataLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const {
    data: userProjects,
    isLoading: isUserProjectsLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data, error }: any = await supabase
        .from("projects")
        .select("title")
        .eq("user_id", userProfileData?.user_id);

      if (error) {
        setServerError(true);
      }

      return data;

      // SERVER SIDE
      // GetUserProjects({ userId: userProfileData?.user_id });
    },
    enabled: !!userProfileData?.user_id,
  }) as any;

  // const mutation = useMutation({
  //   mutationFn: ({ title }: { title: string }) => CreateProjects({ title }),
  //   onError: () => {
  //     setServerError(true);
  //     setIsLoading(false);
  //   },
  //   onSuccess: () => {
  //     form.reset();
  //     setIsOpenForm(false);
  //     setIsLoading(false);
  //     setSuccessMessage(true);
  //     refetch();
  //   },
  // });

  const form = useForm({
    defaultValues: {
      project: "",
    },
    validators: {
      onChange({ value }) {
        if (
          userProjects?.some(
            (item: { title: string }) => item.title === value.project
          )
        ) {
          return {
            fields: {
              project: translate["form"]["fields"]["project"]["fieldError"],
            },
          };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }: { value: FormType }) => {
      setServerError(false);
      setSuccessMessage(false);
      // mutation.mutate({ title: value?.project });
      try {
        const supabase = await createClient();
        const { error } = await supabase
          .from("projects")
          .insert({ title: value.project, user_id: userProfileData?.user_id });
        if (error) {
          setServerError(true);
        } else {
          form.reset();
          setIsOpenForm(false);
          setServerError(false);
          setSuccessMessage(true);
          refetch();
        }
      } catch {
        setServerError(true);
      }
    },
  });

  const onClickHandler = ({ project }: { project: string }) => {
    router.push(`/dashboard/relatorios?project=${project}`);
  };

  const maxProjectsNumbers = BusinessRules[userProfileData?.plan]?.projects;
  const hasProject = Boolean(userProjects?.length > 0);
  const canAddMoreProjects = Boolean(
    userProjects?.length > 0 || userProjects?.length < maxProjectsNumbers
  );

  const getCardTitle = hasProject
    ? translate["form"]["cardTitleTwo"]
    : translate["form"]["cardTitle"];

  const getCardDescription = hasProject
    ? translate["form"]["cardDescriptionTwo"]
    : translate["form"]["cardDescription"];

  const breadcrumbItems = [
    { href: "/dashboard/projetos", label: "Projetos", icon: PanelsTopLeft },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={
        userProfileData?.first_name &&
        `${translate["pageTitle"]} ${userProfileData?.first_name}`
      }
      isLoading={isProfileDataLoading}
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
      {isUserProjectsLoading || isProfileDataLoading ? (
        <DefaultCard>
          <div className="text-2xl mb-6">
            <Skeleton className="h-5 w-56" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-5 w-56" />
          </div>
          <div className="flex flex-col items-center mt-10">
            <Skeleton className="h-28 w-[90%]" />
          </div>
        </DefaultCard>
      ) : (
        <DefaultCard description={getCardDescription} title={getCardTitle}>
          {hasProject &&
            userProjects?.map(
              (project: { title: string }, index: { index: number }) => (
                <DefaultCard
                  className={`${projectName === project?.title ? 'border-2 border-primary'  : ''} mt-5`}
                  isHoverable
                  key={`${index}-${project.title}`}
                  onClick={() => onClickHandler({ project: project.title })}
                >
                  {translate["projectCardTitle"]}{" "}
                  <span className="font-bold">{project.title}</span>
                </DefaultCard>
              )
            )}
          {!isUserProjectsLoading &&
            !isProfileDataLoading &&
            (isOpenForm || !hasProject) && (
              <div className="mt-10">
                <div className="h-[1px] border-b mb-5"></div>
                <Form
                  cancelButtonLabel={translate["form"]["cancelLabel"]}
                  fieldsToRender={[
                    {
                      countChar: true,
                      countCharMaxChar: 50,
                      label: translate["form"]["fields"]["project"]["label"],
                      maxLength: 50,
                      name: translate["form"]["fields"]["project"]["name"],
                      placeholder:
                        translate["form"]["fields"]["project"]["placeholder"],
                      type: "text",
                    },
                  ]}
                  form={form}
                  onCancel={() => {
                    form.reset();
                    setIsOpenForm(false);
                  }}
                  submitLabel={translate["form"]["submitLabel"]}
                  submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
                />
              </div>
            )}
          <div className="flex flex-row w-full justify-end mt-8">
            {canAddMoreProjects && hasProject && (
              <Button
                onClick={() => {
                  setIsOpenForm(true);
                  setSuccessMessage(false);
                }}
                variant="outline"
              >
                <div className="flex flex-row items-center">
                  <span>{translate["addProjectCtaLabel"]}</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
          </div>
        </DefaultCard>
      )}
    </PageLayout>
  );
}
