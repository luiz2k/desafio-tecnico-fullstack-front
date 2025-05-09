import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Loader, X } from "lucide-react";
import { useAddInfluencerModal } from "./hooks/use-add-influencer-modal";

type AddInfluencerModalProps = {
  isAddInfluencerOpen: boolean;
  setIsAddInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddInfluencerModal({
  isAddInfluencerOpen,
  setIsAddInfluencerOpen,
}: AddInfluencerModalProps) {
  const {
    description,
    influencers,
    participants,
    isLoading,
    isDisabled,
    handleUpdateInfluencers,
    handleInfluencerParticipant,
  } = useAddInfluencerModal({ setIsAddInfluencerOpen });

  return (
    <Dialog
      size="sm"
      open={isAddInfluencerOpen}
      onOpenChange={setIsAddInfluencerOpen}
    >
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Adicionando Influenciador</Typography>

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

          <div className="space-y-4">
            {isLoading ? (
              <>
                <Loader className="mx-auto animate-spin" />
              </>
            ) : (
              <div className="grid max-h-[15rem] grid-cols-2 gap-2 overflow-y-auto">
                {influencers.map((influencer) => (
                  <div key={influencer._id} className="flex gap-2">
                    <Checkbox
                      checked={participants.includes(influencer._id)}
                      id={influencer._id}
                      onChange={() =>
                        handleInfluencerParticipant(influencer._id)
                      }
                    >
                      <Checkbox.Indicator />
                    </Checkbox>
                    <label
                      htmlFor={influencer._id}
                      className="-translate-y-0.5 cursor-pointer"
                    >
                      <Typography className="font-semibold">
                        {influencer.name}
                      </Typography>
                      <Typography type="small" className="text-foreground">
                        @{influencer.social_network}
                      </Typography>
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-1 flex items-center justify-end gap-2">
              <Dialog.DismissTrigger as={Button} variant="ghost">
                Cancelar
              </Dialog.DismissTrigger>

              <Button
                color="error"
                disabled={isDisabled}
                onClick={handleUpdateInfluencers}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
