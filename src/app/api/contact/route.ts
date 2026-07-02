import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form endpoint.
 *
 * TODO: Wire real email delivery via Resend. For now this validates the payload
 * server side, logs it, and returns success so the form flow works end to end.
 */
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().min(1),
  model: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 422 },
    );
  }

  // TODO: send via Resend (or the chosen provider).
  console.log("[contact] new inquiry:", parsed.data);

  return NextResponse.json({ ok: true });
}
