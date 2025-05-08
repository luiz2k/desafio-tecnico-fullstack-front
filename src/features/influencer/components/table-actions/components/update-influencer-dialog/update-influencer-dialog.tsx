"use client";

import { Influencer } from "@/features/influencer/types/influencer-type";
import {
  Button,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useUpdateInfluencerDialog } from "./hooks/use-update-influencer-dialog";

type UpdateInfluencerDialogProps = {
  id: string;
  influencer: Omit<Influencer, "_id" | "__v">;
  isUpdateInfluencerOpen: boolean;
  setIsUpdateInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateInfluencerDialog({
  id,
  influencer,
  isUpdateInfluencerOpen,
  setIsUpdateInfluencerOpen,
}: UpdateInfluencerDialogProps) {
  const { form, description, handleUpdate, renderError, isLoading } =
    useUpdateInfluencerDialog({
      id,
      influencer,
      setIsUpdateInfluencerOpen,
    });

  return (
    <Dialog
      size="sm"
      open={isUpdateInfluencerOpen}
      onOpenChange={setIsUpdateInfluencerOpen}
    >
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Atualizando influenciador</Typography>

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

          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <div>
              <Input placeholder="Nome" {...form.register("name")} />
              {renderError("name")}
            </div>
            <div>
              <Input
                placeholder="Rede Social"
                {...form.register("social_network")}
              />
              {renderError("social_network")}
            </div>
            <div>
              <Input placeholder="Seguidores" {...form.register("followers")} />
              {renderError("followers")}
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <Dialog.DismissTrigger as={Button} variant="ghost">
                Cancelar
              </Dialog.DismissTrigger>

              <Button color="error" disabled={isLoading} type="submit">
                Atualizar
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
