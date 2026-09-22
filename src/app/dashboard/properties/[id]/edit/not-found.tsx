import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function EditPropertyNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h1 className="font-heading text-xl font-bold text-foreground">
        We couldn&apos;t find that listing
      </h1>
      <p className="text-muted-foreground">
        It may not exist, or it might belong to a different agent account.
      </p>
      <Link href="/dashboard/properties" className={buttonVariants({ variant: "default" })}>
        Back to my listings
      </Link>
    </div>
  );
}
