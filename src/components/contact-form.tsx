"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { submitContactMessage, type ContactActionState } from "@/actions/contact";

const initialState: ContactActionState = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state?.ok) {
    return (
      <Alert className="border-primary/30 bg-primary/5">
        <CheckCircle2 className="size-4 text-primary" />
        <AlertTitle>Message sent</AlertTitle>
        <AlertDescription>
          Thanks for reaching out — we&apos;ll get back to you shortly. (This
          is a demo form; messages aren&apos;t emailed anywhere yet.)
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" placeholder="Jane Doe" required />
        {state?.fieldErrors?.name && (
          <p className="text-xs text-destructive">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        {state?.fieldErrors?.email && (
          <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you looking for?"
          required
        />
        {state?.fieldErrors?.message && (
          <p className="text-xs text-destructive">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
