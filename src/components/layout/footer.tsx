"use client";

import Link from "next/link";
import FooterSections from "./FooterSections";
import useTranslations from "@/hooks/useTranslations";

const Footer = () => {
  const translate = useTranslations("main");
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-xl font-bold">
            Zap<span className="text-destructive">Router</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <FooterSections
            title={translate["footer"]["product"]["title"]}
            links={translate["footer"]["product"]["links"]}
          />
          <FooterSections
            title={translate["footer"]["company"]["title"]}
            links={translate["footer"]["company"]["links"]}
          />
          <FooterSections
            title={translate["footer"]["support"]["title"]}
            links={translate["footer"]["support"]["links"]}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
