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

  const campaignName = searchParams.get("campaign");

  const { data: userProfileData, isLoading: isProfileDataLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const { data: userCampaigns, isLoading: isUserCampaignsLoading } = useQuery({
    queryKey: ["userCampaigns"],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data }: any = await supabase
        .from("campaigns")
        .select("id, title, user_id")
        .eq("user_id", userProfileData?.user_id);

      return (
        data?.sort((a: any, b: any) => a.title.localeCompare(b.title)) || []
      );
    },
    enabled: !!userProfileData?.user_id,
  }) as any;

  return (
    <>
      <div className="container mb-10">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="container mb-10 md:pl-10">
        {isLoading || isProfileDataLoading || isUserCampaignsLoading ? (
          <Skeleton className="h-10 w-72 mb-4" />
        ) : (
          <div className="flex flex-col-reverse md:flex-row justify-between">
            <PageTitle title={pageTitle} description={pageDescription} />
            {userCampaigns && (
              <div className="w-full mb-5 md:mt-0 md:w-fit flex flex-col mb-5 items-center justify-end">
                <div className="w-full text-left md:text-right pb-1 pr-1">Campanha Selecionada</div>
                <Select
                  onValueChange={(e) => router.push(`${pathname}?campaign=${e}`)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={campaignName || "Selecione uma Campanha"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {userCampaigns.map(
                      (campaign: { title: string }, index: number) => (
                        <SelectItem
                          key={`${index}-${campaign.title}`}
                          value={campaign.title}
                        >
                          {campaign.title}
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
