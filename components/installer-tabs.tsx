"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import {
  PACKAGE_MANAGERS,
  generateInstallerCommand,
} from "../lib/installer-utils";

type TInstallerTabsProps = {
  componentName: string;
  className?: string;
};

type TComponentFile = {
  path: string;
  content: string;
  type: string;
};

export function InstallerTabs({
  componentName,
  className,
}: TInstallerTabsProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [componentFiles, setComponentFiles] = useState<TComponentFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComponentData() {
      try {
        const response = await fetch(`/r/${componentName}.json`);
        const data = await response.json();
        setComponentFiles(data.files || []);
      } catch (error) {
        console.error("Failed to fetch component data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchComponentData();
  }, [componentName]);

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
        <TabsTrigger value="manual">manual</TabsTrigger>
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
                className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-fd-muted/50 rounded transition-colors cursor-pointer"
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

      <TabsContent value="manual">
        {loading ? (
          <div className="text-sm text-muted-foreground py-4">
            Loading component code...
          </div>
        ) : componentFiles.length > 0 ? (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Copy and paste the following code into your project.
            </p>
            {componentFiles.map((file, index) => {
              const fileName = file.path.split("/").pop() || "component.tsx";
              // Determine language from file extension
              const getLang = (filename: string) => {
                if (filename.endsWith(".tsx") || filename.endsWith(".jsx"))
                  return "tsx";
                if (filename.endsWith(".ts")) return "ts";
                if (filename.endsWith(".js")) return "js";
                if (filename.endsWith(".css")) return "css";
                if (filename.endsWith(".json")) return "json";
                return "typescript";
              };

              return (
                <div key={file.path} className="space-y-2">
                  <blockquote className="text-sm font-medium text-foreground bg-fd-muted/50 px-2 py-1 rounded-tl-none rounded-lg w-fit border">
                    {fileName}
                  </blockquote>
                  <DynamicCodeBlock
                    lang={getLang(fileName)}
                    code={file.content}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-4">
            No component files found.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
