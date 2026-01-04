import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Milind's UI Components",
    template: "%s | Milind's UI Components",
  },
  description:
    "Milind's take on UI components. Thoughtfully designed, crafted with attention to detail, and built to be yours.",
  keywords: [
    "UI components",
    "React components",
    "Next.js",
    "shadcn/ui",
    "open source",
    "component library",
    "custom components",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Milind" }],
  creator: "Milind",
  metadataBase: new URL("https://ui.milind.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Milind's UI Components",
    description:
      "Milind's take on UI components. Thoughtfully designed, crafted with attention to detail, and built to be yours.",
    siteName: "Milind's UI Components",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Milind's UI Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milind's UI Components",
    description:
      "Milind's take on UI components. Thoughtfully designed, crafted with attention to detail, and built to be yours.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
