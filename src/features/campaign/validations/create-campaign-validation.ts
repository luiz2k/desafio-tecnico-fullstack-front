import { z } from "zod";
import { CampaignStatus } from "../enums/campaign-status-enum";
import { dateStringSchema } from "@/validations/date-string-validation";

export const createCampaignSchema = z.object({
  title: z
    .string({
      required_error: "Título obrigatório",
      invalid_type_error: "O título precisa ser uma string",
    })
    .min(3, { message: "Título muito curto, mínimo 3 caracteres" })
    .max(64, {
      message: "Título muito longo, máximo 64 caracteres",
    }),
  customer: z
    .string({
      required_error: "Cliente obrigatório",
      invalid_type_error: "O cliente precisa ser uma string",
    })
    .min(3, { message: "Cliente muito curto, mínimo 3 caracteres" })
    .max(64, {
      message: "Cliente muito longo, máximo 64 caracteres",
    }),
  startedAt: dateStringSchema,
  finishedAt: dateStringSchema,
  status: z.nativeEnum(CampaignStatus, {
    required_error: "Status obrigatório",
    invalid_type_error: "O status deve ser um valor válido",
  }),
});

export type CreateCampaignDto = z.infer<typeof createCampaignSchema>;

export const createCampaignParticipantSchema = z.object({
  campaign: createCampaignSchema,
  participants: z
    .array(z.string(), {
      invalid_type_error: "A lista de participantes deve ser um array",
    })
    .optional(),
});

export type CreateCampaignParticipantDto = z.infer<
  typeof createCampaignParticipantSchema
>;
