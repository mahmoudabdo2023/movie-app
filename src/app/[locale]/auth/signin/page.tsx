// auth/signin/page.tsx
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Film } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Link, useRouter } from "@/navigation";

const LoginPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      toast.error(t(result.error) || t("Login failed"));
    } else {
      toast.success(t("Login successful!"));
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Film className="mx-auto h-12 w-auto text-orange-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("Sign in to Filmajor")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {t("Your gateway to cinematic adventures")}
          </p>
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
                  autoComplete="current-password"
                  required
                  className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-orange-600 focus:ring-orange-500"
              />
              <label
                htmlFor="remember-me"
                className="block text-sm text-gray-400"
              >
                {t("Remember me")}
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-orange-500 hover:text-orange-400"
              >
                {t("Forgot your password?")}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {t("Sign in")}
            </button>
          </div>

          <div className="text-sm">
            <p className="text-gray-400">
              {t("Don't have an account?")}{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-orange-500 hover:text-orange-400"
              >
                {t("Sign up")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
