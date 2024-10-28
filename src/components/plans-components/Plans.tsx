import { Award, Check, Handshake, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

const PricingSection = () => {
  const t = useTranslations("Plans");
  return (
    <section className="mx-[20px] md:mx-[0]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[white] px-4 py-8 text-[#f59e0b]">
          <h2 className="text-2xl font-bold text-slate-800">{t("Basic")}</h2>
          <Rocket strokeWidth={1} className="h-[80px] w-[80px]" />
          <div>
            <p className="text-4xl">$15</p>
            <span className="text-sm font-bold text-[#777]">
              {t("per month")}
            </span>
          </div>
          <ul className={`w-full text-left`}>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
          </ul>
          <button className="rounded-lg bg-[#f59e0b] px-4 py-2 text-white transition duration-300 hover:bg-[#fca61a]">
            {t("Choose Plan")}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[white] px-4 py-8 text-[#f59e0b]">
          <h2 className="text-2xl font-bold text-slate-800">{t("Advanced")}</h2>
          <Award strokeWidth={1} className="h-[80px] w-[80px]" />
          <div>
            <p className="text-4xl">$20</p>
            <span className="text-sm font-bold text-[#777]">
              {t("per month")}
            </span>
          </div>
          <ul className={`w-full text-left`}>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
          </ul>
          <button className="rounded-lg bg-[#f59e0b] px-4 py-2 text-white transition duration-300 hover:bg-[#fca61a]">
            {t("Choose Plan")}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[white] px-4 py-8 text-[#f59e0b]">
          <h2 className="text-2xl font-bold text-slate-800">
            {t("Professional")}
          </h2>
          <Handshake strokeWidth={1} className="h-[80px] w-[80px]" />
          <div>
            <p className="text-4xl">$30</p>
            <span className="text-sm font-bold text-[#777]">
              {t("per month")}
            </span>
          </div>
          <ul className={`w-full text-left`}>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
            <li className="flex items-center gap-2 border-t border-[#eee] p-[20px]">
              <Check strokeWidth={2.5} />
              <p className="font-bold text-[#777]">{t("Unlimited Movies")}</p>
            </li>
          </ul>
          <button className="rounded-lg bg-[#f59e0b] px-4 py-2 text-white transition duration-300 hover:bg-[#fca61a]">
            {t("Choose Plan")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
