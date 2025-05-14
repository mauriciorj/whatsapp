"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import UserNav from "./user-nav";
import GetUserProfile from "@/actions/getUserProfile/actions";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import useTranslations from "@/hooks/useTranslations";

const Header = () => {
  const translations = useTranslations("Main");
  const pathname = usePathname();

  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  const { data: userProfileData, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  useEffect(() => {
    refetch();
  }, [isInsideDashboard, refetch]);

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b">
      <div
        className={`${
          userProfileData?.email && !isInsideDashboard
            ? "pl-5 pr-5 md:pl-20 md:pr-20"
            : ""
        } ${
          userProfileData?.email && isInsideDashboard
            ? "pl-5 pr-2 md:pl-20 md:pr-20"
            : ""
        } ${
          !userProfileData?.email ? "pl-5 pr-5 md:pl-20 md:pr-20" : ""
        } h-16 flex items-center justify-between`}
      >
        <Link className="pl-0 text-xl md:text-3xl font-bold" href="/">
          Zap<span className="text-destructive">Router</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {userProfileData?.email && !isInsideDashboard && (
            <>
              <Button asChild>
                <Link href="/dashboard">{translations["dashboard"]}</Link>
              </Button>
            </>
          )}
          {userProfileData?.email && isInsideDashboard && (
            <div className="ml-28 md:ml-2">
              <UserNav />
            </div>
          )}
          {!userProfileData?.email && !isInsideDashboard && (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link prefetch href="/login">
                  {translations["login"]}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/#planos">{translations["signUp"]}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
