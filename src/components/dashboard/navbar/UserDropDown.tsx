"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Locale } from "@/config";

const UserDropDown = ({ locale }: { locale: Locale }) => {
  const t = useTranslations("dashboard");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src={data?.profileImg} alt="@shadcn" />
          <AvatarFallback>{data?.name?.charAt(0)}</AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${locale === "ar" ? "text-right" : "text-left"} block`}
      >
        <DropdownMenuItem
          className={`${locale === "ar" ? "text-right" : "text-left"} block bg-[#FFE0D8] text-sm font-semibold text-[#B71D18] hover:bg-[#FFE0D8] hover:text-[#B71D18] focus:bg-[#FFE0D8] focus:text-[#B71D18]`}
          onClick={() => signOut()}
        >
          {t("Logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
