"use client";
import { useState, useRef } from "react";
import { Camera, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { DashboardUpdateUserSchema, UpdateUserType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";
import { AdminUser } from "@/lib/types";

type UsersEditFormProps = {
  user: AdminUser;
};

const UsersEditForm = ({ user }: UsersEditFormProps) => {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(user.profileImg || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserType>({
    mode: "onChange",
    resolver: zodResolver(DashboardUpdateUserSchema),
    defaultValues: {
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
  const selectedRole = watch("role");

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // For previewing the image
    }
  };

  // Handle file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<UpdateUserType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error(t("Not authenticated"));
      return;
    }

    const formData = new FormData();
    if (data.name && data.name !== user.name) {
      formData.append("name", data.name);
    }
    if (data.email && data.email !== user.email) {
      formData.append("email", data.email);
    }
    if (data.role !== user.role) {
      formData.append("role", data.role);
    }
    if (data.phone && data.phone !== user.phone) {
      formData.append("phone", data.phone);
    }
    if (selectedFile) {
      formData.append("profileImg", selectedFile);
    }

    try {
      await axios.put(`${BASE_URL}/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      toast.success(t("User Updated successfully"));
      router.push("/dashboard/users");
      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(t("Failed to Update user"));
    }
  };

  return (
    <form
      className="flex w-full flex-col justify-between gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="text-center">
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-100">
            {image ? (
              <Image
                src={image}
                alt="Profile"
                className="h-full w-full object-cover"
                fill
                sizes="(100vw, 100vh)"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-4 rounded-md bg-[#454F5B] px-4 py-2 text-white hover:bg-[#1C252E] focus:outline-none focus:ring-2 focus:ring-[#454F5B] focus:ring-offset-2"
          >
            {image ? "Change Image" : "Upload Image"}
          </button>
        </div>
      </div>
      <div className="w-full rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Name")}
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10" : "pl-10"}`}
                placeholder={t("Enter your name")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.name?.message ? "-top-[25px]" : "top-0"}`}
              >
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.name?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Email")}
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10" : "pl-10"}`}
                placeholder={t("Enter your email")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.email?.message ? "-top-[25px]" : "top-0"}`}
              >
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.email?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Phone")}
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10 text-end" : "pl-10 text-start"}`}
                placeholder={t("Enter your phone")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.phone?.message ? "-top-[25px]" : "top-0"}`}
              >
                <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.phone?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Role")}
            </label>

            <Select
              value={selectedRole || ""}
              onValueChange={(value) =>
                setValue("role", value as "admin" | "user")
              }
            >
              <SelectTrigger
                className={`flex ${locale === "ar" ? "justify-end" : "justify-start"} text-gray-500`}
              >
                <SelectValue placeholder={t("Select a role")} />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectItem value="user">{t("User")}</SelectItem>
                <SelectItem value="admin">{t("Admin")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.role?.message && (
              <p className="mt-2 text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-primary px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Edit User")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UsersEditForm;
