"use client";

import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { DashsubscriptionSchema, DashsubscriptionType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SubscriptionEditFormProps {
  subscription: {
    _id: string;
    active: boolean;
    freeTrialAvailable: boolean;
    trialDuration: string;
    name: string;
    price: string;
    priceAfterDiscount: string;
    duration: string;
    features: string[];
  };
}

const SubscriptionEditForm = ({ subscription }: SubscriptionEditFormProps) => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();
  const [features, setFeatures] = useState([""]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DashsubscriptionType>({
    mode: "onChange",
    resolver: zodResolver(DashsubscriptionSchema),
    defaultValues: {
      active: subscription.active,
      freeTrialAvailable: subscription.freeTrialAvailable,
      trialDuration: subscription.trialDuration.toString() as unknown as number,
      name: subscription.name,
      price: subscription.price.toString() as unknown as number,
      priceAfterDiscount:
        subscription.priceAfterDiscount.toString() as unknown as number,
      duration: subscription.duration.toString() as unknown as number,
    },
  });

  const activeValue = watch("active");
  const freeTrialAvailableValue = watch("freeTrialAvailable");

  //   features section
  useEffect(() => {
    if (subscription?.features && subscription.features.length > 0) {
      setFeatures(subscription.features);
    } else {
      setFeatures([""]);
    }
  }, [subscription]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };
  //   features section

  const onSubmit: SubmitHandler<DashsubscriptionType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error(t("Not authenticated"));
      return;
    }

    const nonEmptyFeatures = features.filter(
      (feature) => feature.trim() !== "",
    );

    const body = {
      name: data.name,
      price: data.price,
      priceAfterDiscount: data.priceAfterDiscount,
      duration: data.duration,
      trialDuration: data.trialDuration,
      active: data.active,
      freeTrialAvailable: data.freeTrialAvailable,
      features: nonEmptyFeatures,
    };

    try {
      await axios.put(`${BASE_URL}/subscriptions/${subscription._id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      toast.success(t("Subscription Edited successfully"));
      router.push("/dashboard/subscriptions");
      router.refresh();
    } catch (error) {
      console.error("Error Editing subscription:", error);
      toast.error(t("Failed to edit subscription"));
    }
  };

  return (
    <form
      className="flex w-full flex-col justify-between gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-screen-lg rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name" className="text-[#919EAB]">
              {t("Name")}
            </Label>
            <div>
              <Input
                type="text"
                id="name"
                {...register("name")}
                className="mt-1"
                placeholder={t("Enter Name Of Subscription")}
              />
              {errors.name?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="price" className="text-[#919EAB]">
              {t("Price")}
            </Label>
            <div>
              <Input
                type="text"
                id="price"
                {...register("price")}
                className="mt-1"
                placeholder={t("Enter Price Of Subscription")}
              />
              {errors.price?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="priceAfterDiscount" className="text-[#919EAB]">
              {t("Price After Discount")}
            </Label>
            <div>
              <Input
                type="text"
                id="priceAfterDiscount"
                {...register("priceAfterDiscount")}
                className="mt-1"
                placeholder={t("Enter Price After Discount Of Subscription")}
              />
              {errors.priceAfterDiscount?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.priceAfterDiscount.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="duration" className="text-[#919EAB]">
              {t("Duration")}
            </Label>
            <div>
              <Input
                type="text"
                id="duration"
                {...register("duration")}
                className="mt-1"
                placeholder={t("Enter duration Of Subscription")}
              />
              {errors.duration?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-[#919EAB]">{t("Features")}</Label>
            <div className="mt-2 space-y-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-grow">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder={t("Enter feature")}
                      />
                    </div>
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
              className="mt-4 flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              {t("Add Another Feature")}
            </Button>
          </div>

          <div>
            <Label htmlFor="trialDuration" className="text-[#919EAB]">
              {t("Trial Duration")}
            </Label>
            <div>
              <Input
                type="text"
                id="trialDuration"
                {...register("trialDuration")}
                className="mt-1"
                placeholder={t("Enter Trial Duration Of Subscription")}
              />
              {errors.trialDuration?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.trialDuration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={activeValue}
                onCheckedChange={(checked) => {
                  setValue("active", checked, {
                    shouldValidate: true,
                  });
                }}
              />
              <Label
                htmlFor="active"
                className="text-sm font-medium text-[#919EAB]"
              >
                {t("Active Subscription")}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="FreeTrial"
                checked={freeTrialAvailableValue}
                onCheckedChange={(checked) => {
                  setValue("freeTrialAvailable", checked, {
                    shouldValidate: true,
                  });
                }}
              />
              <Label
                htmlFor="FreeTrial"
                className="text-sm font-medium text-[#919EAB]"
              >
                {t("Free Trial")}
              </Label>
            </div>
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
              t("Edit Subscription")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubscriptionEditForm;
