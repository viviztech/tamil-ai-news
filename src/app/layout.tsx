import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansTamil = Noto_Sans_Tamil({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["tamil"],
  variable: "--font-noto-sans-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamil AI News | Future of News",
  description: "Real-time AI-powered news aggregator for the Tamil-speaking world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          notoSansTamil.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="container mx-auto px-4 pb-8">
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
