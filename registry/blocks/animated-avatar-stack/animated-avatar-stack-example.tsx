"use client";

import type { AvatarData } from "@/registry/blocks/animated-avatar-stack/animated-avatar-stack";
import { AnimatedAvatarStack } from "@/registry/blocks/animated-avatar-stack/animated-avatar-stack";
import { TooltipProvider } from "@/registry/ui/tooltip";

const AVATAR_DATA: AvatarData[] = [
  {
    src: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    fallback: "RS",
    name: "Rick Sanchez",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    fallback: "MS",
    name: "Morty Smith",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    fallback: "SS",
    name: "Summer Smith",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    fallback: "BS",
    name: "Beth Smith",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    fallback: "JS",
    name: "Jerry Smith",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    fallback: "ACP",
    name: "Abadango Cluster Princess",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    fallback: "AL",
    name: "Abradolf Lincler",
  },
  {
    src: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    fallback: "AR",
    name: "Adjudicator Rick",
  },
];

export function AnimatedAvatarStackExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm text-muted-foreground">Small</h3>
          <AnimatedAvatarStack
            avatarData={AVATAR_DATA}
            maxVisible={5}
            size="sm"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm text-muted-foreground">
            Medium (Default)
          </h3>
          <AnimatedAvatarStack
            avatarData={AVATAR_DATA}
            maxVisible={5}
            size="md"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm text-muted-foreground">Large</h3>
          <AnimatedAvatarStack
            avatarData={AVATAR_DATA}
            maxVisible={5}
            size="lg"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-sm text-muted-foreground">
            Custom Visible Count (3)
          </h3>
          <AnimatedAvatarStack
            avatarData={AVATAR_DATA}
            maxVisible={3}
            size="md"
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
