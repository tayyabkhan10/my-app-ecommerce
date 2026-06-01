// 📁 src/lib/otp.ts
export function formatOtp(otp: string): string {
  // Display as "123 456" for readability
  return otp.slice(0, 3) + " " + otp.slice(3);
}