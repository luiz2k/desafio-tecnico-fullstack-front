"use client";

import { Influencer } from "@/features/influencer/types/influencer-type";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { DrawerFom } from "./components/drawer-fom/drawer-fom";
import { findInfluencersAction } from "../../actions/find-influencers-action";
import { InfluencerFilter } from "@/features/influencer/services/influencer";

export type Description = {
  color: TypographyProps["color"];
  message: string;
};

export function CreateCampaignDrawer() {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message: "Preencha o formulário abaixo para criar uma nova campanha",
  });

  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  const [createInfluencer, setCreateInfluencer] = useState(false);

  const findInfluencers = useCallback(async (filter?: InfluencerFilter) => {
    const response = await findInfluencersAction(filter);

    if (response.error) {
      console.error(response.message);
    }

    if (response.data) {
      setInfluencers(response.data);
    }
  }, []);

  const openCreateCampaignDrawer = async () => {
    await findInfluencers();

    setCreateInfluencer(true);
  };

  return (
    <Drawer open={createInfluencer} onOpenChange={setCreateInfluencer}>
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => openCreateCampaignDrawer()}
      >
        Criar Campanha
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left">
          <div className="flex items-center justify-between gap-4">
            <Typography type="h5">Criando Campanha</Typography>
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

          <DrawerFom
            setCreateInfluencer={setCreateInfluencer}
            setDescription={setDescription}
            influencers={influencers}
            findInfluencers={findInfluencers}
          />
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
}
