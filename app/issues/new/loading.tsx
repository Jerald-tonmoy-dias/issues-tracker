import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

export default function LoadingNewPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
