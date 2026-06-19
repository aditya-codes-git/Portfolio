import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Trim and sanitize inputs
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // 1. Validation Checks
    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: "Invalid name. Name must be between 1 and 100 characters." },
        { status: 400 }
      );
    }

    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    if (!message || message.length > 5000) {
      return NextResponse.json(
        { error: "Invalid message. Message must be between 1 and 5000 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Missing email configuration: RESEND_API_KEY or CONTACT_EMAIL env variables.");
      return NextResponse.json(
        { error: "Internal server configuration error." },
        { status: 500 }
      );
    }

    // 2. Initialize Resend
    const resend = new Resend(apiKey);

    const emailContent = `New connection request received.

Name:
${name}

Email:
${email}

Message:
${message}`;

    // 3. Send Email
    const { error } = await resend.emails.send({
      from: "Portfolio Terminal <onboarding@resend.dev>",
      to: toEmail,
      subject: `New portfolio connection from ${name}`,
      text: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to transmit message." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Packet delivered successfully." },
      { status: 200 }
    );

  } catch (err) {
    console.error("API contact error handler:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
