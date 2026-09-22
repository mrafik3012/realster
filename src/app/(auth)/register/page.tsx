import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Create agent account",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create your agent account</CardTitle>
          <CardDescription>
            Free to join. You&apos;ll be able to list and manage properties
            right after signing up.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
