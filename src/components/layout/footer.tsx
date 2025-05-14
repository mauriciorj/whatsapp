"use client";

import Link from "next/link";
import FooterSections from "./footerSections";
import useTranslations from "@/hooks/useTranslations";

const Footer = () => {
  const translations = useTranslations("Main");
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
            title={translations["Footer"]["Product"]["title"]}
            links={translations["Footer"]["Product"]["links"]}
          />
          <FooterSections
            title={translations["Footer"]["Company"]["title"]}
            links={translations["Footer"]["Company"]["links"]}
          />
          <FooterSections
            title={translations["Footer"]["Support"]["title"]}
            links={translations["Footer"]["Support"]["links"]}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
