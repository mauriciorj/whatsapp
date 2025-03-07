"use client";

import { Check, ClipboardCopy, Fingerprint, RefreshCcw } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const WhatsAppLinkHoverCards = ({
  copyToClipboard,
  generateRandomLink,
  isCopied,
  isGenerateRandomLinkLoading,
  setIsModalOpen,
  translate,
}: {
  copyToClipboard: () => void;
  generateRandomLink: () => void;
  isCopied: boolean;
  isGenerateRandomLinkLoading: boolean;
  setIsModalOpen: (value: boolean) => void;
  translate: any;
}) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            onClick={() => setIsModalOpen(true)}
            className="absolute right-[60px] top-[10px] cursor-pointer text-center justify-center"
          >
            <Fingerprint className="h-5 w-5" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {translate["hoverCards"]["createLinkTitle"]}
            </h4>
            <p className="text-sm text-muted-foreground">
              {translate["hoverCards"]["createLinkDescription"]}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            onClick={() => generateRandomLink()}
            className="absolute right-[35px] top-[10px] cursor-pointer text-center justify-center"
          >
            <RefreshCcw
              className={`${
                isGenerateRandomLinkLoading ? "animate-spin" : null
              } h-5 w-5`}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {translate["hoverCards"]["generateRandomLinkTitle"]}
            </h4>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer text-center justify-center"
            onClick={() => copyToClipboard()}
          >
            {isCopied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <ClipboardCopy className="h-5 w-5" />
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {translate["hoverCards"]["copyLinkTitle"]}
            </h4>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default WhatsAppLinkHoverCards;
