"use client";

import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export const MAX_VISIBLE = 5;

export type AvatarData = {
  src: string;
  fallback: string;
  name: string;
};

export const AVATAR_DATA: AvatarData[] = [
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

const avatarStackVariants = cva("isolate flex items-center", {
  variants: {
    size: {
      xs: "-space-x-1",
      sm: "-space-x-1.5",
      md: "-space-x-2",
      lg: "-space-x-2.5",
      xl: "-space-x-3",
      "2xl": "-space-x-3.5",
      "3xl": "-space-x-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarVariants = cva(
  "relative cursor-pointer select-none overflow-hidden rounded-full hover:shadow-lg",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
        "2xl": "h-16 w-16",
        "3xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const countBadgeVariants = cva(
  "relative flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-secondary font-medium text-muted-foreground hover:shadow-lg",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-sm",
        xl: "h-14 w-14 text-base",
        "2xl": "h-16 w-16 text-lg",
        "3xl": "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AnimatedAvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatarData?: AvatarData[];
  maxVisible?: number;
}

function AnimatedAvatarStack({
  avatarData = AVATAR_DATA,
  maxVisible = MAX_VISIBLE,
  size = "md",
  className,
  ...props
}: AnimatedAvatarStackProps) {
  const visibleAvatars = avatarData.slice(0, maxVisible);
  const hiddenCount = avatarData.length - visibleAvatars.length;

  return (
    <TooltipProvider>
      <div className={cn(avatarStackVariants({ size }), className)} {...props}>
        {visibleAvatars.map((avatar, index) => (
          <Tooltip key={`${avatar.fallback}-${index}`}>
            <TooltipTrigger asChild>
              <motion.div
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className={cn(avatarVariants({ size }))}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                style={{
                  zIndex: visibleAvatars.length - index,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  zIndex: 100,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
              >
                <Avatar className="size-full shadow-sm">
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="z-50" side="top">
              {avatar.name}
            </TooltipContent>
          </Tooltip>
        ))}

        {hiddenCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className={cn(countBadgeVariants({ size }))}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                style={{
                  zIndex: 1,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  zIndex: 100,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
              >
                +{hiddenCount}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="z-50" side="top">
              {hiddenCount} more {hiddenCount === 1 ? "person" : "people"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

export {
  AnimatedAvatarStack,
  avatarStackVariants,
  avatarVariants,
  countBadgeVariants,
};
