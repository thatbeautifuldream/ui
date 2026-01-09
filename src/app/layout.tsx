import type { Metadata } from "next";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { geistMono, geistSans } from "@/lib/fonts";
import { ClarityInit } from "@/components/clarity-init";
import './global.css';

export const metadata: Metadata = {
  title: {
    default: "attn/ui",
    template: "%s | attn/ui",
  },
  description:
    "Attention (to detail) is all you need. Accessible, animated components built with craft. Built on shadcn, distributed as code.",
  keywords: [
    "UI components",
    "React components",
    "accessible components",
    "animated components",
    "Next.js",
    "shadcn/ui",
    "TypeScript",
    "Tailwind CSS",
    "attention to detail",
    "UI craft",
  ],
  authors: [{ name: "Milind Mishra" }],
  creator: "Milind Mishra",
  metadataBase: new URL("https://ui.milind.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "attn/ui by Milind Mishra",
    description:
      "Attention (to detail) is all you need. Accessible, animated components built with craft. Built on shadcn, distributed as code.",
    siteName: "attn/ui",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Attention (to detail) is all you need.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "attn/ui by Milind Mishra",
    description:
      "Attention (to detail) is all you need. Accessible, animated components built with craft. Built on shadcn, distributed as code.",
    images: ["/og-image.png"],
    creator: "@milindmishra_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={`antialiased font-sans flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
        <ClarityInit />
      </body>
    </html>
  );
}
