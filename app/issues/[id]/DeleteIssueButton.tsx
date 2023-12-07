import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}> Delete Issues</Link>
    </Button>
  );
}
