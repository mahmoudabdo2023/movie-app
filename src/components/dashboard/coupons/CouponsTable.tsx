import { BASE_URL } from "@/api/Api";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function fetchCoupons(page = 1, limit = 10000000) {
  const session = await getServerSession(options);
  const token = session?.user?.token;

  try {
    const response = await fetch(
      `${BASE_URL}/coupons?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coupons");
    }

    const coupons = await response.json();
    return coupons.data.document;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
}

const CouponsTable = async () => {
  const data = await fetchCoupons();
  console.log(data);
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CouponsTable;
