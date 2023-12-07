import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function IssueAction() {
  return (
    <div>
      <Button className="mb-5">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
