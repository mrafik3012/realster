"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerAgent, type AuthActionState } from "@/actions/auth";

const initialState: AuthActionState = null;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAgent, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" required />
          {state?.fieldErrors?.name && (
            <p className="text-xs text-destructive">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="title">Title (optional)</Label>
          <Input id="title" name="title" placeholder="Listing Agent" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@realster.com" required />
        {state?.fieldErrors?.email && (
          <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="At least 8 characters" required />
        {state?.fieldErrors?.password && (
          <p className="text-xs text-destructive">{state.fieldErrors.password[0]}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="(555) 555-0100" required />
          {state?.fieldErrors?.phone && (
            <p className="text-xs text-destructive">{state.fieldErrors.phone[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="licenseNo">License number</Label>
          <Input id="licenseNo" name="licenseNo" placeholder="e.g. TX-RE-12345" required />
          {state?.fieldErrors?.licenseNo && (
            <p className="text-xs text-destructive">{state.fieldErrors.licenseNo[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Short bio (optional)</Label>
        <Textarea id="bio" name="bio" rows={3} placeholder="A sentence or two buyers will see on your profile." />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account..." : "Create agent account"}
      </Button>
    </form>
  );
}
