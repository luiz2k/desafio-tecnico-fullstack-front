import { Header } from "@/components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="mx-3.5 mb-3.5 pt-20">
        <div className="m-auto max-w-screen-lg">{children}</div>
      </main>
    </>
  );
}
