import UsersTable from "@/components/dashboard/users/UsersTable";
import { useTranslations } from "next-intl";

const Users = () => {
  const t = useTranslations("dashboard");
  return (
    <section className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-2xl font-bold">{t("Users")}</h2>
      </div>
      <div className="mt-8">
        <UsersTable />
      </div>
    </section>
  );
};

export default Users;
