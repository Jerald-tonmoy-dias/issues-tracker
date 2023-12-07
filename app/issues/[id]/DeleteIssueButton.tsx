"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          Delete
          {/* <Pencil2Icon />
          <Link href={`/issues/${issueId}/edit`}> Delete Issues</Link> */}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete? This action can not tbe undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
