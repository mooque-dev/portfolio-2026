import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GolditoPeek from "@/components/GolditoPeek";
import VisitCounter from "@/components/VisitCounter";
import { ReactNode } from "react";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <GolditoPeek />
      <VisitCounter />
    </>
  );
}
