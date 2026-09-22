import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, UserCheck, KeyRound, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Realster",
  description: "What Realster is, how it works, and who it's built for.",
};

const steps = [
  {
    icon: Search,
    title: "Search the market",
    body: "Filter by city, price, property type, or bedroom count to find listings that match what you're actually looking for.",
  },
  {
    icon: UserCheck,
    title: "Reach the agent directly",
    body: "Every listing shows the licensed agent managing it, with a real phone number and email — not a routed lead form.",
  },
  {
    icon: ClipboardList,
    title: "Agents manage their own listings",
    body: "Agents log in, add property details and photos, and update pricing or status themselves — no back-office ticket needed.",
  },
  {
    icon: KeyRound,
    title: "Close the deal off-platform",
    body: "Realster is the discovery and contact layer. Tours, offers, and paperwork happen the way they always have, with your agent.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            A listing platform built around the agent, not around us.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Realster exists to do one thing well: connect people looking for
            a property with the licensed agent who can actually show it to
            them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/properties/1615873968403-89e068629265.jpg"
              alt="Bright living room in a Realster listing"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Why listings look different here
            </h2>
            <p className="text-foreground/90">
              Most search sites separate you from the person who actually
              knows the property — the listing gets forwarded, resold as a
              lead, or answered by whoever&apos;s on shift. On Realster, the
              agent who lists a property is the same person you call, text,
              or email straight from the listing page.
            </p>
            <p className="text-foreground/90">
              That also means agents are responsible for their own listings.
              If a price changes or a property goes under contract, the
              agent updates it themselves from their dashboard, so what you
              see is what&apos;s current.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground">
            How Realster works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
                <step.icon className="mb-3 size-6 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Are you a licensed agent?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Create a free account, verify your license number, and start
          listing. You control your own photos, pricing, and availability.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/register">
            <Button size="lg">Create agent account</Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Ask us a question
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
