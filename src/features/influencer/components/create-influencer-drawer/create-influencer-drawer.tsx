"use client";

import {
  Button,
  Drawer,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useCreateInfluencerDrawer } from "./hooks/use-create-influencer-drawer";

export function CreateInfluencerDrawer() {
  const {
    description,
    drawerIsOpen,
    setDrawerIsOpen,
    form,
    onSubmit,
    renderError,
  } = useCreateInfluencerDrawer();

  return (
    <Drawer open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => setDrawerIsOpen(true)}
      >
        Criar Influenciador
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left" className="overflow-y-auto">
          <Drawer.DismissTrigger
            as={IconButton}
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-1.5 top-1.5"
            isCircular
          >
            <X className="size-5" />
          </Drawer.DismissTrigger>

          <div>
            <Typography type="h5">Criando Influenciador</Typography>

            <Typography
              type="small"
              color={description.color}
              className="mb-6 mt-4"
            >
              {description.message}
            </Typography>
          </div>

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

              {renderError("name")}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Rede Social"
                {...form.register("social_network")}
              />

              {renderError("social_network")}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Seguidores"
                {...form.register("followers")}
              />

              {renderError("followers")}
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
