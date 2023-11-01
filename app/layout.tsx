import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Haddon Institute",
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
            "flex min-h-screen flex-col bg-background",
            GeistSans.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navigation />
            {children}
            <div className="bg-muted mt-10">
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
