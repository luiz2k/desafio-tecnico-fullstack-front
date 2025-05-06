"use server";

import { revalidatePath } from "next/cache";
import { campaign } from "../services/campaign";
import { CreateCampaignParticipantDto } from "../validations/create-campaign-validation";

export async function createCampaignAction(data: CreateCampaignParticipantDto) {
  const response = await campaign.create(data);

  if (response.error) {
    return response;
  }

  revalidatePath("/campaign");
}
