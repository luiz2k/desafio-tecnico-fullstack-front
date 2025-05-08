"use client";

import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { CreateCampaignDrawerForm } from "./components/create-campaign-drawer-form/create-campaign-drawer-form";
import { useCreateCampaignDrawer } from "./hooks/use-create-campaign-drawer";

export function CreateCampaignDrawer() {
  const {
    description,
    setDescription,
    influencers,
    isCreateInfluencerOpen,
    setIsCreateInfluencerOpen,
    findInfluencers,
    openCreateCampaignDrawer,
  } = useCreateCampaignDrawer();

  return (
    <Drawer
      open={isCreateInfluencerOpen}
      onOpenChange={setIsCreateInfluencerOpen}
    >
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => openCreateCampaignDrawer()}
      >
        Criar Campanha
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
            <Typography type="h5">Criando Campanha</Typography>

            <Typography
              type="small"
              color={description.color}
              className="mb-6 mt-4"
            >
              {description.message}
            </Typography>
          </div>

          <CreateCampaignDrawerForm
            setIsCreateInfluencerOpen={setIsCreateInfluencerOpen}
            setDescription={setDescription}
            influencers={influencers}
            findInfluencers={findInfluencers}
          />
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
}
