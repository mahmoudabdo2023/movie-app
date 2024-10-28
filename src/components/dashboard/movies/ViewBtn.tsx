import { Link } from "@/navigation";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

type EditbtnProps = {
  id: string;
  name: string;
};

const ViewBtn = ({ id, name }: EditbtnProps) => {
  const t = useTranslations("dashboard");
  return (
    <Link
      href={`/dashboard/${name}/view/${id}`}
      className="bg- flex items-center gap-1 rounded-md bg-slate-700 px-2 text-white hover:bg-slate-800"
    >
      <Eye className="h-4 w-4" />
      {t("View")}
    </Link>
  );
};

export default ViewBtn;
