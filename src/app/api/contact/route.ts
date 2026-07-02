import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * Contact form endpoint. Validates the payload and sends the inquiry via Resend.
 *
 * Required env var: RESEND_API_KEY
 * Sender: support@pixoraft.com (the pixoraft.com domain must be verified in Resend)
 * Recipients: info@pixoraft.com, naqia209@gmail.com
 */
const FROM = "Pixoraft <support@pixoraft.com>";
const TO = ["info@pixoraft.com", "naqia209@gmail.com"];

const MODEL_LABELS: Record<string, string> = {
  fixed: "Fixed Project Cost",
  hourly: "Hourly",
  monthly: "Monthly Maintenance",
};

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().min(1),
  model: z.string().min(1),
  message: z.string().min(10),
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Email service not configured" },
      { status: 500 },
    );
  }

  const { name, email, company, budget, model, message } = parsed.data;
  const modelLabel = MODEL_LABELS[model] ?? model;

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "Not provided"],
    ["Budget", budget],
    ["Engagement model", modelLabel],
    ["Message", message],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
      <h2 style="margin: 0 0 16px;">New project inquiry</h2>
      <table style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, val]) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; vertical-align: top; color: #555; white-space: nowrap;"><strong>${label}</strong></td>
            <td style="padding: 6px 0; vertical-align: top;">${escapeHtml(val).replace(/\n/g, "<br/>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send" },
      { status: 500 },
    );
  }
}
