/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import LocaleSwitcher from "./header-componenets/LocaleSwitcher";
import SignInButton from "./header-componenets/SignInButton";
import CategoriesSelect from "./header-componenets/CategoriesSelect";
import { Menu, X, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import UserMenu from "./header-componenets/UserMenu";
import { getUserData } from "@/actions/action";
import { useSession } from "next-auth/react";
import { useRerender } from "@/context/Rerender";
// import LoadingIndicator from "./LoadingIndicator";
import Search from "./header-componenets/Search";

const Navbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { rerender } = useRerender();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (status === "authenticated") {
        const data = await getUserData();
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [status, rerender]);

  return (
    <header
      className={`relative z-50 ${pathname.includes("/auth") ? "hidden" : ""}`}
    >
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white">Filmajor</h1>
            </Link>
            <div className="hidden items-center gap-4 lg:flex">
              <CategoriesSelect />
            </div>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <Search />
            <LocaleSwitcher />
            {status === "authenticated" && userData ? (
              <UserMenu data={userData} />
            ) : (
              <SignInButton />
            )}
          </div>
          <button
            className="z-50 rounded-full bg-gray-800 p-2 transition-colors duration-300 hover:bg-gray-700 lg:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMenu}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-gray-900 p-6 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${locale === "ar" ? "right-0" : "left-0"} ${
          isOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-orange-500"
          >
            <Home className="h-5 w-5" />
            <span>{t("Home")}</span>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <CategoriesSelect />
          </div>
          <div className="flex items-center gap-2 text-white">
            {status === "authenticated" && userData ? (
              <UserMenu data={userData} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
        <div className="mb-6">
          <Search />
        </div>
        <div>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
