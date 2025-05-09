import { useState } from "react";
import { UpdateCampaignModal } from "./components/update-campaign-modal/update-campaign-modal";
import { Button } from "@material-tailwind/react";
import { DeleteCampaignModal } from "./components/delete-campaign-modal/delete-campaign-modal";

export function CampaignActions() {
  const [isUpdateCampaignOpen, setIsUpdateCampaignOpen] = useState(false);
  const [isDeleteCampaignOpen, setIsDeleteCampaignOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2.5 border-y bg-surface-light p-2.5">
      <Button onClick={() => setIsUpdateCampaignOpen(true)}>Atualizar</Button>
      <Button color="error" onClick={() => setIsDeleteCampaignOpen(true)}>
        Deletar
      </Button>

      {isUpdateCampaignOpen && (
        <UpdateCampaignModal
          isUpdateCampaignOpen={isUpdateCampaignOpen}
          setIsUpdateCampaignOpen={setIsUpdateCampaignOpen}
        />
      )}

      {isDeleteCampaignOpen && (
        <DeleteCampaignModal
          isDeleteCampaignOpen={isDeleteCampaignOpen}
          setIsDeleteCampaignOpen={setIsDeleteCampaignOpen}
        />
      )}
    </div>
  );
}
