"use client";

import { Dispatch, SetStateAction } from "react";
import { Trash2 } from "lucide-react";
import DefaultCard from "@/components/layout/defaultCard";
import { Button } from "@/components/ui/button";
import { CampaignsType } from "@/db/types/types";

export default function CampaignsCard({
  onClickHandler,
  campaignCardTitle,
  campaignName,
  setIsModalOpen,
  setCampaignToBeDeleted,
  userCampaigns,
}: {
  onClickHandler: (arg0: { campaign: string }) => void;
  campaignCardTitle: string;
  campaignName?: string | null;
  setIsModalOpen: (arg0: boolean) => void;
  setCampaignToBeDeleted: Dispatch<SetStateAction<CampaignsType | null>>;
  userCampaigns: CampaignsType[];
}) {
  return userCampaigns?.map((campaign: CampaignsType, index: number) => (
    <DefaultCard
      className={`${
        campaignName === campaign?.title ? "border-2 border-primary" : ""
      } mt-5`}
      isHoverable
      key={`${index}-${campaign.title}`}
      onClick={() =>
        campaign.title ? onClickHandler({ campaign: campaign.title }) : null
      }
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          {campaignCardTitle}
          <span className="font-bold">{campaign.title}</span>
        </div>
        <div>
          <Button
            className="w-[50px] h-[50px] z-10 hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
              setCampaignToBeDeleted((prevState) => {
                if (prevState === null) {
                  return campaign;
                } else {
                  return {
                    ...prevState,
                    ...campaign,
                  };
                }
              });
            }}
            size="icon"
            variant="ghost"
          >
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </div>
    </DefaultCard>
  ));
}
