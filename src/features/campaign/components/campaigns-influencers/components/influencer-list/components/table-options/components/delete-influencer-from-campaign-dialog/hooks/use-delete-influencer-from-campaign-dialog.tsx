import { deleteParticipantAction } from "@/features/campaign/actions/delete-participant-action";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { TypographyProps } from "@material-tailwind/react";
import { useContext, useState } from "react";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

type UseDeleteInfluencerFromCampaignDialogProps = {
  setIsDeleteInfluencerFromCampaignDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};
export function useDeleteInfluencerFromCampaignDialog({
  setIsDeleteInfluencerFromCampaignDialogOpen,
}: UseDeleteInfluencerFromCampaignDialogProps) {
  const { listParticipants } = useContext(CampainsInfluencersContext);

  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Tem certeza que deseja excluir esse influenciador dessa campanha?",
  });

  const handleDelete = async (campaignId: string, influencerId: string) => {
    try {
      const response = await deleteParticipantAction(campaignId, influencerId);

      if (response?.error) {
        throw new Error(response.message);
      }

      listParticipants(campaignId);
      setIsDeleteInfluencerFromCampaignDialogOpen(false);
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
