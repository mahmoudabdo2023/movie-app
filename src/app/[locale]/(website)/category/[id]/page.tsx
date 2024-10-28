"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getMoviesByCategory } from "@/actions/action";
import { MovieCardProps } from "@/lib/types";
import MovieCard from "@/components/category-components/MovieCard";
import Pagination from "@/components/category-components/Pagination";

const CategoryMovies = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const t = useTranslations("category");

  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getMoviesByCategory(id, page);
      setMovies(result.movies);
      setPagination(result.pagination);
    };

    fetchMovies();
  }, [id, page]);

  if (!movies || movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">
          {t("No movies available in this category")}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        {t("Movies in this Category")}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie: MovieCardProps) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <Pagination pagination={pagination} id={id} />
    </div>
  );
};

export default CategoryMovies;
