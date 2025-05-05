import { z } from "zod";
import { createInfluencerSchema } from "./create-influencer-validation";

export const updateInfluencerSchema = createInfluencerSchema.partial();

export type UpdateInfluencerDto = z.infer<typeof updateInfluencerSchema>;
