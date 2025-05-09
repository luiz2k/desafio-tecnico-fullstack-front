import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useDeleteCampaignModal } from "./hooks/use-delete-campaign-modal";

type DeleteCampaignModalProps = {
  isDeleteCampaignOpen: boolean;
  setIsDeleteCampaignOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteCampaignModal({
  isDeleteCampaignOpen,
  setIsDeleteCampaignOpen,
}: DeleteCampaignModalProps) {
  const { description, handleDelete } = useDeleteCampaignModal({
    setIsDeleteCampaignOpen,
  });

  return (
    <Dialog
      size="sm"
      open={isDeleteCampaignOpen}
      onOpenChange={setIsDeleteCampaignOpen}
    >
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
