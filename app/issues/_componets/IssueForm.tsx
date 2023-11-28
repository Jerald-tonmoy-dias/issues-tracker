"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessages from "@/app/components/ErrorMessages";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueFormData = z.infer<typeof createIssuesSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssuesSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  // on submit
  const onSubmit = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setisSubmitting(false);
      setError("An unexpected error occured");
      // console.log(error);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessages>{errors.title?.message}</ErrorMessages>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessages>{errors.description?.message}</ErrorMessages>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
}
