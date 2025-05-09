"use client";

import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { LogOut, Menu, X } from "lucide-react";
import * as React from "react";
import { Navigation } from "./components/navigation/navigation";
import { signOut } from "@/utils/sign-out";

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 w-full">
      <Navbar className="m-auto w-full max-w-screen-lg">
        <div className="flex items-center">
          <Typography
            as="a"
            href="#"
            type="small"
            className="ml-2 mr-2 block py-1 font-semibold"
          >
            Painel
          </Typography>

          <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark md:block" />

          <div className="hidden md:block">
            <Navigation />
          </div>

          <form action={signOut} className="hidden md:ml-auto md:block">
            <Button
              size="sm"
              variant="ghost"
              color="error"
              className="flex gap-2"
              type="submit"
            >
              <LogOut className="size-4" />
              Sair
            </Button>
          </form>

          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid md:hidden"
          >
            {openNav ? <X className="size-5" /> : <Menu className="size-5" />}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <Navigation />

          <form action={signOut}>
            <Button
              type="submit"
              isFullWidth
              size="sm"
              color="error"
              className="mt-4"
            >
              Sair
            </Button>
          </form>
        </Collapse>
      </Navbar>
    </header>
  );
}
