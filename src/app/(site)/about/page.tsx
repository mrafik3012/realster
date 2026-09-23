import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LandPlot, UserCheck, KeyRound, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Realster",
  description: "A Coimbatore land marketplace — plots, farms, and industrial parcels.",
};

const steps = [
  {
    icon: LandPlot,
    title: "Search land first",
    body: "Filter by locality and type — residential plots, agricultural land, farms, industrial or commercial parcels around Coimbatore.",
  },
  {
    icon: ScrollText,
    title: "Read the parcel, not the brochure",
    body: "Extent in cents or acres, road frontage, water, DTCP or LPA status, and the survey number sit on the listing.",
  },
  {
    icon: UserCheck,
    title: "Call the listing agent",
    body: "The licensed agent who entered the listing is the person you reach. No call-centre hop.",
  },
  {
    icon: KeyRound,
    title: "Close the usual way",
    body: "Tours, token, and registration happen with your agent and advocate. Realster is the discovery layer.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="survey-grid border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            A Coimbatore land desk, not a national house portal.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Realster is based in Coimbatore, Tamil Nadu. The inventory is
            land: plots, groves, farms, and industrial parcels. Houses show
            up only when they sit next to that work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/properties/1559827260-dc66d52bef19.jpg"
              alt="Coconut grove of the kind listed around Pollachi"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Why land, and why here
            </h2>
            <p className="text-foreground/90">
              Coimbatore buyers already speak in cents, Patta, and survey
              numbers. National house sites bury that under bedrooms and
              swimming-pool filters. Realster flips the default: extent and
              locality first, house details only if the listing is a house.
            </p>
            <p className="text-foreground/90">
              Agents around Pollachi, Sulur, Annur, and Mettupalayam maintain
              their own listings. If a price changes or a parcel goes under
              token, they update it from the dashboard.
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
          Are you a licensed agent in Tamil Nadu?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Create a free account, add your RERA number, and list land you
          already represent.
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
