import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

const VideoModal = () => {
  const t = useTranslations("movie");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700">
          <Play />
          {t("Watch Movie")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <div className="relative pt-[56.25%]">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-K23aIcaMrg?si=0mVz47jX5gGdvB5R"
            title="YouTube video player"
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
