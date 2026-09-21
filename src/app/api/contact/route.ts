import { NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Validates an untrusted request body. Mirrors the client-side rules in
 * components/contact.tsx — the client copy is for feedback, this one is the
 * boundary that actually decides what gets forwarded.
 */
function validate(body: unknown): { data: ContactPayload } | { error: string } {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Request body must be a JSON object.' };
  }

  const raw = body as Record<string, unknown>;
  const asString = (key: string): string =>
    typeof raw[key] === 'string' ? (raw[key] as string).trim() : '';

  const name = asString('name');
  const email = asString('email');
  const phone = asString('phone');
  const message = asString('message');

  if (name.length < 2) return { error: 'Name must be at least 2 characters.' };
  if (!EMAIL_PATTERN.test(email)) return { error: 'A valid email address is required.' };

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { error: 'A valid phone number is required.' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { error: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` };
  }

  return {
    data: {
      name,
      email,
      phone,
      eventType: asString('eventType'),
      eventDate: asString('eventDate'),
      message,
    },
  };
}

/**
 * Receives enquiries from the contact form and forwards them to whatever the
 * studio uses to collect leads (an inbox automation, CRM webhook, Google Form
 * relay, …) via `CONTACT_WEBHOOK_URL`.
 *
 * With no webhook configured there is nowhere to deliver the enquiry, so the
 * route fails loudly with 503 instead of pretending the message was sent.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  const result = validate(body);
  if ('error' in result) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error(
      'CONTACT_WEBHOOK_URL is not set — the contact form has nowhere to deliver enquiries.'
    );
    return NextResponse.json(
      {
        message:
          'Our enquiry form is temporarily unavailable. Please call or WhatsApp us instead.',
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...result.data, submittedAt: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to forward contact enquiry:', error);
    return NextResponse.json(
      { message: 'We could not deliver your message. Please call or WhatsApp us instead.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: "Thank you! We'll get back to you within 24 hours.",
  });
}
