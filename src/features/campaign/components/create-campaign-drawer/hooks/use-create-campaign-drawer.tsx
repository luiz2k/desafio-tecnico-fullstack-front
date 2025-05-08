import { findInfluencersAction } from "@/features/campaign/actions/find-influencers-action";
import { InfluencerFilter } from "@/features/influencer/services/influencer-filter-type";
import { Influencer } from "@/features/influencer/types/influencer-type";
import { TypographyProps } from "@material-tailwind/react";
import { useCallback, useState } from "react";

export type Description = {
  color: TypographyProps["color"];
  message: string;
};

export const initialDescription: Description = {
  color: "default",
  message: "Preencha o formulário abaixo para criar uma nova campanha",
};

export function useCreateCampaignDrawer() {
  const [description, setDescription] = useState(initialDescription);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isCreateInfluencerOpen, setIsCreateInfluencerOpen] = useState(false);

  const findInfluencers = useCallback(async (filter?: InfluencerFilter) => {
    const response = await findInfluencersAction(filter);

    if (response.data) {
      setInfluencers(response.data);
    }
  }, []);

  const openCreateCampaignDrawer = async () => {
    await findInfluencers();

    setIsCreateInfluencerOpen(true);
  };

  return {
    description,
    setDescription,
    influencers,
    isCreateInfluencerOpen,
    setIsCreateInfluencerOpen,
    findInfluencers,
    openCreateCampaignDrawer,
  };
}
