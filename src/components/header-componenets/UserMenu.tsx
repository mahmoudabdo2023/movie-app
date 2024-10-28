import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { loggedInUser } from "@/lib/types";

type UserMenuProps = {
  data: loggedInUser | null;
};

const UserMenu = ({ data }: UserMenuProps) => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.profileImg} alt="@shadcn" />
          <AvatarFallback>{data?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${locale === "ar" ? "text-right" : "text-left"} block`}
      >
        <DropdownMenuLabel
          className={`${locale === "ar" ? "text-right" : "text-left"} block`}
        >
          {t("My Account")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`${locale === "ar" ? "text-right" : "text-left"} block`}
          onClick={() => router.push("/profile")}
        >
          {t("Profile")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${locale === "ar" ? "text-right" : "text-left"} block`}
          onClick={() => router.push("/playlists")}
        >
          {t("Playlist")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${locale === "ar" ? "text-right" : "text-left"} block`}
          onClick={() => router.push("/plans")}
        >
          {t("Plans")}
        </DropdownMenuItem>
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

export default UserMenu;
