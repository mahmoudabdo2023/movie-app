// movies/[movieId]/page.tsx
import { getMovieById } from "@/actions/action";
import SpecifcMovieLanding from "@/components/specifc-movie/SpecifcMovieLanding";
import { Locale } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";

const SpecifcMovie = async ({
  params: { locale, movieId },
}: {
  params: { movieId: string; locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  const fetchMovie = await getMovieById(movieId);

  return (
    <main>
      <SpecifcMovieLanding movie={fetchMovie} />;
    </main>
  );
};

export default SpecifcMovie;
