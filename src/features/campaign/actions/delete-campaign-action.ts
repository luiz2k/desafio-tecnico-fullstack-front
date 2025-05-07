"use server";

import { campaign } from "../services/campaign";

export async function deleteCampaignAction(id: string) {
  const response = await campaign.delete(id);

  return response;
}
