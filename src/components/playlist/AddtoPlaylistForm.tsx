"use client";
import { addToWatchList, getWishlistMovies } from "@/actions/action";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const AddtoPlaylistForm = ({ movieId }: { movieId: string }) => {
  const t = useTranslations("playlists");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      const wishlist = await getWishlistMovies();
      const isMovieInWishlist = wishlist.some(
        (movie: { id: string }) => movie.id === movieId,
      );
      setIsInWishlist(isMovieInWishlist);
    };

    checkIfInWishlist();
  }, [movieId]);

  const handleRemove = async () => {
    // Implement the function to remove the movie from the playlist here
    console.log("Remove from playlist");
  };

  return (
    <form action={addToWatchList}>
      <input type="hidden" name="movieId" value={movieId} />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-gray-700"
        onClick={(e) => {
          if (isInWishlist) {
            e.preventDefault(); // Prevent form submission for remove action
            handleRemove();
          }
        }}
      >
        {isInWishlist ? (
          <>
            <Minus className="h-4 w-4" />
            {t("Remove from Playlist")}
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            {t("Add to Playlist")}
          </>
        )}
      </button>
    </form>
  );
};

export default AddtoPlaylistForm;
