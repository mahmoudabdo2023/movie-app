"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProfile from "./CardProfile";
import ChangeUserPassword from "./ChangeUserPassword";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/actions/action";

const TabsProfile = () => {
  const t = useTranslations("profile");
  const locale = useLocale();
  const { status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      if (status === "authenticated") {
        try {
          const data = await getUserData();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [status]);

  return (
    <div className="flex w-full items-center justify-center">
      <Tabs
        dir={locale === "ar" ? "rtl" : "ltr"}
        defaultValue="account"
        className="w-[450px]"
      >
        <TabsList className="w-full rounded-md bg-[#1E293B]">
          <TabsTrigger
            value="account"
            className="w-full rounded-md px-4 py-2 text-white transition-colors hover:bg-[#2D3748] data-[state=active]:bg-[#F68C1E] data-[state=active]:text-white"
          >
            {t("Account")}
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="w-full rounded-md px-4 py-2 text-white transition-colors hover:bg-[#2D3748] data-[state=active]:bg-[#F68C1E] data-[state=active]:text-white"
          >
            {t("Password")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4 text-white">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          ) : userData ? (
            <CardProfile initialData={userData} />
          ) : (
            <div>{t("No user data available")}</div>
          )}
        </TabsContent>
        <TabsContent value="password" className="mt-4 text-white">
          <ChangeUserPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsProfile;
