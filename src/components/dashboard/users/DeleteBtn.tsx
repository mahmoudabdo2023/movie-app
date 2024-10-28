import { useRouter } from "@/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type DeleteBtnProps = {
  userId: string;
  handleDelete: (id: string, token: string) => Promise<void>;
};

const DeleteBtn = ({ userId, handleDelete }: DeleteBtnProps) => {
  const t = useTranslations("dashboard");
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const onDelete = async () => {
    if (!session || !session.user?.token) {
      toast.error("Not authenticated");
      return;
    }

    setIsDeleting(true);
    toast.loading("Deleting user...", { id: "deleteUser" });

    try {
      await handleDelete(userId, session.user.token);
      toast.success("User deleted successfully", { id: "deleteUser" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", { id: "deleteUser" });
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      <Button
        className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600"
        size="sm"
        onClick={() => setShowConfirmDialog(true)}
        disabled={isDeleting}
      >
        <Trash className="h-4 w-4" />
        {isDeleting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          t("Delete")
        )}
      </Button>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader
            className={`${locale === "ar" && "sm:text-start"}`}
          >
            <AlertDialogTitle>
              {t("Are you sure you want to delete this user?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "This action cannot be undone This will permanently delete the user's account and remove their data from our servers",
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteBtn;
