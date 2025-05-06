"use client";

import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-2 p-2.5 text-center">
      <h2 className="text-xl font-bold">Algo deu errado!</h2>
      <Button onClick={() => reset()}>Tentar novamente</Button>
    </div>
  );
}
