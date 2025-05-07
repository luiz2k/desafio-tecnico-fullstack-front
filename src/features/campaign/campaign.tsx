import { CampaignsInfluencers } from "./components/campaigns-influencers/campaigns-influencers";
import { CreateCampaignDrawer } from "./components/create-campaign-drawer/create-campaign-drawer";
import { CampainsInfluencersContextProvider } from "./context/campains-influencers-context/campains-influencers-context";
import { campaign } from "./services/campaign";

export async function Campaign() {
  const campaigns = await campaign.findAll();

  return (
    <CampainsInfluencersContextProvider campaigns={campaigns.data}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Campanhas</h1>

        <CreateCampaignDrawer />
      </div>

      <CampaignsInfluencers />
    </CampainsInfluencersContextProvider>
  );
}
