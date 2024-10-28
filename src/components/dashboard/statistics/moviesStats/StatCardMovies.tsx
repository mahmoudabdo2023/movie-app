import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

type StatCardMoviesProps = {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  trend?: number;
};

const StatCardMovies = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatCardMoviesProps) => {
  const t = useTranslations("dashboard");

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{t(title)}</p>
          <h3 className="text-2xl font-bold text-gray-700">{value}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        {trend && (
          <div
            className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCardMovies;
