import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Film } from "lucide-react";
import { getCategories } from "@/actions/action";
import LoadingIndicator from "../LoadingIndicator";
import { categories } from "@/lib/types";
import { useRouter } from "@/navigation";

const CategoriesSelect = () => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<categories[] | []>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsOpen(false);
    router.push(`/category/${categoryId}`);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div ref={dropdownRef} className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
      >
        <span className="flex items-center gap-2">
          <Film className="h-4 w-4 text-orange-500" />
          {selectedCategory ? selectedCategory : t("categories")}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 transform" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() =>
                  handleSelectCategory(category._id, category.name)
                }
                className="block w-full px-4 py-2 text-left text-sm text-white transition-colors duration-200 hover:bg-gray-700 hover:text-orange-500"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSelect;
