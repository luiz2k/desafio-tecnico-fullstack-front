"use client";

import { deleteInfluencerAction } from "@/features/influencer/actions/delete-influencer-action";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";

type DeleteInfluencerDialogProps = {
  id: string;
  deleteInfluencer: boolean;
  setDeleteInfluencer: React.Dispatch<React.SetStateAction<boolean>>;
};

type Description = {
  color: TypographyProps["color"];
  message: string;
};

export function DeleteInfluencerDialog({
  id,
  deleteInfluencer,
  setDeleteInfluencer,
}: DeleteInfluencerDialogProps) {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após a exclusão, os dados do influenciador serão perdidos permanentemente. Deseja prosseguir?",
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteInfluencerAction(id);

      if (response?.error) {
        throw new Error(response.message);
      }

      setDeleteInfluencer(false);
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  return (
    <Dialog
      size="sm"
      open={deleteInfluencer}
      onOpenChange={setDeleteInfluencer}
    >
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Excluindo influenciador</Typography>

            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <X className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>

          <Typography color={description.color} className="mb-6 mt-2">
            {description.message}
          </Typography>

          <div className="mb-1 flex items-center justify-end gap-2">
            <Dialog.DismissTrigger as={Button} variant="ghost">
              Cancelar
            </Dialog.DismissTrigger>

            <Button color="error" onClick={() => handleDelete(id)}>
              Confirmar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
