import Link from "next/link";
import { LayoutDashboard, Building2, PlusCircle, LogOut, ExternalLink } from "lucide-react";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { requireAgent } from "@/lib/auth-guard";
import { logoutAgent } from "@/actions/auth";
import { initials } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/properties", label: "My listings", icon: Building2 },
  { href: "/dashboard/properties/new", label: "Add listing", icon: PlusCircle },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const agent = await requireAgent();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo dark />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-sidebar-border p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <ExternalLink className="size-4" />
            View public site
          </Link>
          <form action={logoutAgent}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{agent.name}</p>
              <p className="text-xs text-muted-foreground">{agent.title}</p>
            </div>
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary text-sm text-primary-foreground">
                {initials(agent.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-background px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 hover:bg-muted"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
