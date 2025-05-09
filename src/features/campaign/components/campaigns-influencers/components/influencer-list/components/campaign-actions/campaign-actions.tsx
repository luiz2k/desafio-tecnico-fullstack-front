import { useState } from "react";
import { UpdateCampaignModal } from "./components/update-campaign-modal/update-campaign-modal";
import { Button } from "@material-tailwind/react";

export function CampaignActions() {
  const [isUpdateCampaignOpen, setIsUpdateCampaignOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2.5 border-y bg-surface-light p-2.5">
      <Button onClick={() => setIsUpdateCampaignOpen(true)}>Atualizar</Button>

      {isUpdateCampaignOpen && (
        <UpdateCampaignModal
          isUpdateCampaignOpen={isUpdateCampaignOpen}
          setIsUpdateCampaignOpen={setIsUpdateCampaignOpen}
        />
      )}

      {/* <DeleteCampaignModal id={campaignSelected} /> */}
    </div>
  );
}
