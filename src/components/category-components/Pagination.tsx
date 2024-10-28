"use client";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

type PaginationProps = {
  pagination: {
    currentPage: number;
    numberOfPages: number;
    next: number | null;
    previous: number | null;
  } | null; // Allow null
  id: string;
};

const Pagination = ({ pagination, id }: PaginationProps) => {
  const t = useTranslations("category");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/category/${id}?${params.toString()}`);
  };

  if (!pagination) return null;

  return (
    <div className="mt-8 flex items-center justify-center">
      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="mr-2 rounded bg-orange-600 px-4 py-2 font-bold text-white hover:bg-orange-700 disabled:bg-gray-400"
      >
        {t("Previous")}
      </button>
      <span className="mx-4 text-white">
        {t("Page")} {pagination.currentPage} {t("of")}{" "}
        {pagination.numberOfPages}
      </span>
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={
          pagination.currentPage === pagination.numberOfPages &&
          !pagination.next
        }
        className="ml-2 rounded bg-orange-600 px-4 py-2 font-bold text-white hover:bg-orange-700 disabled:bg-gray-400"
      >
        {t("Next")}
      </button>
    </div>
  );
};

export default Pagination;
