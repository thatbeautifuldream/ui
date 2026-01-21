import { InstallerTabs } from "@/components/installer-tabs";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { cn } from "@/lib/utils";
import { AnimatedAvatarStackExample } from "@/registry/blocks/animated-avatar-stack/animated-avatar-stack-example";
import { NestedDrawerExample } from "@/registry/blocks/nested-drawer/nested-drawer-example";
import { TimezoneClockExample } from "@/registry/blocks/timezone-clock/timezone-clock-example";
import { Button } from "@/registry/ui/button";
import Link from "next/link";

const COMPONENTS = [
  {
    name: "nested-drawer",
    description:
      "A fully accessible, animated drawer component with nested navigation.",
    component: NestedDrawerExample,
  },
  {
    name: "animated-avatar-stack",
    description:
      "An animated avatar stack with size variants and customizable visibility.",
    component: AnimatedAvatarStackExample,
  },
  {
    name: "timezone-clock",
    description:
      "A real-time timezone clock with animated number transitions and timezone offset display.",
    component: TimezoneClockExample,
  },
] as const;

function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function HomePage() {
  const latestComponent = COMPONENTS[COMPONENTS.length - 1];
  return (
    <div className="flex flex-col min-h-svh relative">
      <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto w-full">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-5xl py-12 sm:py-16 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 bg-background text-foreground ring-1 ring-border hover:ring-border/80 hover:bg-background/80 active:scale-98">
              New: {toTitleCase(latestComponent.name)}{" "}
              <Link
                href={`/docs/components/${latestComponent.name}`}
                className="font-semibold text-foreground"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
              Attention (to detail) is all you need!
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Accessible, animated components built with craft. Built on shadcn,
              distributed as code.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Button asChild size="lg">
                <Link href="/docs">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#components">Browse components</Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
      <main id="components" className="max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPONENTS.map(({ name, description, component: Component }) => (
            <div key={name} className="flex flex-col gap-2">
              <div className="flex flex-col gap-4 border bg-accent/40 rounded-lg p-4 min-h-[300px] relative">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xs text-muted-foreground line-clamp-2">
                    {description}
                  </h2>
                  <OpenInV0Button name={name} className="w-fit shrink-0" />
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center relative flex-1",
                  )}
                >
                  <Component />
                </div>
              </div>
              <InstallerTabs componentName={name} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
