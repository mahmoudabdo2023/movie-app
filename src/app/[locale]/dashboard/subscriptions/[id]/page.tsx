import { BASE_URL } from "@/api/Api";
import SubscriptionEditForm from "@/components/dashboard/subscriptions/SubscriptionEditForm";
import { getTranslations } from "next-intl/server";

async function fetchSubscription(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Subscription");
    }

    const subscription = await response.json();
    return subscription.data.document;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
}

const EditSubscription = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations("dashboard");
  const id = params.id;
  const data = await fetchSubscription(id);

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit Movie")}</h2>
      </div>
      <div className="mt-8 w-full">
        <SubscriptionEditForm subscription={data} />
      </div>
    </section>
  );
};

export default EditSubscription;
