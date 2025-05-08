import CreateUserDrawer from "./components/create-user-drawer/create-user-drawer";
import { TableOptions } from "./components/table-options/table-options";
import { user } from "./services/user";

const TABLE_HEAD = ["E-mail", "Papel", "Ações"];

export async function User() {
  const users = await user.findAll();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-sans text-lg font-bold text-inherit antialiased md:text-xl lg:text-2xl">
          Usuários
        </h1>

        <CreateUserDrawer />
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
            {users.data?.map(({ _id, email, roles }, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-surface last:border-0"
                >
                  <td className="p-3">{email}</td>
                  <td className="p-3">{roles.join(", ")}</td>
                  <td className="w-0 px-4">
                    <TableOptions id={_id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
