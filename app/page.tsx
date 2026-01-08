import { InstallerTabs } from "@/components/installer-tabs";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { AnimatedAvatarStackExample } from "@/registry/blocks/animated-avatar-stack/animated-avatar-stack-example";
import { NestedDrawerExample } from "@/registry/blocks/nested-drawer/nested-drawer-example";
import Link from "next/link";

const COMPONENTS = [
  {
    name: "nested-drawer",
    description:
      "A fully accessible, animated drawer component with nested navigation.",
    component: NestedDrawerExample,
    minHeight: "min-h-[400px]",
  },
  {
    name: "animated-avatar-stack",
    description:
      "An animated avatar stack with size variants and customizable visibility.",
    component: AnimatedAvatarStackExample,
    minHeight: "min-h-[400px]",
  },
] as const;

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8 relative">
      <div>
        <div className="absolute top-8 right-4">
          <ThemeToggle />
        </div>
        <header className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold tracking-tight">
            attn/ui{" "}
            <span className="text-muted-foreground font-normal">
              by{" "}
              <Link
                href="https://milindmishra.com"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                milind
              </Link>
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Attention (to detail) is all you need.
          </p>
        </header>
      </div>
      <main className="flex flex-col gap-8">
        {COMPONENTS.map(
          ({ name, description, component: Component, minHeight }) => (
            <div key={name}>
              <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-muted-foreground sm:pl-3">
                    {description}
                  </h2>
                  <OpenInV0Button name={name} className="w-fit" />
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center relative",
                    minHeight
                  )}
                >
                  <Component />
                </div>
              </div>
              <InstallerTabs componentName={name} />
            </div>
          )
        )}
      </main>
    </div>
  );
}
