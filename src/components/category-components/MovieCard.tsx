import React from "react";
import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface MovieCardProps {
  movie: {
    _id: string;
    name: string;
    imageCover: string;
    ratingsAverage: number;
    duration: number;
    releaseDate: string;
    category: {
      name: string;
    };
    images: string[];
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const t = useTranslations("category");

  return (
    <div className="group relative h-80 overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-[2/3]">
        <Image
          src={movie?.images[0]}
          alt={movie?.name}
          fill
          sizes="(100vw, 100vh)"
          priority
          className="object-cover transition-opacity duration-300 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="mb-2 text-xl font-bold text-white">{movie?.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            {movie?.ratingsAverage?.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            {movie?.duration} {t("min")}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            {new Date(movie?.releaseDate).getFullYear()}
          </span>
        </div>
      </div>
      <div className="absolute left-0 top-0 m-2 rounded-full bg-orange-600 px-2 py-1 text-xs font-semibold text-white">
        {movie?.category?.name}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button className="rounded-full bg-orange-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-700">
          {t("watchNow")}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
