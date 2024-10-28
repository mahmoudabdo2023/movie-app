import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BASE_URL } from "@/api/Api";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function fetchUsers(page = 1, limit = 10000000) {
  const session = await getServerSession(options);

  if (!session || !session.user?.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user?.token;

  try {
    const response = await fetch(
      `${BASE_URL}/users?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return {
      data: users.data.document,
      pagination: users.paginationResult,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

const UsersTable = async () => {
  const data = await fetchUsers();
  return (
    <div>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default UsersTable;
