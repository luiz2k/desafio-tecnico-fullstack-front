import { influencer } from "../influencer/services/influencer";
import { CampaignList } from "./components/campaign-list/campaign-list";
import { CreateCampaignDrawer } from "./components/create-campaign-drawer/create-campaign-drawer";
import { campaign } from "./services/campaign";

export async function Campaign() {
  const campaigns = await campaign.findAll();
  const influencers = await influencer.findAll();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold">Campanhas</h1>

        <CreateCampaignDrawer influencers={influencers.data} />
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <CampaignList campaigns={campaigns.data} />

        <div>Influenciadores</div>
      </div>
    </>
  );
}
