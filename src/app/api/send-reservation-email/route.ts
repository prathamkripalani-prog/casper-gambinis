import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
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
        <h2>Reservation Confirmed</h2>

        <p>Hi <strong>${name}</strong>,</p>

        <p>Your reservation has been confirmed.</p>

        <ul>
          <li><strong>Booking Code:</strong> ${bookingCode}</li>
          <li><strong>Date:</strong> ${reservationDate}</li>
          <li><strong>Time:</strong> ${reservationTime}</li>
          <li><strong>Guests:</strong> ${guests}</li>
        </ul>

        <p>Please present your booking code when you arrive.</p>

        <p>Thank you,<br/>Casper & Gambini's</p>
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