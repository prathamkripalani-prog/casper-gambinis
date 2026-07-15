import { Resend } from "resend";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not configured");
}

const resend = new Resend(process.env.RESEND_API_KEY);
    const {
      name,
      email,
      bookingCode,
      reservationDate,
      reservationTime,
      guests,
    } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Casper & Gambini <onboarding@resend.dev>",
      to: [email],
      subject: `Reservation Confirmed - ${bookingCode}`,
      html: `
<div style="margin:0;padding:40px;background:#111111;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:auto;background:#1a1a1a;border:2px solid #c8a44d;border-radius:16px;overflow:hidden;">

    <div style="background:#c8a44d;padding:30px;text-align:center;">
      <h1 style="margin:0;color:#111;font-size:32px;">Casper & Gambini's</h1>
      <p style="margin:8px 0 0;font-size:18px;color:#111;">Reservation Confirmed ✓</p>
    </div>

    <div style="padding:35px;color:#f5f5f5;line-height:1.8;">
      <h2 style="color:#c8a44d;margin-top:0;">Hello ${name},</h2>

      <p>Your reservation has been successfully confirmed. We look forward to welcoming you.</p>

      <div style="margin:30px 0;padding:24px;border:1px solid #444;border-radius:12px;background:#111;">
        <p><strong style="color:#c8a44d;">Booking Code:</strong><br>${bookingCode}</p>
        <p><strong style="color:#c8a44d;">Date:</strong><br>${reservationDate}</p>
        <p><strong style="color:#c8a44d;">Time:</strong><br>${reservationTime}</p>
        <p><strong style="color:#c8a44d;">Guests:</strong><br>${guests}</p>
      </div>

      <p>Please present your booking code upon arrival.</p>

      <hr style="border:none;border-top:1px solid #444;margin:30px 0;">

      <p style="margin:0;color:#c8a44d;font-weight:bold;">Casper & Gambini's</p>
      <p style="margin:5px 0;color:#ddd;">Thank you for choosing us. We can't wait to serve you.</p>
    </div>
  </div>
</div>
`,
    });

    if (error) {
      return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}