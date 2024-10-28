import axios from "axios";
import { BASE_URL } from "./Api";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { CustomSession } from "@/lib/types";

export const Axios = async () => {
  const session = (await getServerSession(options)) as CustomSession | null;

  // Check if the session and token are available
  if (!session || !session.user?.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user.token;

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AxiosFormData = async () => {
  const session = (await getServerSession(options)) as CustomSession | null;

  // Check if the session and token are available
  if (!session || !session.user?.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user.token;

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
