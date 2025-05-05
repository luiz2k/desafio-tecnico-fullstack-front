"use client";

import { updateInfluencerAction } from "@/features/influencer/actions/update-influencer-action";
import { Influencer } from "@/features/influencer/types/influencer-type";
import {
  UpdateInfluencerDto,
  updateInfluencerSchema,
} from "@/features/influencer/validations/update-influencer-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  IconButton,
  Input,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UpdateInfluencerDialogProps = {
  id: string;
  influencer: Omit<Influencer, "_id" | "__v">;
  updateInfluencer: boolean;
  setUpdateInfluencer: React.Dispatch<React.SetStateAction<boolean>>;
};

type Description = {
  color: TypographyProps["color"];
  message: string;
};

export function UpdateInfluencerDialog({
  id,
  influencer,
  updateInfluencer,
  setUpdateInfluencer,
}: UpdateInfluencerDialogProps) {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após a atualização, os dados anteriores do influenciador serão perdidos permanentemente. Deseja prosseguir?",
  });

  const form = useForm<UpdateInfluencerDto>({
    resolver: zodResolver(updateInfluencerSchema),
    defaultValues: {
      name: influencer.name,
      social_network: influencer.social_network,
      followers: influencer.followers,
    },
  });

  const handleUpdate = async (data: UpdateInfluencerDto) => {
    try {
      const response = await updateInfluencerAction(id, data);

      if (response?.error) {
        throw new Error(response.message);
      }

      setUpdateInfluencer(false);

      form.reset({
        name: data.name,
        social_network: data.social_network,
        followers: data.followers,
      });

      setDescription({
        color: "default",
        message:
          "Após a atualização, os dados anteriores do influenciador serão perdidos permanentemente. Deseja prosseguir?",
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMsg = String(error.message);

        setDescription({
          color: "error",
          message: errorMsg,
        });
      }
    }
  };

  return (
    <Dialog
      size="sm"
      open={updateInfluencer}
      onOpenChange={setUpdateInfluencer}
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
              {form.formState.errors.name && (
                <Typography color="error">
                  {form.formState.errors.name.message}
                </Typography>
              )}
            </div>
            <div>
              <Input
                placeholder="Rede Social"
                {...form.register("social_network")}
              />
              {form.formState.errors.social_network && (
                <Typography color="error">
                  {form.formState.errors.social_network.message}
                </Typography>
              )}
            </div>
            <div>
              <Input placeholder="Seguidores" {...form.register("followers")} />
              {form.formState.errors.followers && (
                <Typography color="error">
                  {form.formState.errors.followers.message}
                </Typography>
              )}
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <Dialog.DismissTrigger as={Button} variant="ghost">
                Cancelar
              </Dialog.DismissTrigger>

              <Button color="error" type="submit">
                Atualizar
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
