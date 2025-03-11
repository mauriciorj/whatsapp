"use client";

import Link from "next/link";

const FooterSections = ({
  title,
  links,
}: {
  title: string;
  links: { [key: string]: string }[];
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links?.map((link: any) => (
          <li className="ml-5" key={link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSections;
