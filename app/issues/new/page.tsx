"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
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

type IssueForm = z.infer<typeof createIssuesSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setisSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setisSubmitting(false);
            setError("An unexpected error occured");
            // console.log(error);
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessages>{errors.title?.message}</ErrorMessages>
        <Controller
          name="description"
          control={control}
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
