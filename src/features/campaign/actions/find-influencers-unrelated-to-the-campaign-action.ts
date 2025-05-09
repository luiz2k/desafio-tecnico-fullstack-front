"use server";

import { influencer } from "@/features/influencer/services/influencer";

export async function findInfluencersUnrelatedToTheCampaignAction(id: string) {
  return await influencer.findInfluencersUnrelatedToTheCampaign(id);
}
