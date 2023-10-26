import "./globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Source_Serif_4 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
// const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Coming Soon | Haddon Institute",
  description:
    "Raising up Christian leaders to redeem the devastation of many generations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "flex min-h-screen flex-col bg-background font-inter",
            inter.variable,
            // oswald.variable,
            // serif.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navigation />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
