import { Search } from "lucide-react";
import LocaleSwitcher from "../../header-componenets/LocaleSwitcher";
import UserDropDown from "./UserDropDown";
import { Locale } from "@/config";

const DashNavbar = ({ locale }: { locale: Locale }) => {
  return (
    <nav className="flex w-full items-center justify-end p-4">
      <div className="flex items-center gap-4">
        <Search />
        <LocaleSwitcher />
        <UserDropDown locale={locale} />
      </div>
    </nav>
  );
};

export default DashNavbar;
