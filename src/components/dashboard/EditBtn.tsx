import { Link } from "@/navigation";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type EditbtnProps = {
  id: string;
  name: string;
};

const EditBtn = ({ id, name }: EditbtnProps) => {
  const t = useTranslations("dashboard");
  return (
    <Link
      href={`/dashboard/${name}/${id}`}
      className="flex items-center gap-1 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
    >
      <Pencil className="h-4 w-4" />
      {t("Edit")}
    </Link>
  );
};

export default EditBtn;
