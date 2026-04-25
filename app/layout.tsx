import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const siteUrl = "https://www.mooque.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allen Kang — Product Design Leader",
    template: "%s | Allen Kang",
  },
  description:
    "Design leader with a Fine Arts background. 7+ years building products, design systems, and the teams behind them — from startup through acquisition.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Allen Kang — Portfolio",
    title: "Allen Kang — Product Design Leader",
    description:
      "Design leader with a Fine Arts background. Building products, systems, and the teams that ship them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allen Kang — Product Design Leader",
    description:
      "Design leader with a Fine Arts background. Building products, systems, and the teams that ship them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    var l = localStorage.getItem('layout');
    if (l) document.documentElement.dataset.layout = l;
  } catch(e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Allen Kang",
  url: siteUrl,
  jobTitle: "Product Design Leader",
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
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <TooltipProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="min-h-screen" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
