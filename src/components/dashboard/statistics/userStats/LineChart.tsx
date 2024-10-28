"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineChartProps = {
  statistics: {
    recentActivity: {
      _id: string;
      newUsers: number;
    }[];
  };
};

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

const LineChartComponent = ({ statistics }: LineChartProps) => {
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
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("Recent User Activity")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statistics.recentActivity}>
              <XAxis dataKey="_id" />
              <YAxis tick={CustomYAxisTick || undefined} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
