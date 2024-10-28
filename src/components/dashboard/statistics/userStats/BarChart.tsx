"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

type SubscriptionStat = {
  _id: string;
  count: number;
  status: string;
  percentage: number;
};

type BarChartProps = {
  statistics: {
    subscriptionStats: SubscriptionStat[];
  };
};

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChartComponent = ({ statistics }: BarChartProps) => {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  // Prepare data for Chart.js
  const labels = statistics.subscriptionStats.map((stat) => stat.status);
  const data = {
    labels,
    datasets: [
      {
        label: t("Subscriptions"), // Chart label
        data: statistics.subscriptionStats.map((stat) => stat.count),
        backgroundColor: "#3b82f6", // Bar color
      },
    ],
  };

  // Customizing options for Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: t("Status"),
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t("Count"),
        },
        ticks: {
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              return locale === "ar" ? `${tickValue} ` : `${tickValue}`;
            }
            return tickValue;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            return `${context.raw} ${t("Subscriptions")}`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Subscription Distribution")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
