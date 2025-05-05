import { z } from "zod";
import { createCampaignSchema } from "./create-campaign-validation";

export const updateCampaignSchema = createCampaignSchema.partial();

export type UpdateCampaignDto = z.infer<typeof updateCampaignSchema>;
