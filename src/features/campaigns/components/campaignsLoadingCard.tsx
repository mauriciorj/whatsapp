"use client";

import ContentCard from "@/components/layout/contentCard";
import Skeleton from "@/components/ui/skeleton";

const CampaignsLoadingCard = () => {
  return (
    <ContentCard>
      <div className="text-2xl mb-6">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="flex flex-col items-center mt-10">
        <Skeleton className="h-28 w-[90%]" />
      </div>
    </ContentCard>
  );
};

export default CampaignsLoadingCard;
