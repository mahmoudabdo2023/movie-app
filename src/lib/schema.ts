"use client";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type passwordChange = z.infer<typeof changePasswordSchema>;

export const SignupSchema = z
  .object({
    username: z.string().min(3, "username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUp = z.infer<typeof SignupSchema>;

export const uploadMovieSchema = z.object({
  // UserMovieData fields
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(50, { message: "First Name must be 50 characters or less" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .max(50, { message: "Last Name must be 50 characters or less" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  company: z
    .string()
    .min(1, { message: "Company is required" })
    .max(100, { message: "Company must be 100 characters or less" }),

  // MovieData fields
  title: z
    .string()
    .min(1, { message: "Full title of the short film is required" })
    .max(100, { message: "Title must be 100 characters or less" }),
  director: z
    .string()
    .min(1, { message: "Director's full name is required" })
    .max(100, { message: "Director's name must be 100 characters or less" }),
  synopsis: z
    .string()
    .min(1, { message: "Synopsis is required" })
    .max(1000, { message: "Synopsis must be 1000 characters or less" }),
  duration: z
    .string()
    .min(1, { message: "Duration is required" })
    .pipe(
      z.coerce
        .number()
        .positive({ message: "Duration must be a positive number" })
        .min(1, { message: "Duration must be at least 1 minute" })
        .max(60, { message: "Duration must be 60 minutes or less" }),
    ),

  language: z.string().min(1, { message: "Language is required" }),
  year: z
    .string()
    .min(1, { message: "Year is required" })
    .pipe(
      z.coerce
        .number()
        .min(1900, { message: "Invalid year of production" })
        .max(new Date().getFullYear(), {
          message: "Year cannot be in the future",
        }),
    ),
  country: z.string().min(1, { message: "Country of production is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  videoQuality: z.string().min(1, { message: "Video quality is required" }),
  subtitle: z.string().optional(),
  filmLink: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "Film link is required" }),
  password: z.string().optional(),
  rating: z.enum(["g", "pg", "pg-13", "r", "nc-17"], {
    required_error: "Film rating is required",
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

export type UploadMovieType = z.infer<typeof uploadMovieSchema>;

export const DashboardCreateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is required" })
      .max(30, { message: "Name must be 30 characters or less" }),
    image: z.string().optional(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be less than 32 characters" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be less than 32 characters" }),
    phone: z.string().optional(),
    subscription: z.string().optional(),
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type CreateUserType = z.infer<typeof DashboardCreateUserSchema>;

export const DashboardUpdateUserSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().optional(),
  role: z.enum(["admin", "user"], {
    required_error: "Role is required",
  }),
});

export type UpdateUserType = z.infer<typeof DashboardUpdateUserSchema>;

export const CreateCategorySchema = z.object({
  title: z
    .string()
    .min(2, { message: "title is required" })
    .max(30, { message: "title must be 30 characters or less" }),
  description: z
    .string()
    .min(2, { message: "description is required" })
    .max(100, { message: "description must be 100 characters or less" }),
});

export type createCategoryType = z.infer<typeof CreateCategorySchema>;

export const DashMovieSchema = z.object({
  name: z
    .string()
    .min(1, "Movie title is required")
    .max(100, "Movie title can't be longer than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description can't be longer than 500 characters"),
  category: z.string().min(1, { message: "Category is required" }),
  director: z
    .string()
    .min(1, "Director's name is required")
    .max(100, "Director's name can't be longer than 100 characters"),
  language: z
    .string()
    .min(1, "Language is required")
    .max(50, "Language can't be longer than 50 characters"),
  video: z
    .string()
    .url("Video URL must be a valid URL")
    .min(1, "Video URL is required"),
  releaseDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Release date must be in the format YYYY-MM-DD",
    )
    .min(1, "Release date is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .transform((val) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        throw new Error("Must be a valid number");
      }
      return parsed;
    }),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country can't be longer than 100 characters"),
  imageCover: z.string().min(1, "Cover image is required"),
  images: z.array(z.string()).default([]),
});

export type DashMovieType = z.infer<typeof DashMovieSchema>;

export const DashsubscriptionSchema = z.object({
  name: z.string().min(1, "subscription title is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        throw new Error("Must be a valid number");
      }
      return parsed; // Return the parsed number
    }),
  priceAfterDiscount: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 0;
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        throw new Error("Must be a valid number");
      }
      return parsed; // Return the parsed number
    }),
  duration: z
    .string()
    .min(1, "Duration is required")
    .transform((val) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        throw new Error("Must be a valid number");
      }
      return parsed; // Return the parsed number
    }),
  active: z.boolean().default(true),
  freeTrialAvailable: z.boolean().default(false),
  trialDuration: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 0;
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        throw new Error("Must be a valid number");
      }
      return parsed; // Return the parsed number
    }),
});

export type DashsubscriptionType = z.infer<typeof DashsubscriptionSchema>;

export const DashCouponSchema = z.object({
  name: z
    .string()
    .min(1, "Name of coupon is required")
    .max(30, "Name of coupon can't be longer than 30 characters"),
  discount: z.number().min(1, "Discount is required"),
  expire: z
    .date({ required_error: "Expire is required" })
    .refine((val) => val >= new Date(), {
      message: "Expire date cannot be in the past",
    }),
});

export type DashCouponType = z.infer<typeof DashCouponSchema>;
