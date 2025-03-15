"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageTitle from "@/components/layout/pageTitle";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface PageLayoutProps {
  breadcrumbItems?: BreadcrumbItem[];
  children: React.ReactNode;
  isLoading?: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

const PageLayout = ({
  breadcrumbItems,
  children,
  isLoading,
  pageTitle,
  pageDescription,
}: PageLayoutProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectName = searchParams.get("project");

  const { data: userProfileData, isLoading: isProfileDataLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const { data: userProjects, isLoading: isUserProjectsLoading } = useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data }: any = await supabase
        .from("projects")
        .select("id, title, user_id")
        .eq("user_id", userProfileData?.user_id);

      return (
        data?.sort((a: any, b: any) => a.title.localeCompare(b.title)) || []
      );

      // SERVER SIDE
      // GetUserProjects({ userId: userProfileData?.user_id });
    },
    enabled: !!userProfileData?.user_id,
  }) as any;

  return (
    <>
      <div className="container mb-10">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="container mb-10 md:pl-10">
        {isLoading || isProfileDataLoading || isUserProjectsLoading ? (
          <Skeleton className="h-10 w-72 mb-4" />
        ) : (
          <div className="flex flex-col-reverse md:flex-row justify-between">
            <PageTitle title={pageTitle} description={pageDescription} />
            {userProjects && (
              <div className="w-full mb-5 md:mt-0 md:w-fit flex flex-row mb-5 items-center justify-end">
                <Select
                  onValueChange={(e) => router.push(`${pathname}?project=${e}`)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={projectName || "Selecione um Projeto"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {userProjects.map(
                      (project: { title: string }, index: number) => (
                        <SelectItem
                          key={`${index}-${project.title}`}
                          value={project.title}
                        >
                          {project.title}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default PageLayout;
