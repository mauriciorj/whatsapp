"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";
import { Button } from "@/components/ui/button";
import DefaultCard from "@/components/layout/defaultCard";
import useTranslations from "@/hooks/useTranslations";

export default function Successo() {
  const translate = useTranslations("Pages.PaymentSuccess");
  const breadcrumbItems = [
    {
      href: "/sucesso",
      label: "Sucesso",
      icon: Check,
    },
  ];
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <DefaultCard
        title={translate["cardTitle"]}
        description={translate["cardDescription"]}
      >
        <div className="flex flex-row w-full items-center justify-center">
          <Button asChild>
            <Link href="/login">{translate["buttonLabel"]}</Link>
          </Button>
        </div>
      </DefaultCard>
    </PageLayout>
  );
}
