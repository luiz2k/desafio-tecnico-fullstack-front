import { http } from "@/lib/http-client";
import { CreateCampaignParticipantDto } from "../validations/create-campaign-validation";
import { Campaign } from "../types/campaign-type";

export const campaign = {
  async create(data: CreateCampaignParticipantDto) {
    return await http<Campaign>("/campaign", {
      method: "POST",
      body: data,
      headerAuthorization: true,
    });
  },

  async findAll() {
    return await http<Campaign[]>("/campaign", {
      method: "GET",
      headerAuthorization: true,
    });
  },

  async update() {},

  async delete() {},
};
