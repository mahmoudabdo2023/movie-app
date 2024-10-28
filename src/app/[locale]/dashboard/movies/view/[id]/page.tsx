import { BASE_URL } from "@/api/Api";
import MovieView from "@/components/dashboard/movies/MovieView";
import { getTranslations } from "next-intl/server";
import React from "react";

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

const ViewMovie = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations("dashboard");
  const id = params.id;
  const data = await fetchMovie(id);

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit Movie")}</h2>
      </div>
      <div className="mt-8 w-full">
        <MovieView movie={data} />
      </div>
    </section>
  );
};

export default ViewMovie;
