import { BASE_URL } from "@/api/Api";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CouponEditForm from "@/components/dashboard/coupons/CouponEditForm";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

async function fetchCoupon(id: string) {
  const session = await getServerSession(options);

  if (!session || !session.user?.token) {
    throw new Error("Not authenticated");
  }

  const token = session?.user?.token;

  try {
    const response = await fetch(`${BASE_URL}/coupons/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Coupon");
    }

    const coupon = await response.json();
    return coupon.data.document;
  } catch (error) {
    console.error("Error fetching Coupon:", error);
    throw error;
  }
}

const CouponEdit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations("dashboard");
  const id = params.id;
  const data = await fetchCoupon(id);
  console.log(data);
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit Coupon")}</h2>
      </div>
      <div className="mt-8 w-full">
        <CouponEditForm coupon={data} />
      </div>
    </section>
  );
};

export default CouponEdit;
