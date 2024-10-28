"use client";

import React, { useEffect, useState } from "react";
import { ImageDropzone } from "./ImageDropzone";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/api/Api";
import { DashMovieSchema, DashMovieType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { movies } from "@/lib/types";
import { formatDate } from "@/utils/dateFn";

type MovieAddProps = {
  movie: movies;
  categories: { _id: string; name: string }[];
};

type Actor = {
  name: string;
};
type ActorField = keyof Actor;

const MovieEditForm = ({ movie, categories }: MovieAddProps) => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();
  const [actors, setActors] = useState<Actor[]>([{ name: "" }]);
  const [subtitles, setSubtitles] = useState([""]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DashMovieType>({
    mode: "onChange",
    resolver: zodResolver(DashMovieSchema),
    defaultValues: {
      name: movie.name,
      description: movie.description,
      category: movie.category._id,
      director: movie.director,
      language: movie.language,
      duration: movie.duration,
      video: movie.video,
      releaseDate: formatDate(movie.releaseDate),
      country: movie.country,
      imageCover: movie.imageCover,
      images: movie.images || [],
    },
  });

  // actors section
  useEffect(() => {
    if (movie?.actors && movie.actors.length > 0) {
      setActors(movie.actors);
    }
  }, [movie]);

  const handleActorChange = (
    index: number,
    field: ActorField,
    value: string,
  ) => {
    const newActors = [...actors];
    newActors[index][field] = value;
    setActors(newActors);
  };

  const addActor = () => {
    setActors([...actors, { name: "" }]);
  };

  const removeActor = (index: number) => {
    const newActors = actors.filter((_, i) => i !== index);
    setActors(newActors);
  };
  // actors section

  //   subtitles section
  useEffect(() => {
    if (movie?.subtitles && movie.subtitles.length > 0) {
      setSubtitles(movie.subtitles);
    } else {
      setSubtitles([""]);
    }
  }, [movie]);

  const handleSubtitleChange = (index: number, value: string) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index] = value;
    setSubtitles(newSubtitles);
  };

  const addSubtitle = () => {
    setSubtitles([...subtitles, ""]);
  };

  const removeSubtitle = (index: number) => {
    const newSubtitles = subtitles.filter((_, i) => i !== index);
    setSubtitles(newSubtitles);
  };
  //   subtitles section

  const onSubmit: SubmitHandler<DashMovieType> = async (data) => {
    if (!session || !session.user?.token) {
      toast.error("Not authenticated");
      return;
    }
    const formData = new FormData();

    if (data.name && data.name !== movie.name) {
      formData.append("name", data.name);
    }
    if (data.description && data.description !== movie.description) {
      formData.append("description", data.description);
    }
    if (data.category && data.category !== movie.category._id) {
      formData.append("category", data.category);
    }
    if (data.country && data.country !== movie.country) {
      formData.append("country", data.country);
    }
    if (data.director && data.director !== movie.director) {
      formData.append("director", data.director);
    }
    if (data.language && data.language !== movie.language) {
      formData.append("language", data.language);
    }
    if (
      data.duration &&
      data.duration.toString() !== movie.duration.toString()
    ) {
      formData.append("duration", data.duration.toString());
    }
    if (data.releaseDate && data.releaseDate !== movie.releaseDate) {
      formData.append("releaseDate", data.releaseDate);
    }
    if (data.video && data.video !== movie.video) {
      formData.append("video", data.video);
    }
    if (data.imageCover && data.imageCover !== movie.imageCover) {
      const coverImageResponse = await fetch(data.imageCover);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("imageCover", coverImageBlob);
    }
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];
        if (image && image !== movie.images[i]) {
          const imageResponse = await fetch(image);
          const imageBlob = await imageResponse.blob();
          formData.append(`images`, imageBlob); // Adjust this line
        }
      }
    }

    const filteredSubtitles = subtitles.filter(
      (subtitle) => subtitle.trim() !== "",
    );
    filteredSubtitles.forEach((subtitle) => {
      formData.append("subtitles[]", subtitle);
    });

    actors.forEach((actor, index) => {
      formData.append(`actors[${index}][name]`, actor.name);
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/movies/${movie._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.user?.token}`,
          },
        },
      );
      toast.success("Movies updated successfully");
      console.log(response.data);
      router.push("/dashboard/movies");
      router.refresh();
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("Failed to update movie");
    }
  };

  return (
    <form
      className="flex w-full flex-col justify-between gap-4 md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-screen-lg rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Movie title")}
            </label>
            <div>
              <Input
                type="text"
                id="name"
                {...register("name")}
                className="mt-1"
                placeholder={t("Enter movie title")}
              />
              {errors.name?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Description")}
            </label>
            <div>
              <div>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="mt-1"
                  placeholder={t("Enter Movie Description")}
                />
              </div>
              {errors.description?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Category")}
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Select category")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="mt-2 text-sm text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="director"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Director")}
            </label>
            <div>
              <Input
                type="text"
                id="director"
                {...register("director")}
                className="mt-1"
                placeholder={t("Enter director name")}
              />
              {errors.director?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.director.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="language"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Language")}
            </label>
            <div>
              <Input
                type="text"
                id="language"
                {...register("language")}
                className="mt-1"
                placeholder={t("Enter language")}
              />
              {errors.language?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.language.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>{t("Subtitles")}</Label>
            <div className="mt-2 space-y-4">
              {subtitles.map((subtitle, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-grow">
                      <Input
                        value={subtitle}
                        onChange={(e) =>
                          handleSubtitleChange(index, e.target.value)
                        }
                        placeholder={t("Enter subtitle language")}
                      />
                    </div>
                    {subtitles.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubtitle(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addSubtitle}
              className="mt-4 flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              {t("Add Another Subtitle")}
            </Button>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Movie Duration")}
            </label>
            <div>
              <Input
                type="text"
                id="duration"
                {...register("duration")}
                className="mt-1"
                placeholder={t("Enter duration")}
              />
              {errors.duration?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="video"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Video URL")}
            </label>
            <div>
              <Input
                type="text"
                id="video"
                {...register("video")}
                className="mt-1"
                placeholder={t("Enter videoUrl")}
              />
              {errors.video?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.video.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="releaseDate"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Release Date")}
            </label>
            <div>
              <Input
                type="text"
                id="releaseDate"
                {...register("releaseDate")}
                className="mt-1"
                placeholder={t("Enter release Date")}
              />
              {errors.releaseDate?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.releaseDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="mb-2 block text-sm font-medium text-[#919EAB]"
            >
              {t("Country")}
            </label>
            <div>
              <Input
                type="text"
                id="country"
                {...register("country")}
                className="mt-1"
                placeholder={t("Enter country")}
              />

              {errors.country?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Label>{t("Actors")}</Label>
            <div className="mt-2 space-y-4">
              {actors.map((actor, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow space-y-4">
                      <div>
                        <Label htmlFor={`actor-name-${index}`}>
                          {t("Actor Name")}
                        </Label>
                        <Input
                          id={`actor-name-${index}`}
                          value={actor.name}
                          onChange={(e) =>
                            handleActorChange(index, "name", e.target.value)
                          }
                          className="mt-1"
                          placeholder={t("Enter actor name")}
                        />
                      </div>
                    </div>
                    {actors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeActor(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addActor}
              className="mt-4 flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              {t("Add Another Actor")}
            </Button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center rounded-[8px] bg-primary px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              t("Update Movie")
            )}
          </button>
        </div>
      </div>
      <div className="w-full max-w-screen-lg rounded-2xl bg-white px-6 py-8 text-[#1C252E]">
        <div className="grid gap-6">
          {/* Cover Image */}
          <ImageDropzone
            label={t("Cover Image")}
            onChange={(value) => setValue("imageCover", value as string)}
            value={watch("imageCover") || ""}
            error={errors.imageCover?.message}
          />

          {/* Multiple Images */}
          <ImageDropzone
            label={t("Movie Images")}
            onChange={(value) => setValue("images", value as string[])}
            value={watch("images") || []}
            multiple
            error={errors.images?.message}
          />
        </div>
      </div>
    </form>
  );
};

export default MovieEditForm;
