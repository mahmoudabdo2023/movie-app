import { DefaultSession, User } from "next-auth";
import { StaticImageData } from "next/image";

export type Movie = {
  id: number;
  title: string;
  image: StaticImageData;
  year: number;
  rating: number;
  overview: string;
  duration: string;
  location: string;
  category: string;
};

export type CustomUser = User & {
  _id: string;
  isTrial: boolean;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptionStatus: string;
  wishList: string[];
  subscription: string;
  subscriptionEndDate: string;
  subscriptionStartDate: string;
  token: string;
  profileImg: string;
};

// Add this new type
export interface CustomSession {
  user: CustomUser;
}

export type loggedInUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImg: string;
  role: string;
  active: boolean;
  isTrial: boolean;
  subscriptionStatus: string;
  wishList: string[];
  createdAt: string;
  updatedAt: string;
};

type Category = {
  _id: string;
  name: string;
};

type Tag = {
  _id: string;
  name: string;
};

type Actor = {
  name: string;
  image: string;
};

export type movies = {
  id: string;
  _id: string;
  name: string;
  description: string;
  director: string;
  duration: number;
  releaseDate: string;
  images: string[];
  country: string;
  views: number;
  imageCover: string;
  category: Category;
  tags: Tag[];
  actors: Actor[];
  video: string;
  language: string;
  subtitles: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
};

export type categories = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type MovieCardProps = {
  _id: string;
  name: string;
  imageCover: string;
  ratingsAverage: number;
  duration: number;
  releaseDate: string;
  category: {
    name: string;
  };
  images: string[];
};

export type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null; // Add the token property
};

declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
    } & DefaultSession["user"];
  }
}

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImg: string;
  role: "user" | "admin";
  active: boolean;
  isTrial: boolean;
  subscriptionStatus: string;
  wishList: string[];
  createdAt: string;
  updatedAt: string;
};

export type subscription = {
  _id: string;
  name: string;
  price: number;
  priceAfterDiscount: number;
  duration: number;
  features: string[];
  usersCount: number;
  active: boolean;
  freeTrialAvailable: boolean;
  trialDuration: number;
  createdAt: string;
  updatedAt: string;
};
