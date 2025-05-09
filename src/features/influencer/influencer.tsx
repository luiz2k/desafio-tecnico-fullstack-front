import { abbreviateNumber } from "@/utils/formatters";
import { CreateInfluencerDrawer } from "./components/create-influencer-drawer/create-influencer-drawer";
import { TableActions } from "./components/table-actions/table-actions";
import { influencer } from "./services/influencer";
import { hasRole } from "@/utils/has-role";
import { UserRole } from "../user/enums/user-role-enum";
import { auth } from "@/utils/auth";

const TABLE_HEAD = ["Nome", "Rede Social", "Seguidores", "Ações"];

export async function Influencer() {
  const influencers = await influencer.findAll();

  const payload = await auth();
  const hasAccess = hasRole(payload?.roles, [UserRole.ADMIN]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-sans text-lg font-bold text-inherit antialiased md:text-xl lg:text-2xl">
          Influenciadores
        </h1>

        {hasAccess && <CreateInfluencerDrawer />}
      </div>

      <div className="overflow-auto">
        <table className="w-full max-w-5xl">
          <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-2.5 py-2 text-start font-medium">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="group text-sm text-black dark:text-white">
            {influencers.data?.map(
              ({ _id, name, social_network, followers }) => (
                <tr key={_id} className="border-b border-surface last:border-0">
                  <td className="p-3">{name}</td>
                  <td className="p-3">{social_network}</td>
                  <td className="p-3">{abbreviateNumber.format(followers)}</td>
                  <td className="w-0 px-4">
                    <TableActions
                      id={_id}
                      influencer={{ name, social_network, followers }}
                    />
                  </td>
                </tr>
              ),
            )}

            {influencers.data?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center">
                  Nenhum influenciador cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
