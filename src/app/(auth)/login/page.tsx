import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Agent login",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Agent login</CardTitle>
          <CardDescription>Sign in to manage your property listings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            New agent?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Demo account — <span className="font-medium text-foreground">kavitha@realster.com</span>{" "}
          / <span className="font-medium text-foreground">Realster123!</span>
        </p>
      </div>
    </div>
  );
}
