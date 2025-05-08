import { deleteCampaignAction } from "@/features/campaign/actions/delete-campaign-action";
import { Description } from "@/features/campaign/components/create-campaign-drawer/hooks/use-create-campaign-drawer";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useContext, useState } from "react";

type DeleteCampaignModalProps = {
  id: string;
};
export function DeleteCampaignModal({ id }: DeleteCampaignModalProps) {
  const { updateCampaigns, handleCampaignSelection } = useContext(
    CampainsInfluencersContext,
  );
  const [deleleCampaign, setDeleteCampaign] = useState(false);

  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após a exclusão da campanha, os dados serão perdidos permanentemente. Deseja prosseguir?",
  });

  const handleDelete = async () => {
    try {
      const response = await deleteCampaignAction(id);

      if (response?.error) {
        throw new Error(response.message);
      }

      await updateCampaigns();
      await handleCampaignSelection();

      setDeleteCampaign(false);
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
    <Dialog size="sm" open={deleleCampaign} onOpenChange={setDeleteCampaign}>
      <Dialog.Trigger
        as={Button}
        color="error"
        onClick={() => setDeleteCampaign(true)}
      >
        Deletar
      </Dialog.Trigger>

      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Excluindo Campanha</Typography>

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

            <Button color="error" onClick={handleDelete}>
              Confirmar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
