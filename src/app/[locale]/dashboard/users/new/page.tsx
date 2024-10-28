import UsersForm from "@/components/dashboard/users/UsersForm";
import { useTranslations } from "next-intl";
import React from "react";

const AddUser = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Create a new user")}</h2>
      </div>
      <div className="mt-8">
        <UsersForm />
      </div>
    </section>
  );
};

export default AddUser;
