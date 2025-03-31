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
  translate,
  userCampaigns,
}: {
  onClickHandler: (arg0: { campaign: string }) => void;
  campaignCardTitle: string;
  campaignName?: string | null;
  setIsModalOpen: (arg0: boolean) => void;
  setCampaignToBeDeleted: Dispatch<SetStateAction<CampaignsType | null>>;
  translate: any;
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
        <div className="flex flex-row items-center">
          <div className="mr-5">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            {campaignCardTitle}
            <span className="font-bold">{campaign.title}</span>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end mt-4 space-x-2">
          <div>
            <div className="flex flex-col items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={true}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <span className="mt-1 text-xs">{translate["active"]}</span>
            </div>
          </div>
          <div className="mt-7">
            <Button
              size="sm"
              variant="outline"
              onClick={() => console.log("edit campaign")}
            >
              {translate["editCampaign"]}
            </Button>
            <Button
              size="sm"
              variant="ghost"
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
            >
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </DefaultCard>
  ));
}
