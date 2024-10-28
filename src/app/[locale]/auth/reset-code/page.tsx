// auth/reset-code/page.tsx
"use client";
import React, { useRef, useState } from "react";
import { Film } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/navigation";
import axios from "axios";
import { BASE_URL } from "@/api/Api";

const ResetCode = () => {
  const t = useTranslations("auth");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // handle otp input change and focus next input
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // handle backspace on otp input
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && otp[index] === "") {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError(t("Please enter a valid 6-digit code"));
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/auth/verify-reset-code`, {
        resetCode: otpCode,
      });
      setLoading(false);
      // console.log(response);
      toast.success(t("Code verified successfully"));
      router.push("/auth/reset-password");
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
            {t("Enter Reset Code")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="spin-button-none h-12 w-12 rounded border-2 border-[#E6E6E6] bg-transparent text-center text-xl font-semibold text-gray-400 outline-none transition focus:border-[#F68C1E] focus:text-[#F68C1E] focus:ring-[#F68C1E]"
              />
            ))}
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Verify Code")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetCode;
