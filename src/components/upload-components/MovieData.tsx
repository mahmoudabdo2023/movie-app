"use client";

import { UploadMovieType } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type UserMovieDataProps = {
  register: UseFormRegister<UploadMovieType>;
  errors: FieldErrors<UploadMovieType>;
};

const MovieData = ({ register, errors }: UserMovieDataProps) => {
  const t = useTranslations("uploadMovie");

  return (
    <section className="w-full space-y-8 rounded-md bg-[#1E293B] p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-white">
        {t("Submit Your Short Film")}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm text-gray-400">
            {t("Full Title of the Short Film")}
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("A Day in the Life")}
          />
          {errors.title?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="director" className="block text-sm text-gray-400">
            {t("Director's Full Name")}
          </label>
          <input
            type="text"
            id="director"
            {...register("director")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Ahmed Ali")}
          />
          {errors.director?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.director.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="synopsis" className="block text-sm text-gray-400">
          {t("Synopsis of Short Film")}
        </label>
        <textarea
          id="synopsis"
          {...register("synopsis")}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          placeholder={t("Provide a brief synopsis")}
        ></textarea>
        {errors.synopsis?.message && (
          <p className="mt-2 text-sm text-red-400">{errors.synopsis.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="duration" className="block text-sm text-gray-400">
            {t("Duration (minutes)")}
          </label>
          <input
            type="number"
            id="duration"
            {...register("duration")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("15")}
          />
          {errors.duration?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="language" className="block text-sm text-gray-400">
            {t("Language")}
          </label>
          <input
            type="text"
            id="language"
            {...register("language")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("English")}
          />
          {errors.language?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.language.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="year" className="block text-sm text-gray-400">
            {t("Year of Production")}
          </label>
          <input
            type="number"
            id="year"
            {...register("year")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("2023")}
          />
          {errors.year?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm text-gray-400">
            {t("Country of Production")}
          </label>
          <input
            type="text"
            id="country"
            {...register("country")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Egypt")}
          />
          {errors.country?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="genre" className="block text-sm text-gray-400">
            {t("Genre")}
          </label>
          <input
            type="text"
            id="genre"
            {...register("genre")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Drama")}
          />
          {errors.genre?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="videoQuality" className="block text-sm text-gray-400">
            {t("Video Quality")}
          </label>
          <input
            type="text"
            id="videoQuality"
            {...register("videoQuality")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("1080p")}
          />
          {errors.videoQuality?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.videoQuality.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="subtitle" className="block text-sm text-gray-400">
            {t("Subtitle Language")}
          </label>
          <input
            type="text"
            id="subtitle"
            {...register("subtitle")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("English")}
          />
          {errors.subtitle?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.subtitle.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="filmLink" className="block text-sm text-gray-400">
            {t("Link to Evaluate Your Short Film")}
          </label>
          <input
            type="url"
            id="filmLink"
            {...register("filmLink")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder="https://"
          />
          {errors.filmLink?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.filmLink.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="block text-sm text-gray-400">
            {t("Password (if protected)")}
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            placeholder={t("Enter password if needed")}
          />
          {errors.password?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm text-gray-400">
            {t("Film Rating")}
          </label>
          <select
            id="rating"
            {...register("rating")}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
          >
            <option value="g">{t("G")}</option>
            <option value="pg">{t("PG")}</option>
            <option value="pg-13">{t("PG-13")}</option>
            <option value="r">{t("R")}</option>
            <option value="nc-17">{t("NC-17")}</option>
          </select>
          {errors.rating?.message && (
            <p className="mt-2 text-sm text-red-400">{errors.rating.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="privacyPolicy"
          {...register("privacyPolicy")}
          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-orange-600 focus:ring-orange-500"
        />
        <label htmlFor="privacyPolicy" className="block text-sm text-gray-400">
          {t("I accept the privacy policy")}
        </label>
        {errors.privacyPolicy?.message && (
          <p className="mt-2 text-sm text-red-400">
            {errors.privacyPolicy.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default MovieData;
