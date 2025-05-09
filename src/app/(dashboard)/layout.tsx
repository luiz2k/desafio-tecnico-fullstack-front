import { Header } from "@/components/header/header";
import { auth } from "@/utils/auth";
import { RolesContextProvider } from "../../contexts/roles-context/roles-context";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await auth();

  return (
    <>
      <Header />

      <main className="mx-3.5 mb-3.5 pt-20">
        <div className="m-auto max-w-screen-lg">
          <RolesContextProvider roles={payload?.roles}>
            {children}
          </RolesContextProvider>
        </div>
      </main>
    </>
  );
}
