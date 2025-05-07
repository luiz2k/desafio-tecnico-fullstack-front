"use server";

import { campaign, Filter } from "../services/campaign";

export async function findCampaignsAction(filter?: Filter) {
  return await campaign.findAll(filter);
}
