import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingIssuePage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap={"4"} my={"2"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose" mt={"4"}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
