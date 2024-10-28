import MoviesTable from "@/components/dashboard/movies/MoviesTable";
import { useTranslations } from "next-intl";

const MoviesPage = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Movies")}</h2>
      </div>
      <div className="mt-8">
        <MoviesTable />
      </div>
    </section>
  );
};

export default MoviesPage;
