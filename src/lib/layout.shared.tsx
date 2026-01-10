import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "attn/ui",
      url: "/",
    },
    links: [
      {
        text: "Components",
        url: "/",
        active: "url",
      },
      {
        text: "Documentation",
        url: "/docs",
        active: "nested-url",
      },
    ],
    githubUrl: "https://github.com/thatbeautifuldream/ui",
  };
}
