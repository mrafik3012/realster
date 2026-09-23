import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";
import { getAgents } from "@/lib/data/agents";

export const metadata: Metadata = {
  title: "Find an agent",
  description: "Meet the licensed agents listing properties on Realster.",
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Coimbatore land agents
        </h1>
        <p className="mt-2 text-muted-foreground">
          Every parcel on Realster is managed by the agent below — reach
          the person who actually holds the listing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.id}`}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-14">
                <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                  {initials(agent.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-heading font-semibold text-foreground">{agent.name}</p>
                <p className="text-sm text-muted-foreground">{agent.title}</p>
              </div>
            </div>
            <p className="line-clamp-3 text-sm text-muted-foreground">{agent.bio}</p>
            <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3 text-sm text-foreground/80">
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" /> {agent.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> {agent.email}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <BadgeCheck className="size-3.5" /> {agent._count.properties}{" "}
                {agent._count.properties === 1 ? "active listing" : "active listings"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
