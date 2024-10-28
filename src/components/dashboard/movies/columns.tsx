"use client";

import { BASE_URL } from "@/api/Api";
import { Button } from "@/components/ui/button";
import { movies } from "@/lib/types";
import { formatReleaseDate } from "@/utils/dateFn";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import EditBtn from "../EditBtn";
import DeleteBtn from "./DeleteBtn";
import Image from "next/image";
import defaultImage from "@/assets/moviedefault.jpg";
import { Badge } from "@/components/ui/badge";
import ViewBtn from "./ViewBtn";

const handleDelete = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    console.log("movie deleted successfully");
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};

export const columns: ColumnDef<movies>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-mono">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageCover",
    header: "Poster",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Image
          src={row.getValue("imageCover") || defaultImage}
          alt={`${row.original.name}'s cover`}
          width={80}
          height={80}
          className="h-20 w-20 max-w-none rounded-xl object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.category?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags?.map((tag) => (
          <Badge key={tag._id} variant="secondary" className="text-xs">
            {tag.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "ratingsAverage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>
            {row.getValue("ratingsAverage")} ({row.original.ratingsQuantity})
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Details
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-sm">
          <span>{row.original.duration} min</span>
          <span className="text-xs text-gray-500">
            lang {row.original.language}
          </span>
          <span className="text-xs text-gray-500">
            subs {row.original.subtitles?.join(", ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "releaseDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release Date
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatReleaseDate(row.original.releaseDate)}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{formatReleaseDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const movieId = row.original._id;

      return (
        <div className="flex gap-2">
          <ViewBtn id={movieId} name="movies" />
          <EditBtn id={movieId} name="movies" />
          <DeleteBtn movieId={movieId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
