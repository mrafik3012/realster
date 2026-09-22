import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        We couldn&apos;t find that listing
      </h1>
      <p className="text-muted-foreground">
        It may have sold, been taken off the market, or the link might be
        out of date.
      </p>
      <Link href="/properties" className={buttonVariants({ variant: "default" })}>
        Browse all properties
      </Link>
    </div>
  );
}
