import { changePasswordSchema, passwordChange } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "@/navigation";
import { BASE_URL } from "@/api/Api";
import { Axios } from "@/api/Axios";

const ChangeUserPassword = () => {
  const t = useTranslations("profile");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<passwordChange>({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<passwordChange> = async (data) => {
    const body = {
      currentPassword: data.currentPassword,
      password: data.newPassword,
      passwordConfirm: data.confirmPassword,
    };

    try {
      const axiosInstance = await Axios();
      await axiosInstance.put(`${BASE_URL}/users/changeMyPassword`, body);
      // console.log(response);
      toast.success(t("Password changed successfully"));
      reset();
      await signOut();
      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ errors?: { msg: string }[] }>;
        if (axiosError.response?.data.errors) {
          const messages = axiosError.response.data.errors.map(
            (err) => err.msg,
          );
          messages.forEach((msg) => toast.error(msg));
        } else {
          toast.error(t("Something went wrong"));
        }
      } else {
        toast.error(t("Something went wrong"));
      }
    }
  };

  return (
    <div className="rounded-2xl bg-[#F3F4F6] text-black shadow">
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("Current Password")}
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="currentPassword"
                {...register("currentPassword")}
                className="block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6"
              />
              {errors.currentPassword?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("New Password")}
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="newPassword"
                {...register("newPassword")}
                className="block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6"
              />
              {errors.newPassword?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold leading-6 text-black"
            >
              {t("Confirm Password")}
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="block w-full rounded-lg border-0 p-2 text-[#979899] shadow-sm ring-1 ring-inset ring-[#EBECED] placeholder:text-[#979899] sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center rounded-lg bg-[#f68c1e] p-2 text-white transition duration-300"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Change Password")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
