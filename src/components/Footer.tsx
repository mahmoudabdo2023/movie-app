import { Link } from "@/navigation";
import { Film } from "lucide-react";
import Image from "next/image";
import facebook from "@/assets/g-facebook.png";
import twitter from "@/assets/gTwitter.png";
import instagram from "@/assets/ginstagram.png";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-[#0F172A] py-10 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Brand and Logo */}
          <div className="mb-6 flex items-center space-x-3 md:mb-0">
            <Film className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold">Filmajor</span>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <ul className="flex gap-4">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-orange-500">
                  {t("Movies")}
                </Link>
              </li>
              <li>
                <Link href="/upload-movie" className="hover:text-orange-500">
                  {t("Submit Your Short Movie")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500">
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500">
                  {t("Contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={facebook} alt="logo" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={twitter} alt="logo" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={instagram} alt="logo" className="object-cover" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()}{" "}
            {t("Filmajor All rights reserved")}
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-orange-500"
            >
              {t("Privacy Policy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm hover:text-orange-500"
            >
              {t("Terms of Service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
