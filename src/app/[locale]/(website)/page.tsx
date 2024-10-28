// page.tsx
import Landing from "@/components/home/Landing";
import MoviesSlider from "@/components/home/MoviesSlider";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
// import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return (
    <main className="px-[10px] md:px-0">
      <Landing />
      <MoviesSlider />
    </main>
  );
}
