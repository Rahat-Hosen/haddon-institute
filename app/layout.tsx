import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
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
    url: "https://haddoninstitute.org/",
    title: "Haddon Institute",
    locale: "en_AU",
    countryName: "Australia",
    siteName: "Haddon Institute",
    type: "website",
    description:
      "Our mission at the Haddon institute is to provide a Christ-centered education grounded in Reformed theology.",
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
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#fafafa] dark:bg-[#0a0a0a]`}
        >
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

// #fafafa
