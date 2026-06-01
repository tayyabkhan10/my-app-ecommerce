import { ReactNode } from "react";
import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}