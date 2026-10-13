import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeeFigures from "@/components/fee/Figures";

// A local tool for the Fee Opt-In case study's figures (see
// components/fee/Figures.tsx). It 404s in production, and the mirror build
// drops the route.

export const metadata: Metadata = { title: "Fee Opt-In figures", robots: { index: false } };

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <FeeFigures />;
}
