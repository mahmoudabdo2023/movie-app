import { Link } from "@/navigation";
import { Play } from "lucide-react";
import Image from "next/image";
import { movies } from "../../lib/types";
import { getTranslations } from "next-intl/server";
import AddtoPlaylistForm from "../playlist/AddtoPlaylistForm";

type MovieSectionProps = {
  movies: movies[];
  title: string;
  type: string;
};

const MovieSection = async ({ movies, title, type }: MovieSectionProps) => {
  const t = await getTranslations("home");
  // console.log("movies:", movies);

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
        <h3 className="text-2xl font-bold text-white md:text-4xl">
          {t(title)}
        </h3>
        <Link
          className="rounded-full bg-[#FEF4E9] px-4 py-2 text-sm font-semibold transition duration-300"
          href={`/movies?type=${type}`}
        >
          {t("See all")}
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative h-96 w-full cursor-pointer overflow-hidden rounded-lg text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/movies/${movie.id}`}>
              <div className="relative h-96 w-full">
                <Image
                  src={movie.images[0]}
                  alt={movie.name}
                  fill
                  sizes="(100vw, 100vh)"
                  priority
                  className="h-96 w-full transform rounded-lg object-cover transition duration-300 hover:scale-110"
                />
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-[#ffcb17] px-3 py-1 text-xs font-semibold text-black">
                {movie.category.name}
              </span>
              <span></span>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent px-4 pb-28 md:pb-16">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{movie.name}</h4>
                  <span className="text-sm opacity-80">
                    {movie.duration}
                    {t("min")}
                  </span>
                </div>
                <p className="mt-2 line-clamp-1 text-sm opacity-70">
                  {movie.description}
                </p>
              </div>
            </Link>

            <div className="absolute bottom-4 left-4 right-4 mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
              <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:bg-opacity-80">
                <Play className="h-4 w-4" />
                {t("Play Now")}
              </button>
              <AddtoPlaylistForm movieId={movie.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
