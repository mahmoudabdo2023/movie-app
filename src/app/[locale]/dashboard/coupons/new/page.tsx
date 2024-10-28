import CouponAdd from "@/components/dashboard/coupons/CouponAdd";
import { useTranslations } from "next-intl";

const AddCoupons = () => {
  const t = useTranslations("dashboard");

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Create a new coupon")}</h2>
      </div>
      <div className="mt-8">
        <CouponAdd />
      </div>
    </section>
  );
};

export default AddCoupons;
