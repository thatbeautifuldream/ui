export type TPackageManager = {
  name: "pnpm" | "npm" | "yarn" | "bun";
  command: string;
};

export const PACKAGE_MANAGERS: TPackageManager[] = [
  { name: "pnpm", command: "pnpm dlx shadcn@latest add" },
  { name: "npm", command: "npx shadcn@latest add" },
  { name: "yarn", command: "yarn shadcn@latest add" },
  { name: "bun", command: "bunx shadcn@latest add" },
];

export function generateInstallerCommand(
  componentName: string,
  packageManager: string
): string {
  const pm = PACKAGE_MANAGERS.find((p) => p.name === packageManager);
  if (!pm) {
    throw new Error(`Unknown package manager: ${packageManager}`);
  }
  return `${pm.command} ${process.env.NEXT_PUBLIC_BASE_URL}/r/${componentName}.json`;
}

export function generateAllInstallerCommands(
  componentName: string
): Record<string, string> {
  return PACKAGE_MANAGERS.reduce((acc, pm) => {
    acc[pm.name] = generateInstallerCommand(componentName, pm.name);
    return acc;
  }, {} as Record<string, string>);
}
