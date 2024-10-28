"use client";
import {
  Menu,
  X,
  Home,
  User,
  Boxes,
  Clapperboard,
  BadgeDollarSign,
  BadgePercent,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import NavItem from "./NavItem";
import { usePathname } from "@/navigation";

const navItems = [
  { key: "Home", Icon: Home, path: "/dashboard" },
  { key: "Categories", Icon: Boxes, path: "/dashboard/categories" },
  { key: "Movies", Icon: Clapperboard, path: "/dashboard/movies" },
  { key: "Users", Icon: User, path: "/dashboard/users" },
  {
    key: "Subscriptions",
    Icon: BadgeDollarSign,
    path: "/dashboard/subscriptions",
  },
  { key: "Coupons", Icon: BadgePercent, path: "/dashboard/coupons" },
];
const Sidebar = () => {
  const t = useTranslations("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`h-full bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && <h1 className="text-xl font-bold">{t("Filmajor")}</h1>}
        <button
          onClick={toggleNavbar}
          className="rounded-lg p-2 transition-colors hover:bg-gray-700"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <ul className="flex-1 px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.key}
            icon={item.Icon}
            label={item.key}
            isOpen={isOpen}
            isActive={pathname === item.path}
            path={item.path}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
