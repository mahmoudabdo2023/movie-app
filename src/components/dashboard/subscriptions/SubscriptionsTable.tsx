import { BASE_URL } from "@/api/Api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function fetchSubscriptions(page = 1, limit = 10000000) {
  try {
    const response = await fetch(
      `${BASE_URL}/subscriptions?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscriptions");
    }

    const subscriptions = await response.json();
    return subscriptions.data.document;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
}

const SubscriptionsTable = async () => {
  const data = await fetchSubscriptions();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default SubscriptionsTable;
