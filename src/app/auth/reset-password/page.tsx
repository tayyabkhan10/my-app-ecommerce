// 📁 src/app/(auth)/reset-password/page.tsx
'use client'; // ✅ Mandatory: yeh Client Component hai

import { useState } from "react";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ✅ useSearchParams hook — readonly URLSearchParams return karta hai
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // ✅ Safe token access (null check + type assertion)
  const token = searchParams?.get("token") ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Token validation
    if (!token) {
      setError("Invalid or missing reset link");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to reset password");
        setLoading(false);
      } else {
        // ✅ Success: redirect to login with success flag
        router.push("/auth/login?reset=success");
        router.refresh(); // ✅ Ensure fresh session
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // ✅ Agar token hi nahi hai → Invalid link page dikhao
  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Link</CardTitle>
            <CardDescription>This password reset link is invalid or expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth/forgot-password")} className="w-full">
              Request New Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}