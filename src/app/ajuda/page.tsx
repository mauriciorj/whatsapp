"use client";

import { MessageCircleQuestion } from "lucide-react";
import HelpContent from "@/components/help/help-content";
import PageLayout from "@/components/layout/pageLayout";

const breadcrumbItems = [
  {
    href: "/ajuda",
    label: "Ajuda",
    icon: MessageCircleQuestion,
  },
];

export default function Help() {
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <HelpContent />
    </PageLayout>
  );
}
