import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AgentNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        We couldn&apos;t find that agent
      </h1>
      <p className="text-muted-foreground">
        They may no longer be active on Realster.
      </p>
      <Link href="/agents" className={buttonVariants({ variant: "default" })}>
        Browse all agents
      </Link>
    </div>
  );
}
