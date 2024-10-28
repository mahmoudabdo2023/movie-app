import { getTranslations } from "next-intl/server";
import { Users, UserCheck, UserX, Star, Eye, Film, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/statistics/userStats/Card";
import { BASE_URL } from "@/api/Api";
import BarChartComponent from "@/components/dashboard/statistics/userStats/BarChart";
import BarChartComponentTwo from "@/components/dashboard/statistics/userStats/BarChartTwo";
import LineChartComponent from "@/components/dashboard/statistics/userStats/LineChart";
import StatCardMovies from "@/components/dashboard/statistics/moviesStats/StatCardMovies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChartMovie from "@/components/dashboard/statistics/moviesStats/PieChartMovie";
import BarChartMovie from "@/components/dashboard/statistics/moviesStats/BarChartComponenet";

type categoryStat = {
  _id: string;
  count: number;
  totalViews: number;
  category: string;
  percentage: number;
  averageRating: number | null;
};

async function fetchUsersStatistics() {
  try {
    const response = await fetch(`${BASE_URL}/statistics/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const statistics = await response.json();
    return statistics.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

async function fetchMoviesStatistics() {
  try {
    const response = await fetch(`${BASE_URL}/statistics/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const statistics = await response.json();
    return statistics.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

const DashboardHome = async () => {
  const t = await getTranslations("dashboard");
  const Userstatistics = await fetchUsersStatistics();
  const Moviestatistics = await fetchMoviesStatistics();

  return (
    <main className="container mx-auto py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          {t("User Analytics")}
        </h1>

        {/* Overview Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={Userstatistics.overview.totalUsers}
            icon={Users}
          />
          <StatCard
            title="Active Users"
            value={Userstatistics.overview.activeUsers}
            icon={UserCheck}
            description={`${Userstatistics.overview.activePercentage}`}
          />
          <StatCard
            title="Inactive Users"
            value={Userstatistics.overview.inactiveUsers}
            icon={UserX}
          />
          <StatCard
            title="Trial Users"
            value={Userstatistics.trialStats.activeTrials}
            icon={Star}
          />
        </div>

        {/* Charts Row */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Subscription Distribution */}
          <BarChartComponent statistics={Userstatistics} />

          {/* Role Distribution */}
          <BarChartComponentTwo statistics={Userstatistics} />
        </div>

        {/* Recent Activity Chart */}
        <LineChartComponent statistics={Userstatistics} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("Movie Analytics")}
          </h1>
          <p className="mt-2 text-gray-500">
            {t("Comprehensive overview of your movie platform")}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCardMovies
            title="Total Movies"
            value={Moviestatistics.overview.totalMovies}
            icon={Film}
          />
          <StatCardMovies
            title="Total Views"
            value={Moviestatistics.overview.totalViews.toLocaleString()}
            icon={Eye}
          />
          <StatCardMovies
            title="Average Rating"
            value={`${Moviestatistics.overview.averageRating} ⭐`}
            icon={Star}
          />
          <StatCardMovies
            title="Total Ratings"
            value={Moviestatistics.overview.totalRatings.toLocaleString()}
            icon={Users}
          />
        </div>

        {/* Duration Stats Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t("Movie Duration Statistics")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-sm text-gray-500">{t("Average Duration")}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(Moviestatistics.durationStats.averageDuration)}{" "}
                  {t("min")}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-sm text-gray-500">{t("Shortest Movie")}</p>
                <p className="text-2xl font-bold text-green-600">
                  {Moviestatistics.durationStats.minDuration} {t("min")}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 text-center">
                <p className="text-sm text-gray-500">{t("Longest Movie")}</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Moviestatistics.durationStats.maxDuration} {t("min")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Category Distribution */}
          <PieChartMovie statistics={Moviestatistics} />

          {/* Language Distribution */}
          <BarChartMovie statistics={Moviestatistics} />
        </div>

        {/* Movie Metrics Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Movie Metrics Overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {Moviestatistics.categoryStats.map((category: categoryStat) => (
                <div
                  key={category.category}
                  className="rounded-lg bg-white p-4 shadow"
                >
                  <h3 className="mb-2 text-lg font-semibold capitalize text-gray-700">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("Count")}:</span>
                      <span className="font-medium">{category.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t("Percentage")}:</span>
                      <span className="font-medium">
                        {category.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardHome;
