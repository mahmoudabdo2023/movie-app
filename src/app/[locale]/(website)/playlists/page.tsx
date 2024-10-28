import { getWishlistMovies } from "@/actions/action";
import MovieCard from "@/components/category-components/MovieCard";
import { Locale } from "@/config";
import { MovieCardProps } from "@/lib/types";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

const Playlist = async ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("playlists");
  const WishListMovies = await getWishlistMovies();
  console.log("WishListMovies:", WishListMovies);

  if (!WishListMovies) {
    return null;
  }

  return (
    <main className="bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-4xl font-bold text-white">{t("Playlists")}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {WishListMovies.map((movie: MovieCardProps) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Playlist;
