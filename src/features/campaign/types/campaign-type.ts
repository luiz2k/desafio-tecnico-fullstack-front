import { CampaignStatus } from "../enums/campaign-status-enum";

export type Campaign = {
  _id: string;
  title: string;
  customer: string;
  startedAt: string;
  finishedAt: string;
  status: CampaignStatus;
  __v: number;
};
