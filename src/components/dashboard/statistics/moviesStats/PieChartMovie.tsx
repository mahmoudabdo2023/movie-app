"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

type CategoryStat = {
  _id: string;
  count: number;
  totalViews: number;
  category: string;
  percentage: number;
  averageRating: number | null;
};

type PieChartMovieProps = {
  statistics: {
    categoryStats: CategoryStat[];
  };
};

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMovie = ({ statistics }: PieChartMovieProps) => {
  const t = useTranslations("dashboard");

  const categoryLabels = statistics.categoryStats.map((stat) => stat.category);
  const categoryPercentages = statistics.categoryStats.map(
    (stat) => stat.percentage,
  );

  // Using a blue color palette to match your theme
  const data = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryPercentages,
        backgroundColor: [
          "#3b82f6", // Primary blue from your bar chart
          "#60a5fa", // Lighter blue
          "#93c5fd", // Even lighter blue
          "#bfdbfe", // Lightest blue
        ],
        hoverBackgroundColor: [
          "#2563eb", // Slightly darker versions for hover
          "#3b82f6",
          "#60a5fa",
          "#93c5fd",
        ],
        borderWidth: 2,
        borderColor: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            family: "system-ui",
            size: 12,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        padding: 12,
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            return ` ${context.formattedValue}%`;
          },
        },
      },
    },
    cutout: "50%", // Makes it a donut chart
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Category Distribution")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartMovie;
