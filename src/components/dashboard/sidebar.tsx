"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChartSpline,
  HelpCircle,
  MessageCircle,
  Menu,
  PanelsTopLeft,
} from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
// import GetUserProjects from "@/actions/getUserProjects/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  const params = new URLSearchParams(searchParams.toString())

  const { data: userProfileData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const { data: userProjects } = useQuery({
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
  });

  if (!isInsideDashboard) return null;

  return (
    <div className="flex flex-row min-h-screen">
      <Button
        className="md:hidden fixed top-3 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="ghost"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          "fixed md:relative md:min-h-screen left-0 top-16 md:top-0 h-full w-64 border-r p-6 transition-transform duration-200 ease-in-out md:translate-x-0 z-10 bg-background",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
          </div>
          <nav className="space-y-2">
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/dashboard/projetos" &&
                  "bg-secondary text-foreground"
              )}
              href={`/dashboard/projetos?${params.toString()}`}
              onClick={() => setIsOpen(false)}
            >
              <PanelsTopLeft className="h-5 w-5" />
              Projetos
            </Link>
            {Boolean(userProjects?.length) && (
              <>
                <Link
                  className={cn(
                    "flex items-center gap-3 pl-6 pr-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === "/dashboard/relatorios" &&
                      "bg-secondary text-foreground"
                  )}
                  href={`/dashboard/relatorios?${params.toString()}`}
                  onClick={() => setIsOpen(false)}
                >
                  <ChartSpline className="h-5 w-5" />
                  Relatórios
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
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
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
              <HelpCircle className="h-5 w-5" />
              Ajuda
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
