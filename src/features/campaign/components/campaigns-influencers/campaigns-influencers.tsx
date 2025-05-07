import { CampaignList } from "./components/campaign-list/campaign-list";
import { InfluencerList } from "./components/influencer-list/influencer-list";

export function CampaignsInfluencers() {
  return (
    <div className="space-y-4 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:space-y-0">
      <CampaignList />

      <InfluencerList />
    </div>
  );
}
