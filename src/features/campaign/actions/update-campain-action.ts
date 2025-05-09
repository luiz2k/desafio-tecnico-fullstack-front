"use server";

import { campaign } from "../services/campaign";
import { UpdateCampaignDto } from "../validations/update-campaign-validation";

export async function updateCampainAction(id: string, data: UpdateCampaignDto) {
  const response = await campaign.update(id, data);

  return response;
}
