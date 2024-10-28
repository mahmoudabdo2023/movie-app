import React from "react";
import {
  Calendar,
  Clock,
  Eye,
  Globe,
  Languages,
  Star,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { movies } from "@/lib/types";
import { formatReleaseDate } from "@/utils/dateFn";
import { useTranslations } from "next-intl";

type MovieViewProps = {
  movie: movies;
};

const MovieView = ({ movie }: MovieViewProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden rounded-xl">
        <Image
          src={movie.imageCover}
          alt={movie.name}
          fill
          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
          priority
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">{movie.name}</h1>
            <p className="text-md mt-2 opacity-90">{movie.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("Views"),
            value: movie.views,
            icon: <Eye className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: t("Duration"),
            value: `${movie.duration} ${t("min")}`,
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: t("Release Date"),
            value: formatReleaseDate(movie.releaseDate),
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: t("Rating"),
            value: movie.ratingsQuantity,
            icon: <Star className="h-4 w-4 text-muted-foreground" />,
          },
        ].map(({ title, value, icon }, index) => (
          <Card
            key={index}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Movie Details")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: t("Director"),
                value: movie.director,
                icon: <User className="h-4 w-4" />,
              },
              {
                label: t("Country"),
                value: movie.country,
                icon: <Globe className="h-4 w-4" />,
              },
              {
                label: t("Language"),
                value: movie.language,
                icon: <Languages className="h-4 w-4" />,
              },
            ].map(({ label, value, icon }, index) => (
              <div key={index} className="flex items-center gap-2">
                {icon}
                <span className="font-medium">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
            <div>
              <div className="mb-2 font-medium">{t("Subtitles")}:</div>
              <div className="flex flex-wrap gap-2">
                {movie.subtitles.map((subtitle, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-secondary px-2 py-1 text-sm capitalize text-secondary-foreground"
                  >
                    {subtitle}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Cast")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{t("Actors")}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {movie.actors.map((actor, index) => (
                    <div
                      key={index}
                      className="rounded-md bg-secondary p-2 text-secondary-foreground"
                    >
                      {actor.name}
                    </div>
                  ))}
                </div>
              </div>
              {movie.tags.length > 0 && (
                <div>
                  <div className="mb-2 font-medium">{t("Tags")}</div>
                  <div className="flex flex-wrap gap-2">
                    {movie.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Section */}
      {movie.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("Gallery")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {movie.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video h-full w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={image}
                    alt={`Movie scene ${index + 1}`}
                    fill
                    sizes="(100vw, 100vh)"
                    priority
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MovieView;
