import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

import { Loader2, Search as SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/navigation";
import { fetchMovies } from "@/actions/action";
import { movies } from "@/lib/types";

const Search = () => {
  const t = useTranslations("navbar");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await fetchMovies({ keyword: searchTerm, limit: 5 });
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-b-2 border-orange-500 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 opacity-100 transition-all duration-300 ease-in-out focus:outline-none md:w-64"
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="rounded-l-none"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SearchIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {showResults && (
        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg">
          {searchResults.length > 0 ? (
            <ul className="max-h-60 overflow-auto py-1">
              {searchResults.map((movie: movies) => (
                <li key={movie._id} className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    href={`/movies/${movie._id}`}
                    onClick={handleResultClick}
                  >
                    <span className="block text-sm text-gray-700">
                      {movie.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">{t("noResults")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
