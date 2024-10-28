"use client";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { DashCouponSchema, DashCouponType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const CouponAdd = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<DashCouponType>({
    mode: "onChange",
    resolver: zodResolver(DashCouponSchema),
  });

  const onSubmit: SubmitHandler<DashCouponType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error(t("Not authenticated"));
      return;
    }

    const body = {
      name: data.name,
      discount: data.discount,
      expire: data.expire,
    };

    try {
      const response = await axios.post(`${BASE_URL}/coupons`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      console.log(response);
      toast.success(t("Coupon created successfully"));
      form.reset();
      router.push("/dashboard/coupons");
      router.refresh();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(t("Failed to create category"));
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col justify-between gap-4 md:flex-row"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full max-w-screen-lg rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
          <div className="grid grid-cols-1 gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Name")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("Enter Coupon Title")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* discount Field */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Discount")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("Enter Discount")}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.discount?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* expire Field */}
            <FormField
              control={form.control}
              name="expire"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("Expire")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-between pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t("Pick a date")}</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage>
                    {form.formState.errors.expire?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-primary px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {form.formState.isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                t("Create Coupon")
              )}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CouponAdd;
