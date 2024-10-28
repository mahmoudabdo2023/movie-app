"use client";

import { BASE_URL } from "@/api/Api";
import { Button } from "@/components/ui/button";
import { subscription } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import EditBtn from "../EditBtn";
import DeleteBtn from "./DeleteBtn";

const handleDelete = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete subscription");
    }

    console.log("Subscription deleted successfully");
  } catch (error) {
    console.error("Error deleting subscription:", error);
  }
};

export const columns: ColumnDef<subscription>[] = [
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
          Title
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "priceAfterDiscount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price After Discount
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-mono">{row.original.duration} days</span>;
    },
  },
  {
    accessorKey: "features",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Features
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "usersCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users Count
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="mx-auto flex w-fit items-center font-mono">
          {row.original.active ? (
            <div className="w-fit rounded-full bg-green-100 p-1">
              <Check color="#16a34a" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="w-fit rounded-full bg-red-100 p-1">
              <X color="#ef4444" strokeWidth={1.5} />
            </div>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "freeTrialAvailable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Free Trial Available
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="mx-auto flex w-fit items-center font-mono">
          {row.original.freeTrialAvailable ? (
            <div className="w-fit rounded-full bg-green-100 p-1">
              <Check color="#16a34a" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="w-fit rounded-full bg-red-100 p-1">
              <X color="#ef4444" strokeWidth={1.5} />
            </div>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "trialDuration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trial Duration
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subscriptionId = row.original._id;

      return (
        <div className="flex gap-2">
          {/* <ViewBtn id={movieId} name="movies" /> */}
          <EditBtn id={subscriptionId} name="subscriptions" />
          <DeleteBtn
            subscriptionId={subscriptionId}
            handleDelete={handleDelete}
          />
        </div>
      );
    },
  },
];
