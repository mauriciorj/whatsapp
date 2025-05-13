"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/layout/contentCard";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";

export default function Successo() {
  const translations = useTranslations("Pages.PaymentSuccess");
  const breadcrumbItems = [
    {
      href: PAGES.auth.success,
      label: translations["breadcrumbTitle"],
      icon: Check,
    },
  ];
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <ContentCard
        title={translations["cardTitle"]}
        description={translations["cardDescription"]}
      >
        <div className="flex flex-row w-full items-center justify-center">
          <Button asChild>
            <Link href={PAGES.auth.login}>{translations["buttonLabel"]}</Link>
          </Button>
        </div>
      </ContentCard>
    </PageLayout>
  );
}
