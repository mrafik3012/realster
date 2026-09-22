import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Realster",
  description: "Get in touch with the Realster team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Get in touch
        </h1>
        <p className="mt-2 text-muted-foreground">
          Questions about a listing should go straight to the agent on that
          property&apos;s page. For everything else — platform questions,
          agent accounts, or general feedback — send us a note.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">hello@realster.example</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">(800) 555-0100</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Office</p>
              <p className="text-sm text-muted-foreground">
                This is a demo platform without a physical office.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
