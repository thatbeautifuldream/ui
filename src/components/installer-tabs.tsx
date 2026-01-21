"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import {
  generateInstallerCommand,
  PACKAGE_MANAGERS,
  type TPackageManager,
} from "@/lib/installer-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

type TInstallerTabsProps = {
  componentName: string;
  className?: string;
};

export function InstallerTabs({
  componentName,
  className,
}: TInstallerTabsProps) {
  const [activeTab, setActiveTab] = useState<TPackageManager["name"]>(
    PACKAGE_MANAGERS[0].name,
  );
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const command = generateInstallerCommand(componentName, activeTab);
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  return (
    <Tabs
      // @ts-ignore
      value={activeTab}
      // @ts-ignore
      onValueChange={(value) => setActiveTab(value)}
      className={className}
    >
      <TabsList>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabsTrigger key={pm.name} value={pm.name}>
            {pm.name}
          </TabsTrigger>
        ))}
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center justify-center p-1.5 hover:bg-fd-muted/50 rounded transition-colors cursor-pointer ml-auto"
          title="Copy command"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </TabsList>

      {PACKAGE_MANAGERS.map((pm) => {
        const command = generateInstallerCommand(componentName, pm.name);
        return (
          <TabsContent key={pm.name} value={pm.name}>
            <div className="font-mono text-sm overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <code className="whitespace-nowrap">{command}</code>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
