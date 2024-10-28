"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isOpen,
  isActive,
  path,
}) => {
  const t = useTranslations("dashboard");

  return (
    <li className="mb-2">
      <Link
        href={path}
        className={`flex w-full items-center gap-3 rounded-lg p-2 transition-colors ${
          isActive
            ? "bg-indigo-700 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-300"}`}
        />
        {isOpen && (
          <span className={`${isActive ? "font-medium" : ""}`}>{t(label)}</span>
        )}
      </Link>
    </li>
  );
};

export default NavItem;
