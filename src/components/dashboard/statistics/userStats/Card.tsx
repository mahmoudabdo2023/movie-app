import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
};

const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => {
  const t = useTranslations("dashboard");

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{t(title)}</p>
          <h3 className="text-2xl font-bold text-gray-700">{value}</h3>
          {description && (
            <p className="text-sm text-gray-500">
              {description}% {t("of total")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
