"use server";

import { revalidatePath } from "next/cache";
import { participant } from "../services/participant";

export async function deleteParticipantAction(
  campaignId: string,
  influencerId: string,
) {
  const response = await participant.delete(campaignId, influencerId);

  if (response.error) {
    return response;
  }

  revalidatePath("/campaign");
}
