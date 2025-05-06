"use server";

import { participant } from "../services/participant";

export async function findParticipantsByCampaignIdAction(id: string) {
  return await participant.findByCampaignId(id);
}
