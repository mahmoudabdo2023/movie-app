// profile/page.tsx
import TabsProfile from "@/components/profile-component/TabsProfile";
import { Locale } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";

const Profile = async ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  unstable_setRequestLocale(locale);
  return (
    <main className="px-[10px] md:px-0">
      <section className="container mx-auto py-8 text-white">
        <TabsProfile />
      </section>
    </main>
  );
};

export default Profile;
