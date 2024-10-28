import CouponsTable from "@/components/dashboard/coupons/CouponsTable";
import { useTranslations } from "next-intl";

const Coupons = () => {
  const t = useTranslations("dashboard");

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Coupons")}</h2>
      </div>
      <div className="mt-8">
        <CouponsTable />
      </div>
    </section>
  );
};

export default Coupons;
