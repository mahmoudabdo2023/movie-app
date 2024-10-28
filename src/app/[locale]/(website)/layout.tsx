import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RerenderProvider } from "@/context/Rerender";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <RerenderProvider>
        <Navbar />
        {children}
        <Footer />
      </RerenderProvider>
    </div>
  );
}
