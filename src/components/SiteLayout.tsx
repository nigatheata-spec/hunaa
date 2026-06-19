import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const SiteLayout = ({ children, noTopPadding = false }: { children: ReactNode; noTopPadding?: boolean }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className={`flex-1 ${noTopPadding ? "" : "pt-16"}`}>{children}</main>
    <Footer />
  </div>
);
