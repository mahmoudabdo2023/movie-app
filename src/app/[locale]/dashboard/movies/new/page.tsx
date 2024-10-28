import { BASE_URL } from "@/api/Api";
import MovieAdd from "@/components/dashboard/movies/MovieAdd";
import { getTranslations } from "next-intl/server";

async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return categories.data.document;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const NewMovie = async () => {
  const t = await getTranslations("dashboard");
  const categories = await fetchCategories();

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Create a new movie")}</h2>
      </div>
      <div className="mt-8">
        <MovieAdd categories={categories} />
      </div>
    </section>
  );
};

export default NewMovie;
