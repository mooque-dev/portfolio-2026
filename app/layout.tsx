import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import ReadingProgress from "@/components/ReadingProgress";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const siteUrl = "https://mooque.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allen Kang, Product Design Lead",
    template: "%s | Allen Kang",
  },
  description:
    "Product designer, eight years in. Mostly at companies where the work mattered more than the logo.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Allen Kang Portfolio",
    title: "Allen Kang, Product Design Lead",
    description:
      "Product designer, eight years in. Mostly at companies where the work mattered more than the logo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allen Kang, Product Design Lead",
    description:
      "Product designer, eight years in. Mostly at companies where the work mattered more than the logo.",
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
  jobTitle: "Product Design Lead",
  worksFor: { "@type": "Organization", name: "Velora" },
  description:
    "Design leader with a Fine Arts background. Building products, systems, and the teams that ship them.",
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
      className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}
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
