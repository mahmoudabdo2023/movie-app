"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 bg-gray-100 rounded-md p-2 text-gray-800"
    >
      <Globe className="text-[#58585A] w-5 h-5" />
      <span className="text-base font-medium md:text-sm text-[#58585A]">
        {locale === "en" ? "AR" : "EN"}
      </span>
    </button>
  );
}
