import dynamic from "next/dynamic";
import React from "react";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_componets/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}
