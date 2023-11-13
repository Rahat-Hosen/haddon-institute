import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import Script from "next/script";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";

export const metadata: Metadata = {
  metadataBase: new URL("https://haddoninstitute.org/"),
  title: "Haddon Institute",
  description:
    "Our mission at the Haddon institute is to provide a Christ-centered education grounded in Reformed theology.",
  openGraph: {
    images: "/logos/5.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(GeistSans.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navigation />
            {children}
            <div className="bg-muted mt-10">
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
        <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
      </html>
    </ClerkProvider>
  );
}
