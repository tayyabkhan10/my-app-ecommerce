import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema (same as Express logic)
const ContactBody = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // ✅ Zod validation
    const { name, email, message } = ContactBody.parse(body);
    
    // ✅ Log contact submission (same as Express)
    console.log(`[Contact] From: ${name} <${email}>`);
    
    // 📧 Yahan aap Nodemailer ya Resend se email bhej sakte hain
    // Example: await sendContactEmail({ name, email, message });
    
    return NextResponse.json({ 
      success: true, 
      message: "Message received. We'll reply within 24 hours." 
    });
    
  } catch (error) {
    // Zod validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues }, // ✅ Fixed: errors → issues
        { status: 400 }
      );
    }
    
    // Generic error
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" }, 
      { status: 500 }
    );
  }
}