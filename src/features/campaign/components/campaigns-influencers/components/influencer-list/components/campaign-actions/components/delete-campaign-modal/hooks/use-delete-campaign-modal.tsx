import { deleteCampaignAction } from "@/features/campaign/actions/delete-campaign-action";
import { Description } from "@/features/campaign/components/create-campaign-drawer/hooks/use-create-campaign-drawer";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { useContext, useState } from "react";

type UseDeleteCampaignModal = {
  setIsDeleteCampaignOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteCampaignModal({
  setIsDeleteCampaignOpen,
}: UseDeleteCampaignModal) {
  const { campaignSelected, updateCampaigns, handleCampaignSelection } =
    useContext(CampainsInfluencersContext);

  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após a exclusão da campanha, os dados serão perdidos permanentemente. Deseja prosseguir?",
  });

  const handleDelete = async () => {
    try {
      if (campaignSelected) {
        const response = await deleteCampaignAction(campaignSelected?._id);

        if (response?.error) {
          throw new Error(response.message);
        }

        await updateCampaigns();
        await handleCampaignSelection();

        setIsDeleteCampaignOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  return { description, handleDelete };
}
