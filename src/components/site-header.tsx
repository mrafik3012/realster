import Link from "next/link";
import { Menu, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getSession } from "@/lib/session";
import { logoutAgent } from "@/actions/auth";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties", label: "Land" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <Link
                href="/dashboard/properties/new"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
              >
                <PlusCircle className="size-4" />
                List your land
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 pr-3 outline-none ring-offset-2 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {initials(session.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{session.name.split(" ")[0]}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/dashboard" />}>
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form action={logoutAgent} className="contents">
                    <DropdownMenuItem
                      render={<button type="submit" className="w-full" />}
                      variant="destructive"
                    >
                      <LogOut className="size-4" />
                      Log out
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Agent login
              </Link>
              <Link href="/register" className={buttonVariants({ variant: "default", size: "sm" })}>
                List your land
              </Link>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {session ? (
                  <>
                    <SheetClose
                      render={<Link href="/dashboard" className={buttonVariants({ variant: "default" })} />}
                    >
                      Dashboard
                    </SheetClose>
                    <form action={logoutAgent}>
                      <Button type="submit" variant="outline" className="w-full">
                        Log out
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <SheetClose render={<Link href="/login" className={buttonVariants({ variant: "outline" })} />}>
                      Agent login
                    </SheetClose>
                    <SheetClose render={<Link href="/register" className={buttonVariants({ variant: "default" })} />}>
                      List your land
                    </SheetClose>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
