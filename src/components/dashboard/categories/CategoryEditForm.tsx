"use client";
import { Box, NotepadText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCategorySchema, createCategoryType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";

type UsersEditFormProps = {
  category: {
    name: string;
    description: string;
    _id: string;
  };
};

const CategoryEditForm = ({ category }: UsersEditFormProps) => {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createCategoryType>({
    mode: "onChange",
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      title: category.name,
      description: category.description,
    },
  });

  const onSubmit: SubmitHandler<createCategoryType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error(t("Not authenticated"));
      return;
    }

    const body = {
      name: data.title,
      description: data.description,
    };

    try {
      await axios.put(`${BASE_URL}/categories/${category._id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      toast.success(t("Category Updated successfully"));
      router.push("/dashboard/categories");
      router.refresh();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(t("Failed to Update category"));
    }
  };

  return (
    <form
      className="flex w-full flex-col justify-between gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-screen-lg rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Title")}
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                {...register("title")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10" : "pl-10"}`}
                placeholder={t("Enter Title Of Category")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.title?.message ? "-top-[25px]" : "top-0"}`}
              >
                <Box className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.title?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Description")}
            </label>
            <div className="relative">
              <div className="relative">
                <textarea
                  id="description"
                  {...register("description")}
                  className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 sm:text-sm ${
                    locale === "ar" ? "pr-10" : "pl-10"
                  }`}
                  placeholder={t("Enter Description Of Category")}
                />
                <div
                  className={`pointer-events-none absolute inset-y-0 flex items-center ${
                    locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"
                  }`}
                >
                  <NotepadText
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
              {errors.description?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-primary px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Update Category")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryEditForm;
