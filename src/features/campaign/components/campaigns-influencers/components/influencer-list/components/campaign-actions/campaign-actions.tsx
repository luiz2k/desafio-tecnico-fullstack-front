import { useContext, useState } from "react";
import { UpdateCampaignModal } from "./components/update-campaign-modal/update-campaign-modal";
import { Button } from "@material-tailwind/react";
import { DeleteCampaignModal } from "./components/delete-campaign-modal/delete-campaign-modal";
import { AddInfluencerModal } from "./components/add-influencer-modal/add-influencer-modal";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";

export function CampaignActions() {
  const { adminRole } = useContext(CampainsInfluencersContext);

  const [isAddInfluencerOpen, setIsAddInfluencerOpen] = useState(false);
  const [isUpdateCampaignOpen, setIsUpdateCampaignOpen] = useState(false);
  const [isDeleteCampaignOpen, setIsDeleteCampaignOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2.5 border-y bg-surface-light p-2.5">
      <Button onClick={() => setIsAddInfluencerOpen(true)}>
        Adicionar Influenciador
      </Button>

      {isAddInfluencerOpen && (
        <AddInfluencerModal
          isAddInfluencerOpen={isAddInfluencerOpen}
          setIsAddInfluencerOpen={setIsAddInfluencerOpen}
        />
      )}

      <Button onClick={() => setIsUpdateCampaignOpen(true)}>Atualizar</Button>

      {isUpdateCampaignOpen && (
        <UpdateCampaignModal
          isUpdateCampaignOpen={isUpdateCampaignOpen}
          setIsUpdateCampaignOpen={setIsUpdateCampaignOpen}
        />
      )}

      {adminRole && isDeleteCampaignOpen && (
        <>
          <Button color="error" onClick={() => setIsDeleteCampaignOpen(true)}>
            Deletar
          </Button>

          {isDeleteCampaignOpen && (
            <DeleteCampaignModal
              isDeleteCampaignOpen={isDeleteCampaignOpen}
              setIsDeleteCampaignOpen={setIsDeleteCampaignOpen}
            />
          )}
        </>
      )}
    </div>
  );
}
