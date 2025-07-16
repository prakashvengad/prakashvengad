import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge'; // Or 'nodejs' if you use Node runtime

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    // Admin email content
    await resend.emails.send({
      from: 'onboarding@resend.dev', // ✅ Change to your verified domain if available
      to: ['prakashai7639@gmail.com', 'prakashvengad7575@gmail.com'], // ✅ Add your actual team emails
      subject: subject ? `New Form Submission: ${subject}` : `New Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Auto-response to user
    await resend.emails.send({
      from: 'Your Website <noreply@onresend.com>',
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Your message details:</h3>
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <p>Best regards,<br />Your Website Team</p>
        </div>
      `
    });

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: 'Failed to send emails',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
