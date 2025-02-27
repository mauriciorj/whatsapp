import { Breadcrumb } from "@/components/ui/breadcrumb";
import PageTitle from "@/components/layout/pageTitle";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface PageLayoutProps {
  breadcrumbItems?: BreadcrumbItem[];
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const PageLayout = ({
  breadcrumbItems,
  children,
  pageTitle,
  pageDescription,
}: PageLayoutProps) => (
  <div className="pt-10 md:pt-16 pb-16 px-4">
    <div className="mb-10 ml-0 md:ml-[100px]">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    {pageTitle ||
      (pageDescription && (
        <div className="container mb-10 md:ml-10">
          <PageTitle title={pageTitle} description={pageDescription} />
        </div>
      ))}
    {children}
  </div>
);

export default PageLayout;
