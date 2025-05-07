"use client";

import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { abbreviateNumber } from "@/utils/formatters";
import { useContext } from "react";
import { TableOptions } from "./components/table-options/table-options";
import { Button, Typography } from "@material-tailwind/react";
import { DeleteCampaignModal } from "./components/delete-campaign-modal/delete-campaign-modal";

const TABLE_HEAD = ["Nome", "Rede Social", "Seguidores", "Ações"];

export function InfluencerList() {
  const { influencers, campaignSelected } = useContext(
    CampainsInfluencersContext,
  );

  return (
    <div>
      {campaignSelected ? (
        <div className="overflow-auto">
          <div className="flex justify-end gap-2.5 border-y bg-surface-light p-2.5">
            <Button size="sm">Atualizar</Button>
            <DeleteCampaignModal id={campaignSelected} />
          </div>

          {influencers.length > 0 ? (
            <table className="w-full max-w-5xl">
              <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="px-2.5 py-2 text-start font-medium"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="group text-sm text-black dark:text-white">
                {influencers?.map(
                  ({
                    campaign,
                    influencer: { _id, name, social_network, followers },
                  }) => (
                    <tr
                      key={_id}
                      className="border-b border-surface last:border-0"
                    >
                      <td className="p-3">{name}</td>
                      <td className="p-3">{social_network}</td>
                      <td className="p-3">
                        {abbreviateNumber.format(followers)}
                      </td>
                      <td className="w-0 px-4">
                        <TableOptions
                          campaignId={campaign}
                          influencerId={_id}
                          influencer={{
                            name,
                            social_network,
                            followers,
                          }}
                        />
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-center">
              Nenhum influenciador foi adicionado
            </p>
          )}
        </div>
      ) : (
        <div>
          <Typography
            as="div"
            className="mb-4 h-3 w-1/2 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>

          {Array.from({ length: 12 }).map((_, index) => (
            <Typography
              key={index}
              as="div"
              className="mb-2 h-2 w-full rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
}
