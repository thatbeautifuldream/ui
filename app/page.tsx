import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import { InstallerTabs } from "@/components/installer-tabs";

const COMPONENTS = [
  {
    name: "hello-world",
    description: "A simple hello world component",
    component: HelloWorld,
    minHeight: "min-h-[400px]",
  },
  {
    name: "example-form",
    description: "A contact form with Zod validation.",
    component: ExampleForm,
    minHeight: "min-h-[500px]",
  },
  {
    name: "complex-component",
    description: "A complex component showing hooks, libs and components.",
    component: PokemonPage,
    minHeight: "min-h-[400px]",
  },
  {
    name: "example-with-css",
    description: "A login form with a CSS file.",
    component: ExampleCard,
    minHeight: "min-h-[400px]",
  },
] as const;

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Milind's UI Components
        </h1>
        <p className="text-muted-foreground">
          Milind's take on UI components. Thoughtfully designed, crafted with
          attention to detail, and built to be yours.
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
                  className={`flex items-center justify-center ${minHeight} relative`}
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
