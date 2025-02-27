"use client";

import { useState } from "react";
import { LoaderCircle, PanelsTopLeft } from "lucide-react";
import CreateProjects from "@/actions/createProjects/actions";
import GetUserProjects from "@/actions/getUserProjects/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { projectTitleSchema } from "@/lib/validations/schemas";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

type FormType = {
  projectTitle: string;
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean | null>(null);

  const { data: userProfileData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const { data: userProjects, refetch } = useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => {
      GetUserProjects({ userId: userProfileData?.user_id });
    },
    enabled: !!userProfileData?.user_id,
  });

  const mutation = useMutation({
    mutationFn: ({ title }: { title: string }) => CreateProjects({ title }),
    onError: () => {
      setServerError(true);
      setIsLoading(false);
    },
    onSuccess: () => {
      refetch();
      setIsLoading(false);
    },
  });

  const form = useForm({
    defaultValues: {
      projectTitle: "",
    },
    validators: {
      onSubmit: projectTitleSchema.required(),
    },
    onSubmit: async ({ value }: { value: FormType }) => {
      setIsLoading(true);
      mutation.mutate({ title: value?.projectTitle });
    },
  });

  const breadcrumbItems = [
    { href: "/dashboard/projetos", label: "Projetos", icon: PanelsTopLeft },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={
        userProfileData?.first_name &&
        `Bem vindo, ${userProfileData?.first_name}`
      }
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner
            message="Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
            type="error"
          />
        </div>
      )}
      {userProjects ? "projetos" : null}
      <DefaultCard
        description="Escolha um nome para o seu projeto."
        title="Para começar, crie um projeto!"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
            setServerError(false);
          }}
        >
          <div className="space-y-2 relative">
            <Label htmlFor="projectTitle">Nome</Label>
            <form.Field name="projectTitle">
              {(field) => (
                <>
                  <Input
                    id="projectTitle"
                    onBlur={() => setIsOnFocus(false)}
                    onChange={(e: any) => field.handleChange(e.target.value)}
                    onFocusCapture={() => setIsOnFocus(true)}
                    maxLength={50}
                    placeholder="Ex: Projeto Suporte Online"
                    type="text"
                    required
                    value={field.state.value}
                  />
                  <div className="w-full h-6 text-right pr-10 mt-2 text-sm">
                    {isOnFocus && <>{field.state.value?.length} / 50</>}
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <div className="flex flex-row items-center italic">
                Criando projeto...
                <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
              </div>
            ) : (
              "Criar projeto"
            )}
          </Button>
        </form>
      </DefaultCard>
    </PageLayout>
  );
}
