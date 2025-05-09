import { hasRole } from "@/utils/hasRole";
import { CampaignsInfluencers } from "./components/campaigns-influencers/campaigns-influencers";
import { CreateCampaignDrawer } from "./components/create-campaign-drawer/create-campaign-drawer";
import { CampainsInfluencersContextProvider } from "./context/campains-influencers-context/campains-influencers-context";
import { campaign } from "./services/campaign";
import { UserRole } from "../user/enums/user-role-enum";

export async function Campaign() {
  const campaigns = await campaign.findAll();
  const adminRole = await hasRole([UserRole.ADMIN]);

  return (
    <CampainsInfluencersContextProvider
      campaigns={campaigns.data}
      adminRole={adminRole}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-sans text-lg font-bold text-inherit antialiased md:text-xl lg:text-2xl">
          Campanhas
        </h1>

        {adminRole && <CreateCampaignDrawer />}
      </div>

      <CampaignsInfluencers />
    </CampainsInfluencersContextProvider>
  );
}
