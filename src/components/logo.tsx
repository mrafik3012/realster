import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  wordmarkClassName,
  dark = false,
}: {
  className?: string;
  wordmarkClassName?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 shrink-0", className)}
      aria-label="Realster home"
    >
      <Image
        src="/images/logo-mark-64.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        priority
      />
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-tight",
          dark ? "text-white" : "text-secondary",
          wordmarkClassName
        )}
      >
        Realster
      </span>
    </Link>
  );
}
