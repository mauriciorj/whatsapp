import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />
      <main className="w-full p-2 md:p-8">{children}</main>
    </div>
  );
}
