import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'attn/ui',
      url: '/',
    },
    links: [
      {
        text: 'Components',
        url: '/',
        active: 'nested-url',
      },
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
    ],
    githubUrl: 'https://github.com/milindmishra/ui',
  };
}
