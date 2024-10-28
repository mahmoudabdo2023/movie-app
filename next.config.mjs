import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Specify the port if it's different from 80
        pathname: "/movies/**", // Allow all paths under /movies
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Specify the port if it's different from 80
        pathname: "/users/**", // Use this pattern to allow all paths under /users
      },
      {
        protocol: "https",
        hostname: "example.com", // Add the external hostname
        pathname: "/images/**", // Allow all paths under /images
      },
      {
        protocol: "https",
        hostname: "shortmoviesback.onrender.com",
        port: "",
        pathname: "/movies/**",
      },
      {
        protocol: "https",
        hostname: "shortmoviesback.onrender.com",
        port: "",
        pathname: "/users/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
