import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LayoutProvider } from "@/components/LayoutProvider";
import CapyCompanion from "@/components/CapyCompanion";
import AskAllen from "@/components/AskAllen";
import { ReactNode } from "react";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CapyCompanion />
      <AskAllen />
    </LayoutProvider>
  );
}
