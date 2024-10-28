// layout.tsx
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "react-hot-toast";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Locale, locales } from "@/config";
import { getLangDir } from "rtl-detect";
import AuthProvider from "@/context/AuthProvider";

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const direction = getLangDir(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
