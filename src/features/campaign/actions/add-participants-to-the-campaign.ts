"use server";

import { participant } from "../services/participant";

export async function addParticipantsToTheCampaignAction(
  campaignId: string,
  participants: string[],
) {
  return await participant.createMany(campaignId, participants);
}
