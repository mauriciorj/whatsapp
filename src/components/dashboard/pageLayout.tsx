import PageTitle from "@/components/layout/pageTitle";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

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
  isLoading?: boolean;
}

const PageLayout = ({
  breadcrumbItems,
  children,
  pageTitle,
  pageDescription,
  isLoading,
}: PageLayoutProps) => (
  <>
    <div className="container mb-10">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <div className="container mb-10 md:ml-10">
      {isLoading ? (
        <Skeleton className="h-10 w-72 mb-4" />
      ) : (
        <PageTitle title={pageTitle} description={pageDescription} />
      )}
    </div>
    {children}
  </>
);

export default PageLayout;
