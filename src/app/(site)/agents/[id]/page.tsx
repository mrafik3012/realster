import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, BadgeCheck, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/utils";
import { getAgentById } from "@/lib/data/agents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const agent = await getAgentById(id);
  if (!agent) return { title: "Agent not found" };
  return { title: agent.name, description: agent.bio };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await getAgentById(id);
  if (!agent) notFound();

  const mailtoHref = `mailto:${agent.email}?subject=${encodeURIComponent(
    "Question for you on Realster"
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/agents"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All agents
      </Link>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start">
        <Avatar className="size-20">
          <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
            {initials(agent.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-foreground">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.title}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/90">{agent.bio}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BadgeCheck className="size-4" /> License #{agent.licenseNo}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <Button render={<a href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`} />} className="gap-2">
            <Phone className="size-4" />
            {agent.phone}
          </Button>
          <Button variant="outline" render={<a href={mailtoHref} />} className="gap-2">
            <Mail className="size-4" />
            Email
          </Button>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
          Listings from {agent.name.split(" ")[0]}
        </h2>
        {agent.properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agent.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No active listings right now.</p>
        )}
      </section>
    </div>
  );
}
