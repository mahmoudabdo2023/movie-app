import { BASE_URL } from "@/api/Api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function fetchMovies(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}/movies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies = await response.json();
    return {
      data: movies.data.document,
      pagination: movies.paginationResult,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const MoviesTable = async () => {
  const data = await fetchMovies();
  return (
    <div>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default MoviesTable;
