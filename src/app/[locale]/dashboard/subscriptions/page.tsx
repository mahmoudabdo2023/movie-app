import SubscriptionsTable from "@/components/dashboard/subscriptions/SubscriptionsTable";
import { useTranslations } from "next-intl";

const SubscriptionsPage = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Subscriptions")}</h2>
      </div>
      <div className="mt-8">
        <SubscriptionsTable />
      </div>
    </section>
  );
};

export default SubscriptionsPage;
