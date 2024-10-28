import { fetchMovies, fetchTopWatchedMovies } from "@/actions/action";
import MovieCard from "@/components/category-components/MovieCard";
import { MovieCardProps } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import React from "react";

type MoviesProps = {
  searchParams: Record<string, string | undefined>;
};

const Movies = async ({ searchParams }: MoviesProps) => {
  const type = searchParams?.type || "default";
  const t = await getTranslations("movies");

  // Fetch movies based on the type
  let movies = [];
  if (type === "top-watched") {
    movies = await fetchTopWatchedMovies();
  } else if (type === "most-recent") {
    movies = await fetchMovies();
  } else {
    movies = await fetchMovies();
  }

  if (!movies) {
    return null;
  }

  const title =
    type === "top-watched"
      ? "Top Watched"
      : type === "most-recent"
        ? "Most Recent"
        : "All Movies";

  return (
    <main className="bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-4xl font-bold text-white">{t(title)}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie: MovieCardProps) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Movies;
