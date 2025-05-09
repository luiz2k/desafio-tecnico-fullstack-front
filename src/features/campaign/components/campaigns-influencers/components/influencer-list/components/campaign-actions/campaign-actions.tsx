import { RolesContext } from "@/contexts/roles-context/roles-context";
import { UserRole } from "@/features/user/enums/user-role-enum";
import { hasRole } from "@/utils/has-role";
import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AddInfluencerModal } from "./components/add-influencer-modal/add-influencer-modal";
import { DeleteCampaignModal } from "./components/delete-campaign-modal/delete-campaign-modal";
import { UpdateCampaignModal } from "./components/update-campaign-modal/update-campaign-modal";

export function CampaignActions() {
  const { roles } = useContext(RolesContext);
  const hasAccess = hasRole(roles, [UserRole.ADMIN]);

  const [isAddInfluencerOpen, setIsAddInfluencerOpen] = useState(false);
  const [isUpdateCampaignOpen, setIsUpdateCampaignOpen] = useState(false);
  const [isDeleteCampaignOpen, setIsDeleteCampaignOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2.5 border-y bg-surface-light p-2.5">
      {hasAccess && (
        <>
          <Button onClick={() => setIsAddInfluencerOpen(true)}>
            Adicionar Influenciador
          </Button>

          {isAddInfluencerOpen && (
            <AddInfluencerModal
              isAddInfluencerOpen={isAddInfluencerOpen}
              setIsAddInfluencerOpen={setIsAddInfluencerOpen}
            />
          )}
        </>
      )}

      <Button onClick={() => setIsUpdateCampaignOpen(true)}>Atualizar</Button>

      {isUpdateCampaignOpen && (
        <UpdateCampaignModal
          isUpdateCampaignOpen={isUpdateCampaignOpen}
          setIsUpdateCampaignOpen={setIsUpdateCampaignOpen}
        />
      )}

      {hasAccess && (
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
