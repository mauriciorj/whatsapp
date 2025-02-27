import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <div className="w-full  p-4 md:p-8 pt-10">{children}</div>
    </div>
  );
}
