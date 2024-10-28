import { BASE_URL } from "@/api/Api";
import MovieEditForm from "@/components/dashboard/movies/MovieEditForm";
import { getTranslations } from "next-intl/server";

async function fetchMovie(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Movie");
    }

    const movie = await response.json();
    return movie.data.document;
  } catch (error) {
    console.error("Error fetching Movie:", error);
    throw error;
  }
}

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

const MovieEdit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations("dashboard");
  const id = params.id;
  const data = await fetchMovie(id);
  const categories = await fetchCategories();

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit Movie")}</h2>
      </div>
      <div className="mt-8 w-full">
        <MovieEditForm movie={data} categories={categories} />
      </div>
    </section>
  );
};

export default MovieEdit;
