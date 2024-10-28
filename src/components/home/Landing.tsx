// landing.tsx file
"use client";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/actions/action";
import { formatReleaseDate } from "@/utils/dateFn";
import { movies } from "@/lib/types";
import LoadingIndicator from "../LoadingIndicator";
import { useRouter } from "@/navigation";

const Landing = () => {
  const t = useTranslations("home");
  const router = useRouter();
  const [movies, setMovies] = useState<movies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <section className="bg-gray-900 py-8 text-white">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className={`grid grid-cols-1 gap-4 md:grid-cols-2`}>
              <div className="flex flex-col items-center justify-center gap-4 text-left">
                <h1 className="px-10 text-center text-3xl font-bold md:text-5xl">
                  {movie.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">
                    {movie.duration}
                    {t("min")}
                  </span>
                  <span className="text-lg font-medium opacity-70">
                    {formatReleaseDate(movie.releaseDate)}
                  </span>
                  <span className="rounded-md bg-[#33373d] px-2 py-1 text-lg font-medium">
                    {movie.country}
                  </span>
                </div>
                <p className="px-10 text-center text-lg opacity-70 md:text-xl">
                  {movie.description}
                </p>
                <div className="flex items-center gap-4 text-black">
                  <Button
                    onClick={() => router.push(`/movies/${movie._id}`)}
                    className="flex items-center gap-1 rounded-lg bg-white p-6 text-lg font-medium uppercase text-black transition-colors duration-300 hover:bg-gray-200 hover:text-black active:bg-gray-500"
                  >
                    <Play color="black" strokeWidth={1} />
                    {t("Watch now")}
                  </Button>
                  {/* <Button
                    variant="ghost"
                    className="flex items-center gap-1 rounded-lg border border-white p-6 text-lg font-medium uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black"
                  >
                    <Info strokeWidth={2} className="hover:text-black" />
                    {t("Info")}
                  </Button> */}
                </div>
              </div>
              <div className="relative h-64 w-full md:h-[500px]">
                <Image
                  src={movie.images[0]}
                  alt={movie.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Landing;
