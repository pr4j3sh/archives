import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

export default function Auth() {
  const { signIn, signOut } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    void signIn("resend-otp", values).then(() =>
      setStep({ email: values.email as string }),
    );
  }

  return step === "signIn" ? (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send code</Button>
        </form>
      </Form>
      <div className="space-y-8 flex flex-col">
        <Button onClick={() => void signOut()}>Sign out</Button>
        <Button onClick={() => void signIn("google")}>
          Sign in with Google
        </Button>
        <Button onClick={() => void signIn("github")}>
          Sign in with GitHub
        </Button>
      </div>
    </>
  ) : (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("resend-otp", formData);
      }}
    >
      <Input name="code" placeholder="Code" type="text" />
      <Input name="email" value={step.email} type="hidden" />
      <Button type="submit">Continue</Button>
      <Button type="button" onClick={() => setStep("signIn")}>
        Cancel
      </Button>
    </form>
  );
}
