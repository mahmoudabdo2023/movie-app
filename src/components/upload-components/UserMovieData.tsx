import { UploadMovieType } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type UserMovieDataProps = {
  register: UseFormRegister<UploadMovieType>;
  errors: FieldErrors<UploadMovieType>;
};

const UserMovieData = ({ register, errors }: UserMovieDataProps) => {
  const t = useTranslations("uploadMovie");
  return (
    <section className="w-full space-y-8 rounded-md bg-[#1E293B] p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-white">
        {t("Enter Your Information")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstname" className="block text-sm text-gray-400">
            {t("First Name")}
          </label>
          <input
            type="text"
            id="firstname"
            {...register("firstName")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Ahmed")}
          />
          {errors.firstName?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm text-gray-400">
            {t("Last Name")}
          </label>
          <input
            type="text"
            id="lastname"
            {...register("lastName")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Ali")}
          />
          {errors.lastName?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-gray-400">
          {t("Phone Number")}
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          placeholder="+201 123 456 789"
        />
        {errors.phone?.message && (
          <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-gray-400">
          {t("Email Address")}
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          placeholder="john.doe@example.com"
        />
        {errors.email?.message && (
          <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-gray-400">
          {t("Company")}
        </label>
        <input
          type="text"
          id="company"
          {...register("company")}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          placeholder={t("Example Inc")}
        />
        {errors.company?.message && (
          <p className="mt-2 text-sm text-red-400">{errors.company.message}</p>
        )}
      </div>
    </section>
  );
};

export default UserMovieData;
