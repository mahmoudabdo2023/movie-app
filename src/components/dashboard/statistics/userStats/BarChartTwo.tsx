"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RoleDistributionStat = {
  _id: string;
  count: number;
  role: string;
  percentage: number;
};

type BarChartProps = {
  statistics: {
    roleDistribution: RoleDistributionStat[];
  };
};

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

const BarChartComponentTwo = ({ statistics }: BarChartProps) => {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  // Custom Y-axis tick component to adjust text position for Arabic locale
  const CustomYAxisTick =
    locale === "ar"
      ? ({ x, y, payload }: CustomTickProps) => {
          return (
            <text x={x - 35} y={y} textAnchor="end" fill="#666">
              {payload.value}
            </text>
          );
        }
      : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Role Distribution")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.roleDistribution}>
              <XAxis dataKey="role" />
              <YAxis tick={CustomYAxisTick || undefined} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartComponentTwo;
