import { InstallerTabs } from "@/components/installer-tabs";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { cn } from "@/lib/utils";
import { NestedDrawerExample } from "@/registry/new-york/blocks/nested-drawer/nested-drawer-example";

const COMPONENTS = [
  {
    name: "nested-drawer",
    description:
      "A fully accessible, animated drawer component with nested navigation.",
    component: NestedDrawerExample,
    minHeight: "min-h-[400px]",
  },
] as const;

export default function Home() {
  return (
    <div className="sm:px-4">
      <div className="container mx-auto max-w-6xl divide-y px-0 sm:border-x">
        <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8 relative">
          {/* <div className="absolute top-8 right-4">
            <ThemeToggle />
          </div> */}
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Milind&apos;s UI Components
            </h1>
            <p className="text-muted-foreground">
              Milind&apos;s take on UI components. Thoughtfully designed,
              crafted with attention to detail, and built to be yours.
            </p>
          </header>
          <main className="flex flex-col flex-1 gap-8">
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
      </div>
    </div>
  );
}
