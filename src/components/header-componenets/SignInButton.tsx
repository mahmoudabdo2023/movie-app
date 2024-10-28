import { Link } from "@/navigation";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

const SignInButton = () => {
  const t = useTranslations("navbar");
  return (
    <Link
      href="/auth/signin"
      className="flex items-center gap-2 rounded-lg bg-[#FEF4E9] px-4 py-2"
    >
      <User size={28} color="#f68c1e" strokeWidth={1.5} />
      <span className="text-base font-medium text-[#f68c1e]">
        {t("Sign in")}
      </span>
    </Link>
  );
};

export default SignInButton;
