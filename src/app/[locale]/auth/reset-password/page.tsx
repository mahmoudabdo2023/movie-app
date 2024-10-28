// auth/reset-password/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Film, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/navigation";
import { BASE_URL } from "@/api/Api";

const ResetPassword = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== "") {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(t("Password reset successfully"));
        router.push("/auth/signin");
      } else {
        setLoading(false);
        const data = await response.json();
        setError(t(data.message));
        toast.error(t(data.message));
        // console.log(data);
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        const errorMessage = t(err.message || "An error occurred");
        setError(errorMessage);
        toast.error(errorMessage);
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
            {t("Reset your password")}
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

            <div>
              <label htmlFor="password" className="sr-only">
                {t("Password")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 left-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Lock className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  className={`relative block w-full appearance-none rounded-none border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={`absolute inset-y-0 flex items-center ${locale === "en" ? "right-0 pr-3" : "left-0 pl-3"}`}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="sr-only">
                {t("Confirm Password")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 left-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Lock className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Confirm Password")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className={`absolute inset-y-0 flex items-center ${locale === "en" ? "right-0 pr-3" : "left-0 pl-3"}`}
                >
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-white focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                t("Reset Password")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
