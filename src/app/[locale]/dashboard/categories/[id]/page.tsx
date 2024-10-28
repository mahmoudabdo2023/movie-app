import { BASE_URL } from "@/api/Api";
import CategoryEditForm from "@/components/dashboard/categories/CategoryEditForm";
import { getTranslations } from "next-intl/server";

async function fetchCategory(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Category");
    }

    const category = await response.json();
    return category.data.document;
  } catch (error) {
    console.error("Error fetching Category:", error);
    throw error;
  }
}

const CategoryEdit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations("dashboard");
  const id = params.id;
  const data = await fetchCategory(id);

  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Edit Category")}</h2>
      </div>
      <div className="mt-8 w-full">
        <CategoryEditForm category={data} />
      </div>
    </section>
  );
};

export default CategoryEdit;
