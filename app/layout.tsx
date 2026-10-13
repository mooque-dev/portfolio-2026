import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import ReadingProgress from "@/components/ReadingProgress";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import "./globals.css";

// One typeface, used at every size. The three variables stay so existing
// classes (font-sans, font-serif, font-script) all resolve to it.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://allenkang.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allen Kang, Senior Product Designer",
    template: "%s | Allen Kang",
  },
  description:
    "Senior product designer for transaction-heavy products: donation and payment flows, multi-entity financial data, and the design systems behind them.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Allen Kang Portfolio",
    title: "Allen Kang, Senior Product Designer",
    description:
      "Senior product designer for transaction-heavy products: donation and payment flows, multi-entity financial data, and the design systems behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allen Kang, Senior Product Designer",
    description:
      "Senior product designer for transaction-heavy products: donation and payment flows, multi-entity financial data, and the design systems behind them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

const themeScript = `
(function(){
  try {
    var hour = new Date().getHours();
    var autoDark = hour < 7 || hour >= 19;
    var override = sessionStorage.getItem('themeOverride');
    var isDark = override !== null ? override === 'dark' : autoDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Allen Kang",
  url: siteUrl,
  jobTitle: "Senior Product Designer",
  description:
    "Senior product designer for transaction-heavy products and the design systems behind them.",
  sameAs: ["https://www.linkedin.com/in/mooque/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-background text-foreground">
        <TooltipProvider>
          {/* Honor prefers-reduced-motion across every framer-motion component
              at once: transform/layout animations are disabled, opacity kept. */}
          <MotionConfig reducedMotion="user">
            <ReadingProgress />
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {children}
          </MotionConfig>
        </TooltipProvider>
      </body>
    </html>
  );
}
