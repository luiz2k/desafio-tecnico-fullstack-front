import { Typography } from "@material-tailwind/react";

export function Skeleton() {
  return (
    <div>
      <Typography as="div" className="mb-4 h-3 w-1/2 rounded-full bg-gray-300">
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
  );
}
