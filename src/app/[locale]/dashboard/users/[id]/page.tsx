import { BASE_URL } from "@/api/Api";
import { options } from "@/app/api/auth/[...nextauth]/options";
import UsersEditForm from "@/components/dashboard/users/UsersEditForm";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

async function fetchUser(id: string) {
  const session = await getServerSession(options);

  if (!session || !session.user?.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user?.token;

  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();
    return user.data.document;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

const UsersEdit = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const t = await getTranslations("dashboard");
  const data = await fetchUser(id);

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit User")}</h2>
      </div>
      <div className="mt-8 w-full">
        <UsersEditForm user={data} />
      </div>
    </section>
  );
};

export default UsersEdit;
