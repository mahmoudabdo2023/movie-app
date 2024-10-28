"use client";

import { PlusCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DashMovieSchema, DashMovieType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/Api";
import axios from "axios";
import { useRouter } from "@/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "./ImageDropzone";

type MovieAddProps = {
  categories: { _id: string; name: string }[];
};

type Actor = {
  name: string;
};
type ActorField = keyof Actor;

const MovieAdd = ({ categories }: MovieAddProps) => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { data: session } = useSession();
  const [actors, setActors] = useState<Actor[]>([{ name: "" }]);
  const [subtitles, setSubtitles] = useState([""]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DashMovieType>({
    mode: "onChange",
    resolver: zodResolver(DashMovieSchema),
    defaultValues: {
      name: "Mystery of the Lost Temple",
      description:
        "A thrilling adventure deep into the heart of an ancient civilization.",
      category: "67024f9984a7669c55c288d0",
      director: "John Doe",
      language: "English",
      duration: 120,
      video: "https://example.com/video.mp4",
      releaseDate: "2022-05-15",
      country: "USA",
    },
  });

  // actors section
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
    console.log(data);
    if (!session || !session.user?.token) {
      toast.error("Not authenticated");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("director", data.director);
    formData.append("duration", data.duration.toString());
    formData.append("language", data.language);
    formData.append("releaseDate", data.releaseDate);
    formData.append("video", data.video);

    // Add subtitles - filter out empty strings
    const filteredSubtitles = subtitles.filter(
      (subtitle) => subtitle.trim() !== "",
    );

    filteredSubtitles.forEach((subtitle) => {
      formData.append("subtitles[]", subtitle);
    });

    // Add actors
    actors.forEach((actor, index) => {
      formData.append(`actors[${index}][name]`, actor.name);
    });

    if (data.imageCover) {
      const coverImageResponse = await fetch(data.imageCover);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("imageCover", coverImageBlob);
    }
    if (data.images && data.images.length > 0) {
      await Promise.all(
        data.images.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          formData.append(`images`, blob);
        }),
      );
    }
    try {
      const response = await axios.post(`${BASE_URL}/movies`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      toast.success("Movies created successfully");
      console.log(response.data);
      reset();
      router.push("/dashboard/movies");
      router.refresh();
    } catch (error) {
      console.error("Error creating movie:", error);
      toast.error("Failed to create movie");
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
                      {/* <div>
                        <Label htmlFor={`actor-image-${index}`}>
                          {t("Actor photo")}
                        </Label>
                        <Input
                          id={`actor-image-${index}`}
                          value={actor.image}
                          onChange={(e) =>
                            handleActorChange(index, "image", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Enter image URL"
                        />
                      </div> */}
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
              t("Create Movie")
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

export default MovieAdd;
