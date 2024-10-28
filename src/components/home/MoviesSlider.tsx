// movies.tsx file
import MovieSection from "./MovieSection";
import { fetchMovies, fetchTopWatchedMovies } from "@/actions/action";

const MoviesSlider = async () => {
  const fetchedMovies = await fetchMovies();
  const mostRecentMovies = fetchedMovies.slice(0, 5);

  const topWatchedMovies = await fetchTopWatchedMovies(5);

  if (!fetchedMovies) {
    return null;
  }

  return (
    <section className="bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <MovieSection
            movies={topWatchedMovies}
            title="Top Watched"
            type="top-watched"
          />
          <MovieSection
            movies={mostRecentMovies}
            title="Most Recent"
            type="most-recent"
          />
        </div>
      </div>
    </section>
  );
};

export default MoviesSlider;
