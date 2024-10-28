"use client";
import { loggedInUser } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL, UPDATE_LOGGED_USER } from "@/api/Api";
import { useSession } from "next-auth/react";
import { useRerender } from "@/context/Rerender";

type CardProfileProps = {
  initialData: loggedInUser;
};

const CardProfile = ({ initialData }: CardProfileProps) => {
  const { data: session } = useSession();
  const t = useTranslations("profile");
  const { setRerender } = useRerender();
  const locale = useLocale();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);
  const [username, setUsername] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setSelectedImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    const formData = new FormData();

    // Append only fields that have been changed
    if (username !== initialData.name) {
      formData.append("name", username);
    }
    if (email !== initialData.email) {
      formData.append("email", email);
    }
    if (phone !== initialData.phone) {
      formData.append("phone", phone);
    }
    if (selectedImageFile) {
      formData.append("profileImg", selectedImageFile);
    }

    // If no changes were made, return early
    if (
      !formData.has("name") &&
      !formData.has("email") &&
      !formData.has("phone") &&
      !formData.has("profileImg")
    ) {
      console.log("No changes detected.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${BASE_URL}${UPDATE_LOGGED_USER}`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(t("Updated successfully"));
      setRerender(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type narrowing for AxiosError
        if (error.response?.data.errors) {
          const messages = error.response.data.errors.map(
            (err: { msg: string }) => err.msg,
          );
          setErrorMessages(messages);
          messages.forEach((msg: string) => toast.error(msg));
        }
      } else {
        // Handle non-Axios errors or unexpected cases
        toast.error(t("Something went wrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#F3F4F6] text-black shadow">
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div className="relative mx-auto h-32 w-32">
            <label
              htmlFor="file"
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-200 hover:opacity-100"
            >
              <span>{t("Change Image")}</span>
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <Image
              className="absolute left-0 top-0 h-full w-full rounded-full bg-[gray] object-cover opacity-70"
              src={selectedImagePreview || initialData?.profileImg}
              alt=""
              width={128}
              height={128}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("Username")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("Enter your name")}
                className="block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("Email")}
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Enter your email")}
                className="block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("Phone")}
            </label>
            <div className="mt-2">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("Enter your phone")}
                className={`${locale === "ar" ? "text-right" : "text-left"} block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6`}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center rounded-lg bg-[#f68c1e] p-2 text-white transition duration-300"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Save Changes")
            )}
          </button>
          {errorMessages.length > 0 && (
            <div className="mt-1 text-red-600">
              {errorMessages.map((message, index) => (
                <p key={index} className="text-red-600">
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CardProfile;
