"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PanelsTopLeft, Plus } from "lucide-react";
import DeleteProject from "@/actions/deleteProject/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import ProjectsCard from "@/components/dashboard/projects/projectsCard";
import ProjectsDialog from "@/components/dashboard/projects/projectsDialog";
import ProjectsLoadingCard from "@/components/dashboard/projects/projectsLoadingCard";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { ProjectsType } from "@/db/types/types";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserProjects } from "@/hooks/useUserProjects";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { DELETE_MAGIC_WORD, PAGES } from "@/lib/constants";
import generateRandomCode from "@/lib/generateCode";
import { deleteDialogSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const translate = useTranslations("Pages.Dashboard.Projects");

  const projectName = searchParams?.get("project") || null;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [projectToBeDeleted, setProjectToBeDeleted] =
    useState<ProjectsType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user: userProfileData, isLoading: isUserProfileDataLoading } =
    useUserProfile();

  const {
    projects: userProjects,
    isLoading: isUserProjectsLoading,
    refetch,
  } = useUserProjects();

  const deleteForm = useForm({
    defaultValues: {
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }: { value: { deleteWord: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      if (value?.deleteWord === DELETE_MAGIC_WORD) {
        try {
          const result = await DeleteProject(projectToBeDeleted);
          if (result?.status >= 400) {
            setIsModalOpen(false);
            setProjectToBeDeleted(null);
            setSuccessMessage(null);
            setErrorMessage(translate["createProjectForm"]["alertMessage"]);
            refetch();
          } else {
            if (projectName) {
              router.replace(PAGES.dashboard.projetos);
              router.refresh();
            }
            setIsModalOpen(false);
            setErrorMessage(null);
            setProjectToBeDeleted(null);
            setSuccessMessage(translate["deleteProjectForm"]["successMessage"]);
            form.reset();
            refetch();
          }
        } catch {
          setSuccessMessage(null);
          setErrorMessage(translate["createProjectForm"]["alertMessage"]);
        }
      } else {
        setSuccessMessage(null);
        setErrorMessage(translate["createProjectForm"]["alertMessage"]);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      project: "",
    },
    validators: {
      onChange({ value }) {
        if (
          userProjects?.some(
            (item: ProjectsType) => item.title === value.project
          )
        ) {
          return {
            fields: {
              project:
                translate["createProjectForm"]["fields"]["project"][
                  "fieldError"
                ],
            },
          };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }: { value: { project: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const supabase = await createClient();

        const checkIfCodeExists = async (randomCodeToLink: string) => {
          const { data } = await supabase
            .from("projects")
            .select()
            .eq("wp_link", randomCodeToLink);
          return data;
        };

        const getUniqueCode = async () => {
          let code: boolean | string = false;
          while (code === false) {
            const getCode = await generateRandomCode();
            const check = await checkIfCodeExists(getCode);
            if (!check?.length) code = getCode;
          }
          return code;
        };

        const randomUniqueCode = await getUniqueCode();
        const { error } = await supabase.from("projects").insert({
          wp_link: randomUniqueCode,
          title: value.project,
          user_id: userProfileData?.user_id,
        });
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(translate["createProjectForm"]["alertMessage"]);
        } else {
          form.reset();
          setIsOpenForm(false);
          setErrorMessage(null);
          // setSuccessMessage(translate["createProjectForm"]["successMessage"]);
          refetch();
          router.push(`/dashboard/whatsapp?project=${value.project}`);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translate["createProjectForm"]["alertMessage"]);
      }
    },
  });

  const onClickHandler = ({ project }: { project: string }) => {
    router.push(`/dashboard/relatorios?project=${project}`);
  };

  const hasProject = Boolean(userProjects?.length > 0);
  const maxProjectsNumbers = userProfileData?.plan
    ? BusinessRules[userProfileData?.plan]?.projects
    : 0;
  const canAddMoreProjects = Boolean(
    userProjects?.length > 0 || userProjects?.length < maxProjectsNumbers
  );

  const getCardTitle = hasProject
    ? translate["createProjectForm"]["cardTitleTwo"]
    : translate["createProjectForm"]["cardTitle"];

  const getCardDescription = hasProject
    ? translate["createProjectForm"]["cardDescriptionTwo"]
    : translate["createProjectForm"]["cardDescription"];

  const breadcrumbItems = [
    { href: "/dashboard/projetos", label: "Projetos", icon: PanelsTopLeft },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      isLoading={isUserProfileDataLoading}
      pageTitle={
        userProfileData?.first_name &&
        `${translate["pageTitle"]} ${userProfileData?.first_name}`
      }
    >
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner
            message={translate["createProjectForm"]["alertMessage"]}
            type="error"
          />
        </div>
      )}
      {successMessage && (
        <div className="container mb-10">
          <AlertBanner message={successMessage} type="success" />
        </div>
      )}
      {isUserProjectsLoading || isUserProfileDataLoading ? (
        <ProjectsLoadingCard />
      ) : (
        <DefaultCard description={getCardDescription} title={getCardTitle}>
          {hasProject && (
            <ProjectsCard
              onClickHandler={onClickHandler}
              projectCardTitle={translate["projectCardTitle"]}
              projectName={projectName}
              setIsModalOpen={setIsModalOpen}
              setProjectToBeDeleted={setProjectToBeDeleted}
              userProjects={userProjects}
            />
          )}
          {!isUserProjectsLoading &&
            !isUserProfileDataLoading &&
            (isOpenForm || !hasProject) && (
              <div className="mt-10">
                <div className="h-[1px] border-b mb-5"></div>
                <Form
                  cancelButtonLabel={
                    translate["createProjectForm"]["cancelLabel"]
                  }
                  fieldsToRender={[
                    {
                      countChar: true,
                      countCharMaxChar: 50,
                      label:
                        translate["createProjectForm"]["fields"]["project"][
                          "label"
                        ],
                      maxLength: 50,
                      name: translate["createProjectForm"]["fields"]["project"][
                        "name"
                      ],
                      placeholder:
                        translate["createProjectForm"]["fields"]["project"][
                          "placeholder"
                        ],
                      type: "text",
                    },
                  ]}
                  form={form}
                  onCancel={() => {
                    form.reset();
                    setIsOpenForm(false);
                  }}
                  submitLabel={translate["createProjectForm"]["submitLabel"]}
                  submitLoadingLabel={
                    translate["createProjectForm"]["submitLoadingLabel"]
                  }
                />
              </div>
            )}
          <div className="flex flex-row w-full justify-end mt-8">
            {canAddMoreProjects && hasProject && (
              <Button
                onClick={() => {
                  setIsOpenForm(true);
                  setSuccessMessage(null);
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
      <ProjectsDialog
        form={deleteForm}
        isModalOpen={isModalOpen}
        projectToBeDeleted={projectToBeDeleted}
        setIsModalOpen={setIsModalOpen}
        translate={translate["deleteProjectForm"]["dialog"]}
      />
    </PageLayout>
  );
}
