// auth/forgot-password/page.tsx
"use client";
import React, { useState } from "react";
import { Mail, Film } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/navigation";
import axios from "axios";
import { BASE_URL } from "@/api/Api";

const ForgotPassword = () => {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      email: email,
    };
    try {
      await axios.post(`${BASE_URL}/auth/forget-password`, params);
      setLoading(false);
      // console.log(response);
      toast.success(t("Password reset code sent to email"));
      setEmail("");
      router.push("/auth/reset-code");
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage =
          err.response.data?.message || t("An error occurred");
        setError(t(errorMessage));
        toast.error(t(errorMessage));
      } else {
        const errorMessage = t("An unexpected error occurred");
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Film className="mx-auto h-12 w-auto text-orange-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("Forgot your password?")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t("Email address")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Mail className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Email address")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Send email")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
