"use client";
import { useState, useRef } from "react";
import { Camera, Eye, EyeClosed, Lock, Mail, Phone, User } from "lucide-react";
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
import { CreateUserType, DashboardCreateUserSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";

const UsersForm = () => {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserType>({
    mode: "onChange",
    resolver: zodResolver(DashboardCreateUserSchema),
    defaultValues: {
      role: "user",
      name: "ahmed ali",
      email: "Dk5oH@example.com",
      password: "12345678",
      passwordConfirm: "12345678",
      phone: "01068764085",
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

  const onSubmit: SubmitHandler<CreateUserType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error("Not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.passwordConfirm);
    formData.append("role", data.role);
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (selectedFile) {
      formData.append("profileImg", selectedFile);
    }

    try {
      await axios.post(`${BASE_URL}/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      toast.success("User created successfully");
      reset();
      router.push("/dashboard/users");
      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
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
            {image ? t("Change Image") : t("Upload Image")}
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
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10" : "pl-10"}`}
                placeholder={t("Enter your password")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.password?.message ? "-top-[25px]" : "top-0"}`}
              >
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.password?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                className={`absolute inset-y-0 flex items-center text-sm text-gray-400 hover:text-gray-500 ${locale === "ar" ? "left-0 pl-3" : "right-0 pr-3"} ${errors.password?.message ? "-top-[25px]" : "top-0"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="passwordConfirm"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Password Confirm")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                {...register("passwordConfirm")}
                className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-500 sm:text-sm ${locale === "ar" ? "pr-10" : "pl-10"}`}
                placeholder={t("Enter your password confirm")}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"} ${errors.passwordConfirm?.message ? "-top-[25px]" : "top-0"}`}
              >
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {errors.passwordConfirm?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.passwordConfirm.message}
                </p>
              )}
              <button
                type="button"
                className={`absolute inset-y-0 flex items-center text-sm text-gray-400 hover:text-gray-500 ${locale === "ar" ? "left-0 pl-3" : "right-0 pr-3"} ${errors.passwordConfirm?.message ? "-top-[25px]" : "top-0"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeClosed /> : <Eye />}
              </button>
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
              t("Create User")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UsersForm;
