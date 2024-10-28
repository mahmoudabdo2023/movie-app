import CategoryAdd from "@/components/dashboard/categories/CategoryAdd";
import { useTranslations } from "next-intl";

const AddCategory = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Create a new category")}</h2>
      </div>
      <div className="mt-8">
        <CategoryAdd />
      </div>
    </section>
  );
};

export default AddCategory;
