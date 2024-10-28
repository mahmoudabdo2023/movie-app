// action.ts file
"use server";

import {
  BASE_URL,
  CATEGORIES,
  GET_ALL_MOVIES,
  INCREMENT_VIEW,
  LOGGED_USER,
  TOP_WATCHED,
  WISHLIST,
} from "@/api/Api";
import { Axios } from "@/api/Axios";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getUserData = async () => {
  try {
    const axiosInstance = await Axios();
    const res = await axiosInstance.get(`${LOGGED_USER}`);
    // console.log("getUserData response:", res.data.data.document);
    return res.data.data.document;
  } catch (error) {
    console.error("Error in getUserData:", error);
    return null;
  }
};

export async function fetchMovies(queryParams = {}) {
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_MOVIES}`, {
      params: queryParams,
    });
    return response.data.data.document;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchTopWatchedMovies(limit?: number) {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_ALL_MOVIES}${TOP_WATCHED}`,
      {
        params: { limit },
      },
    );
    return response.data.data.movies;
  } catch (error) {
    console.error("Error fetching top watched movies:", error);
    return [];
  }
}

export async function incrementMovieViews(movieId: string) {
  try {
    await axios.patch(
      `${BASE_URL}${GET_ALL_MOVIES}/${movieId}${INCREMENT_VIEW}`,
    );
  } catch (error) {
    console.error("Error incrementing movie views:", error);
  }
}

export async function getMovieById(movieId: string) {
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_MOVIES}/${movieId}`);
    return response.data.data.document;
  } catch (error) {
    console.error("Error fetching movie by id:", error);
    return null;
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${CATEGORIES}`);
    return response.data.data.document;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getMoviesByCategory = async (
  categoryId: string,
  page: number = 1,
  limit: number = 4,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_ALL_MOVIES}?category=${categoryId}&page=${page}&limit=${limit}`,
    );
    return {
      movies: response.data.data.document,
      pagination: response.data.paginationResult,
    };
  } catch (error) {
    console.log("Error fetching movies by category:", error);
    return { movies: [], pagination: null };
  }
};

export const getWishlistMovies = async () => {
  try {
    const axiosInstance = await Axios();
    const response = await axiosInstance.get(`${BASE_URL}${WISHLIST}`);
    return response.data.data.wishList;
  } catch (error) {
    console.log("Error fetching wishlist movies:", error);
    return [];
  }
};

export const addToWatchList = async (formData: FormData) => {
  const movieId = formData.get("movieId");
  try {
    const axiosInstance = await Axios();
    const response = await axiosInstance.post(`${WISHLIST}`, {
      movieId,
    });

    revalidatePath("/movies/[movieId]");
    return response.data.data.wishList;
  } catch (error) {
    console.log("Error adding movie to wishlist:", error);
    return error;
  }
};
