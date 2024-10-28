import DashNavbar from "@/components/dashboard/navbar/DashNavbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

import { Locale } from "@/config";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default function DashboardLayout({
  children,
  params: { locale },
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <div className="flex flex-1">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="w-full">
            <DashNavbar locale={locale} />
          </div>
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
