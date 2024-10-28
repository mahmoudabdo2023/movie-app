"use client";
import MovieData from "@/components/upload-components/MovieData";
import UserMovieData from "@/components/upload-components/UserMovieData";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadMovieType, uploadMovieSchema } from "@/lib/schema";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { getLangDir } from "rtl-detect";

type FieldName = keyof UploadMovieType;

const steps = [
  {
    id: "1",
    fields: ["firstName", "lastName", "phone", "email", "company"],
  },
  {
    id: "2",
    fields: [
      "title",
      "director",
      "duration",
      "language",
      "year",
      "country",
      "genre",
      "videoQuality",
      "subtitle",
      "filmLink",
      "password",
      "rating",
      "privacyPolicy",
    ],
  },
];

const UploadMovie = () => {
  const locale = useLocale();
  const t = useTranslations("uploadMovie");
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const direction = getLangDir(locale);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<UploadMovieType>({
    mode: "onChange",
    resolver: zodResolver(uploadMovieSchema),
  });

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const processForm: SubmitHandler<UploadMovieType> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(data);
    toast.success(t("Movie uploaded successfully!"));
    reset();
  };

  return (
    <main className="min-h-screen bg-gray-900 px-4 py-12">
      <div className="container relative mx-auto flex flex-col items-center">
        {/* steps */}
        <div className="mx-auto flex w-full items-center justify-between">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center ${
                i < steps.length - 1 ? "w-full" : "w-auto"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-medium ${
                  currentStep >= i
                    ? "bg-[#f97316] text-white"
                    : "bg-[#FEF4E9] text-gray-500"
                }`}
              >
                {step.id}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    currentStep > i ? "bg-[#f97316]" : "bg-[#FEF4E9]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          disabled={currentStep === 0}
          style={{
            display: currentStep === 0 ? "none" : "flex",
            right: direction === "ltr" ? "0" : "auto",
            left: direction === "ltr" ? "auto" : "0",
            flexDirection: direction === "ltr" ? "row-reverse" : "row",
          }}
          className="flex gap-1 rounded-lg bg-white p-2 text-base font-semibold text-[#F68C1E] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("Previous")}
        </button>

        {/* Form */}
        <form className="w-full py-6" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <UserMovieData register={register} errors={errors} />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <MovieData register={register} errors={errors} />
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              display: currentStep === steps.length - 1 ? "flex" : "none",
            }}
            className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-[#f97316] px-2 py-4 text-base font-semibold text-white transition-colors hover:bg-[#f97316]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Submit")
            )}
          </button>
        </form>

        {/* Navigation */}
        <div className="pt-5">
          <div
            className={`flex justify-between ${
              direction === "rtl" && "flex-row-reverse"
            }`}
          >
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              style={{
                display: currentStep === steps.length - 1 ? "none" : "block",
              }}
              className="w-full rounded-[8px] bg-[#f97316] px-2 py-4 text-base font-semibold text-white transition-colors hover:bg-[#f97316]/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("Continue")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadMovie;
