"use client";

import { BASE_URL } from "@/api/Api";
import { Button } from "@/components/ui/button";
import { AdminUser } from "@/lib/types";
import { formatReleaseDate } from "@/utils/dateFn";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BadgeCheck, Check, ShieldX, X } from "lucide-react";
import Image from "next/image";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "../EditBtn";

const handleDelete = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const columns: ColumnDef<AdminUser>[] = [
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
    accessorKey: "profileImg",
    header: "Profile",
    cell: ({ row }) => (
      <Image
        src={row.getValue("profileImg") || "/placeholder-avatar.png"}
        alt={`${row.getValue("name")}'s profile`}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
    ),
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Email
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <a
        href={`mailto:${row.getValue("email")}`}
        className="text-blue-600 hover:underline"
      >
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span
        className={`${row.getValue("role") === "admin" ? "bg-[#FFE4DE] text-[#B71D18]" : "bg-[#DBF6E5] text-[#118D57]"} rounded-md px-2 py-1 text-sm`}
      >
        {row.getValue("role")}
      </span>
    ),
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
    cell: ({ row }) => (
      <span
        className={`${row.getValue("active") ? "bg-[#DBF6E5] text-[#118D57]" : "bg-[#FFE4DE] text-[#B71D18]"} text-center} text-xs`}
      >
        {row.getValue("active") ? (
          <Check className="mx-auto h-5 w-5" />
        ) : (
          <X className="mx-auto h-5 w-5" />
        )}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionStatus",
    header: "Subscription",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${
          row.getValue("subscriptionStatus") === "active"
            ? "bg-[#FFE4DE] text-[#118D57]"
            : "bg-[#FFE4DE] text-[#B71D18]"
        }`}
      >
        {row.getValue("subscriptionStatus")}
      </span>
    ),
  },
  {
    accessorKey: "isTrial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Trial
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span
        className={`${row.getValue("isTrial") ? "bg-[#DBF6E5] text-[#118D57]" : "bg-[#FFE4DE] text-[#B71D18]"} text-xs}`}
      >
        {row.getValue("isTrial") ? (
          <BadgeCheck className="mx-auto h-5 w-5" />
        ) : (
          <ShieldX className="mx-auto h-5 w-5" />
        )}
      </span>
    ),
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
      const userId = row.original._id;

      return (
        <div className="flex gap-2">
          <EditBtn id={userId} name="users" />
          <DeleteBtn userId={userId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
