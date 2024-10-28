"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type languageStats = {
  _id: string;
  language: string;
  count: number;
  percentage: number;
};

type BarChartProps = {
  statistics: {
    languageStats: languageStats[];
  };
};

const COLORS = ["#3b82f6", "#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899"];

const BarChartMovie = ({ statistics }: BarChartProps) => {
  const t = useTranslations("dashboard");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          {t("Language Distribution")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.languageStats}>
              <XAxis dataKey="language" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5">
                {statistics.languageStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartMovie;
