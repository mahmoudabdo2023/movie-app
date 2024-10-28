import React from "react";
import { BASE_URL } from "@/api/Api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function fetchCategories(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}/categories?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return {
      data: categories.data.document,
      pagination: categories.paginationResult,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const CategoriesTable = async () => {
  const data = await fetchCategories();
  return (
    <div>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default CategoriesTable;
