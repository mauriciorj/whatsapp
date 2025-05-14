"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChartSpline,
  HelpCircle,
  MessageCircle,
  MessageCircleMore,
  PanelsTopLeft,
  Rotate3d,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GetCampaigns from "@/features/campaigns/lib/getCampaigns";
import useTranslations from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const translations = useTranslations("Main.SideBar");

  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  const params = new URLSearchParams(searchParams.toString());

  const { data: userCampaigns } = GetCampaigns();

  if (!isInsideDashboard) return null;

  return (
    <div className="flex flex-row min-h-screen">
      <Button
        className="fixed top-3 px-7 right-10 md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {translations["openCloseCtaLabel"]}
      </Button>

      <div
        className={cn(
          "fixed md:relative md:min-h-screen left-0 top-16 md:top-0 h-full w-64 border-r p-6 transition-transform duration-200 ease-in-out md:translations-x-0 z-10 bg-background",
          isOpen
            ? "translations-x-0"
            : "-translations-x-full md:translations-x-0"
        )}
      >
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{translations["title"]}</h2>
          </div>
          <nav className="space-y-2">
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/dashboard/campaigns" &&
                  "bg-secondary text-foreground"
              )}
              href={`/dashboard/campaigns?${params.toString()}`}
              onClick={() => setIsOpen(false)}
            >
              <PanelsTopLeft className="min-h-5 max-h-5 min-w-5 max-w-5" />
              {translations["campaigns"]}
            </Link>
            {Boolean(userCampaigns?.length) && (
              <>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-6 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/reports" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/reports?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                >
                  <ChartSpline className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["reports"]}
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-6 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/whatsapp" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/whatsapp?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                  prefetch
                >
                  <MessageCircle className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["whatsapp"]}
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/whatsapp/phoneNumbers" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/whatsapp/phoneNumbers?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                  prefetch
                >
                  <Rotate3d className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["phoneNumbers"]}
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/whatsapp/messages" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/whatsapp/messages?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                  prefetch
                >
                  <MessageCircleMore className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["messages"]}
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/whatsapp/groups" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/whatsapp/groups?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                  prefetch
                >
                  <Users className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["groups"]}
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-3 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/settings" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/settings?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                  prefetch
                >
                  <Settings className="min-h-5 max-h-5 min-w-5 max-w-5" />
                  {translations["settings"]}
                </Link>
              </>
            )}
            <div className="h-[1px] border-b"></div>
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/ajuda" && "bg-secondary text-foreground"
              )}
              href="/ajuda"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="min-h-5 max-h-5 min-w-5 max-w-5" />
              {translations["help"]}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
