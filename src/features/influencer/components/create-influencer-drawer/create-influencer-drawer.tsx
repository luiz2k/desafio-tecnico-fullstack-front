"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  IconButton,
  Input,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createInfluencerAction } from "../../actions/create-influencer-action";
import {
  CreateInfluencerDto,
  createInfluencerSchema,
} from "../../validations/create-influencer-validation";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

export function CreateInfluencerDrawer() {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message: "Preencha o formulário abaixo para criar um novo influenciador",
  });

  const [createInfluencer, setCreateInfluencer] = useState(false);

  const form = useForm<CreateInfluencerDto>({
    resolver: zodResolver(createInfluencerSchema),
  });

  const onSubmit = async (data: CreateInfluencerDto) => {
    try {
      const response = await createInfluencerAction(data);

      if (response?.error) {
        throw new Error(response.message);
      }

      form.reset();

      setCreateInfluencer(false);

      setDescription({
        color: "default",
        message:
          "Preencha o formulário abaixo para criar um novo influenciador",
      });
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
    <Drawer open={createInfluencer} onOpenChange={setCreateInfluencer}>
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => setCreateInfluencer(true)}
      >
        Criar Influenciador
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left">
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Criando Influenciador</Typography>
            <Drawer.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <X className="h-5 w-5" />
            </Drawer.DismissTrigger>
          </div>
          <Typography
            type="small"
            color={description.color}
            className="mb-6 mt-4"
          >
            {description.message}
          </Typography>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <Input
                type="text"
                placeholder="Nome"
                {...form.register("name")}
              />

              {form.formState.errors.name && (
                <Typography type="small" color="error">
                  {form.formState.errors.name.message}
                </Typography>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Rede Social"
                {...form.register("social_network")}
              />

              {form.formState.errors.social_network && (
                <Typography type="small" color="error">
                  {form.formState.errors.social_network.message}
                </Typography>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Seguidores"
                {...form.register("followers")}
              />

              {form.formState.errors.followers && (
                <Typography type="small" color="error">
                  {form.formState.errors.followers.message}
                </Typography>
              )}
            </div>

            <Button
              isFullWidth
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Criar
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
}
