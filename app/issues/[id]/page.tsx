import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();

  delay(2000);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt={"4"}>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
}