import Image from "next/image";
import { Star, Clock, Calendar, Share2, Plus } from "lucide-react";
import { formatReleaseDate } from "@/utils/dateFn";
import { movies } from "@/lib/types";
import VideoModal from "./VideoModal";
import { useTranslations } from "next-intl";

type movieProps = {
  movie: movies;
};

const SpecifcMovieLanding = ({ movie }: movieProps) => {
  const t = useTranslations("movie");
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[50vh] w-full">
        <Image
          src={movie.imageCover}
          alt={movie.name}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="relative z-10 -mt-32 flex flex-col gap-8 md:flex-row">
          <div className="mb-8 w-full md:mb-0 md:w-1/3">
            <Image
              src={movie.images[0]}
              alt={movie.name}
              width={300}
              height={450}
              className="h-[450px] w-full rounded-lg object-cover shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="mb-2 text-4xl font-bold">{movie.name}</h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" />
                <span className="">{movie.ratingsAverage}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="" />
                <span className="">{movie.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="" />
                <span>{formatReleaseDate(movie.releaseDate)}</span>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2">
              {movie.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="mb-2 inline-block rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <p className="mb-6 text-gray-300">{movie.description}</p>
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{t("Director")}</h2>
              <p>{movie.director}</p>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{t("Cast")}</h2>
              <p>{movie.actors.map((actor) => actor.name).join(", ")}</p>
            </div>
            <div className="flex items-center gap-4">
              <VideoModal />
              <button className="flex items-center gap-2 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-700">
                <Plus />
                {t("Add to Playlist")}
              </button>
              <button className="flex items-center gap-2 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-700">
                <Share2 />
                {t("Share")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecifcMovieLanding;
