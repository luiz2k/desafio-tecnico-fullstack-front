import { influencer } from "../influencer/services/influencer";
import { campaign } from "./services/campaign";
import { CampaignCard } from "./components/campaign-card/campaign-card";
import { CreateCampaignDrawer } from "./components/create-campaign-drawer/create-campaign-drawer";

export async function Campaign() {
  const campaigns = await campaign.findAll();
  const influencers = await influencer.findAll();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold">Campanhas</h1>

        <CreateCampaignDrawer influencers={influencers.data} />
      </div>

      <div className="grid grid-cols-2">
        <div className="space-y-2">
          {campaigns.data?.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>

        <div>Influenciadores</div>
      </div>
    </>
  );
}
