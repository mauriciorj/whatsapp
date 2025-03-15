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
    <div className="w-full justify-end flex flex-row mt-3">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer text-center justify-center"
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
        <HoverCardTrigger asChild className="ml-2">
          <div
            onClick={() => generateRandomLink()}
            className="cursor-pointer text-center justify-center"
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
        <HoverCardTrigger asChild className="ml-2">
          <div
            className="cursor-pointer text-center justify-center"
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
    </div>
  );
};

export default WhatsAppLinkHoverCards;
