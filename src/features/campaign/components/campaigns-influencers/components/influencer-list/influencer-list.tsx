"use client";

import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { abbreviateNumber } from "@/utils/formatters";
import { useContext } from "react";
import { TableOptions } from "./components/table-options/table-options";

const TABLE_HEAD = ["Nome", "Rede Social", "Seguidores", "Ações"];

export function InfluencerList() {
  const { influencers, campaignSelected } = useContext(
    CampainsInfluencersContext,
  );

  return (
    <div>
      {campaignSelected ? (
        <>
          {influencers.length > 0 ? (
            <table className="w-full max-w-5xl">
              <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
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
            <p className="text-center">
              Nenhum influenciador foi adicionado a essa campanha
            </p>
          )}
        </>
      ) : (
        <p className="text-center">
          Selecione uma campanha para ver os influenciadores
        </p>
      )}
    </div>
  );
}
