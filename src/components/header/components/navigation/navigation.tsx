import { Typography } from "@material-tailwind/react";
import { AtSign, Megaphone, User } from "lucide-react";

const links = [
  {
    icon: User,
    title: "Usuários",
    href: "/user",
  },
  {
    icon: Megaphone,
    title: "Campanhas",
    href: "/campaign",
  },
  {
    icon: AtSign,
    title: "Influenciadores",
    href: "/influencer",
  },
];

export function Navigation() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 md:mt-0 md:flex-row md:items-center">
      {links.map(({ icon: Icon, title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="small"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            <Icon className="h-4 w-4" />
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
