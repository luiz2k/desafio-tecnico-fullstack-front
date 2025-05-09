import { auth } from "@/utils/auth";
import { hasRole } from "@/utils/has-role";
import { UserRole } from "../user/enums/user-role-enum";
import { CampaignsInfluencers } from "./components/campaigns-influencers/campaigns-influencers";
import { CreateCampaignDrawer } from "./components/create-campaign-drawer/create-campaign-drawer";
import { CampainsInfluencersContextProvider } from "./context/campains-influencers-context/campains-influencers-context";
import { campaign } from "./services/campaign";

export async function Campaign() {
  const campaigns = await campaign.findAll();

  const payload = await auth();
  const hasAccess = hasRole(payload?.roles, [UserRole.ADMIN]);

  return (
    <CampainsInfluencersContextProvider campaigns={campaigns.data}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-sans text-lg font-bold text-inherit antialiased md:text-xl lg:text-2xl">
          Campanhas
        </h1>

        {hasAccess && <CreateCampaignDrawer />}
      </div>

      <CampaignsInfluencers />
    </CampainsInfluencersContextProvider>
  );
}
