// 📁 src/components/shared/AdminGuard.tsx
'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ useEffect always at top level — never inside a conditional
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-24 text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4 opacity-80" />
        <h1 className="text-3xl font-serif font-bold mb-3">Access Denied</h1>
        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
          This area is restricted to authorized administrators only.
        </p>
        <Link href="/">
          <Button className="rounded-none">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}