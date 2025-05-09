"use client";

import { RolesContext } from "@/contexts/roles-context/roles-context";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { UserRole } from "@/features/user/enums/user-role-enum";
import { abbreviateNumber } from "@/utils/formatters";
import { hasRole } from "@/utils/has-role";
import { useContext } from "react";
import { CampaignActions } from "./components/campaign-actions/campaign-actions";
import { Skeleton } from "./components/skeleton/skeleton";
import { TableOptions } from "./components/table-options/table-options";

const TABLE_HEAD = ["Nome", "Rede Social", "Seguidores", "Ações"];

export function InfluencerList() {
  const { roles } = useContext(RolesContext);
  const hasAccess = hasRole(roles, [UserRole.ADMIN]);

  const { influencers, campaignSelected } = useContext(
    CampainsInfluencersContext,
  );

  return (
    <div>
      {campaignSelected ? (
        <div className="overflow-auto">
          <CampaignActions />

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
                        {hasAccess && (
                          <TableOptions
                            campaignId={campaign}
                            influencerId={_id}
                            influencer={{
                              name,
                              social_network,
                              followers,
                            }}
                          />
                        )}
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
        <Skeleton />
      )}
    </div>
  );
}
