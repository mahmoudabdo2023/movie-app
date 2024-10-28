import CategoriesTable from "@/components/dashboard/categories/CategoriesTable";
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Categories")}</h2>
      </div>
      <div className="mt-8">
        <CategoriesTable />
      </div>
    </section>
  );
};

export default Categories;
