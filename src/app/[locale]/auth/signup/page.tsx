// auth/signup/page.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff, Mail, Lock, Film, User } from "lucide-react";
import { useState } from "react";
import { Link, useRouter } from "@/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp, SignupSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";

const Signup = () => {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signUp>({
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<signUp> = async (data) => {
    const body = {
      name: data.username,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword,
    };
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, body);

      if (response.status === 201) {
        toast.success(t("Sign up successful!"));
        reset();
        router.push("/auth/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(
            error.response.data.message ||
              t("An error occurred during sign up"),
          );
        } else if (error.request) {
          toast.error(t("No response from server. Please try again."));
        } else {
          toast.error(t("An error occurred. Please try again."));
        }
      } else {
        toast.error(t("An unexpected error occurred"));
      }
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className={`w-full max-w-md space-y-8`}>
        <div>
          <Film className="mx-auto h-12 w-auto text-orange-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("Sign up in Filmajor")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {t("Your gateway to cinematic adventures")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <div>
                <label htmlFor="username" className="sr-only">
                  {t("User name")}
                </label>
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                  >
                    <User className="z-50 h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    {...register("username")}
                    type="text"
                    autoComplete="username"
                    required
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                    placeholder={t("User name")}
                  />
                </div>
              </div>
              {errors.username?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t("Email address")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 ${errors.email && "top-[-25px]"} flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Mail className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  className={`relative block w-full appearance-none rounded-none border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Email address")}
                />
                {errors.email?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t("Password")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 ${errors.password && "top-[-25px]"} left-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Lock className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`relative block w-full appearance-none rounded-none border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Password")}
                />
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
                <div
                  className={`absolute inset-y-0 ${errors.password && "top-[-25px]"} flex items-center ${locale === "en" ? "right-0 pr-3" : "left-0 pl-3"}`}
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
              <label htmlFor="confirmPassword" className="sr-only">
                {t("Confirm Password")}
              </label>
              <div className="relative">
                <div
                  className={`pointer-events-none absolute inset-y-0 ${errors.confirmPassword && "top-[-25px]"} left-0 flex items-center ${locale === "en" ? "left-0 pl-3" : "right-0 pr-3"}`}
                >
                  <Lock className="z-50 h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm ${locale === "en" ? "pl-10" : "pr-10"}`}
                  placeholder={t("Confirm Password")}
                />
                {errors.confirmPassword?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <div
                  className={`absolute inset-y-0 ${errors.confirmPassword && "top-[-25px]"} flex items-center ${locale === "en" ? "right-0 pr-3" : "left-0 pl-3"}`}
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

          <div className="flex items-center gap-1">
            <span className="text-sm font-light text-white">
              {t("Already have an account?")}
            </span>
            <Link
              href="/auth/signin"
              className="text-orange-600 hover:underline"
            >
              {t("Sign In")}
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-[#ea580c] px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ea580c]/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                t("Sign Up")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
