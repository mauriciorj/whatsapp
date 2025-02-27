import { Breadcrumb } from "@/components/ui/breadcrumb";
import PageTitle from "../layout/pageTitle";

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
  <>
    <div className="container mb-10">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <div className="container mb-10 md:ml-10">
      <PageTitle title={pageTitle} description={pageDescription} />
    </div>
    {children}
  </>
);

export default PageLayout;
