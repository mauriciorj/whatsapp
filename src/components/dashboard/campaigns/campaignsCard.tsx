"use client";

import { Dispatch, SetStateAction } from "react";
import { Trash2 } from "lucide-react";
import ContentCard from "@/components/layout/contentCard";
import { Button } from "@/components/ui/button";
import { Tables } from "@/db/types/database.types";

export default function CampaignsCard({
  onClickHandler,
  campaignCardTitle,
  campaignName,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setCampaignToDialog,
  translate,
  userCampaigns,
}: {
  onClickHandler: (arg0: { campaign: string }) => void;
  campaignCardTitle: string;
  campaignName?: string | null;
  setIsDeleteModalOpen: (arg0: boolean) => void;
  setIsEditModalOpen: (arg0: boolean) => void;
  setCampaignToDialog: Dispatch<SetStateAction<Tables<"campaigns"> | null>>;
  translate: any;
  userCampaigns: Tables<"campaigns">[];
}) {
  return (
    <div className="flex flex-col md:inline-grid md:grid-cols-2 md:gap-4 xl:inline-grid xl:grid-cols-3 xl:gap-4">
      {userCampaigns?.map((campaign: Tables<"campaigns">, index: number) => (
        <ContentCard
          className={`${
            campaignName === campaign?.title ? "border-2 border-primary" : ""
          } mt-5`}
          isHoverable
          key={`${index}-${campaign.title}`}
          onClick={() =>
            campaign.title ? onClickHandler({ campaign: campaign.title }) : null
          }
        >
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="mr-5">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                </span>
              </div>
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
            </div>
            <div className="w-full mt-7">
              <div className="flex flex-row">
                <span className="mr-1 font-bold">{campaignCardTitle}</span>
                <span>{campaign.title}</span>
              </div>
            </div>
            <div className="w-full h-[1px] border-b mt-5"></div>
            <div className="w-full mt-7">
              <div className="w-full flex flex-row">
                <span className="mr-1 font-bold">Data de início:</span>
                <span>02-05-2025</span>
              </div>
              <div className="w-full flex flex-row">
                <span className="mr-1 font-bold">Data de fim:</span>
                <span>02-05-2025</span>
              </div>
            </div>
            <div className="w-full h-[1px] border-b mt-5"></div>
            <div className="w-full flex flex-row items-center justify-between mt-7 space-x-2">
              <div className="w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditModalOpen(true);
                    setCampaignToDialog((prevState) => {
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
                  {translate["editCampaign"]}
                </Button>
              </div>
              <div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                    setCampaignToDialog((prevState) => {
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
        </ContentCard>
      ))}
    </div>
  );
}
