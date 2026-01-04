"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import {
  PACKAGE_MANAGERS,
  generateInstallerCommand,
} from "../lib/installer-utils";

type TInstallerTabsProps = {
  componentName: string;
  className?: string;
};

export function InstallerTabs({
  componentName,
  className,
}: TInstallerTabsProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  return (
    <Tabs defaultValue={PACKAGE_MANAGERS[0].name} className={className}>
      <TabsList>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabsTrigger key={pm.name} value={pm.name}>
            {pm.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {PACKAGE_MANAGERS.map((pm) => {
        const command = generateInstallerCommand(componentName, pm.name);
        return (
          <TabsContent key={pm.name} value={pm.name}>
            <div className="flex items-center justify-between gap-2 font-mono text-sm">
              <code className="flex-1">{command}</code>
              <button
                type="button"
                onClick={() => copyToClipboard(command)}
                className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-fd-muted/50 rounded transition-colors"
                title="Copy command"
              >
                {copiedCommand === command ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
