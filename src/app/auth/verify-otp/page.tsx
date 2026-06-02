// // 📁 src/app/auth/verify-otp/page.tsx
// 'use client';

// import { useState, useRef, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function VerifyOtpPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const email = searchParams.get("email") || "";

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);
//   const [cooldown, setCooldown] = useState(0);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   // Countdown for resend button
//   useEffect(() => {
//     if (cooldown <= 0) return;
//     const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
//     return () => clearTimeout(t);
//   }, [cooldown]);

//   const handleChange = (index: number, value: string) => {
//     if (!/^\d*$/.test(value)) return; // digits only
//     const updated = [...otp];
//     updated[index] = value.slice(-1); // one digit per box
//     setOtp(updated);
//     setError("");

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//     if (pasted.length === 6) {
//       setOtp(pasted.split(""));
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const code = otp.join("");
//     if (code.length < 6) {
//       setError("Please enter the full 6-digit code");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const res = await fetch("/api/auth/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp: code }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Verification failed");
//       // Clear OTP boxes on wrong code
//       setOtp(["", "", "", "", "", ""]);
//       inputRefs.current[0]?.focus();
//       setLoading(false);
//     } else {
//       router.push("/auth/login?verified=true");
//     }
//   };

//   const handleResend = async () => {
//     setResending(true);
//     setError("");
//     setMessage("");

//     const res = await fetch("/api/auth/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Failed to resend OTP");
//     } else {
//       setMessage("A new code has been sent to your email.");
//       setOtp(["", "", "", "", "", ""]);
//       inputRefs.current[0]?.focus();
//       setCooldown(60); // 60s cooldown
//     }
//     setResending(false);
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Verify Your Email</CardTitle>
//           <CardDescription>
//             Enter the 6-digit code sent to <strong>{email}</strong>
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             {message && (
//               <Alert className="bg-green-50 border-green-200">
//                 <AlertDescription className="text-green-700">{message}</AlertDescription>
//               </Alert>
//             )}

//             {/* OTP Input Boxes */}
//             <div className="flex justify-center gap-3" onPaste={handlePaste}>
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => { inputRefs.current[i] = el; }}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleChange(i, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(i, e)}
//                   className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg
//                     focus:outline-none focus:border-black transition-colors
//                     border-gray-300"
//                   autoFocus={i === 0}
//                 />
//               ))}
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Verifying..." : "Verify Email"}
//             </Button>
//           </form>

//           <p className="text-sm text-muted-foreground text-center mt-4">
//             Didn't receive a code?{" "}
//             {cooldown > 0 ? (
//               <span className="text-gray-400">Resend in {cooldown}s</span>
//             ) : (
//               <button
//                 onClick={handleResend}
//                 disabled={resending}
//                 className="text-blue-600 hover:underline disabled:opacity-50"
//               >
//                 {resending ? "Sending..." : "Resend code"}
//               </button>
//             )}
//           </p>

//           <p className="text-xs text-muted-foreground text-center mt-2">
//             Code expires in 10 minutes · 3 attempts allowed
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// 📁 src/app/auth/verify-otp/page.tsx
'use client';

import { Suspense, useState, useRef, useEffect } from "react"; // 👈 Suspense import karein
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ==========================================
// 1. ASAL FORM COMPONENT (Isme useSearchParams use ho raha hai)
// ==========================================
function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1); // one digit per box
    setOtp(updated);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Verification failed");
      // Clear OTP boxes on wrong code
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setLoading(false);
    } else {
      router.push("/auth/login?verified=true");
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to resend OTP");
    } else {
      setMessage("A new code has been sent to your email.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setCooldown(60); // 60s cooldown
    }
    setResending(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {message && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">{message}</AlertDescription>
              </Alert>
            )}

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg
                    focus:outline-none focus:border-black transition-colors
                    border-gray-300"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Didn't receive a code?{" "}
            {cooldown > 0 ? (
              <span className="text-gray-400">Resend in {cooldown}s</span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-blue-600 hover:underline disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
            )}
          </p>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Code expires in 10 minutes · 3 attempts allowed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


// 2. MAIN PAGE EXPORT (Suspense Wrapper)

export default function VerifyOtpPage() {
  return (
    // 👇 Form ko Suspense mein wrap karein
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-lg">Loading verification form...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}