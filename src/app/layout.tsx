import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HAJI UTONG - Premium Game Enhancement Software",
  description: "Premium e-commerce platform for game enhancement software with real-time status monitoring, automated feedback, and comprehensive documentation.",
  keywords: ["game cheats", "game enhancement", "game software", "HAJI UTONG", "game mods", "game tools"],
  authors: [{ name: "HAJI UTONG" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "HAJI UTONG - Premium Game Enhancement Software",
    description: "Enhance your gaming experience with premium software for multiple platforms",
    url: "https://hajiutong.com",
    siteName: "HAJI UTONG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAJI UTONG - Premium Game Enhancement Software",
    description: "Enhance your gaming experience with premium software for multiple platforms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
