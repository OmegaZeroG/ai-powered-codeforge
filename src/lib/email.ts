import nodemailer from "nodemailer"

// Single choke-point for outbound email, over Gmail SMTP (nodemailer). Swap the
// transport here and nothing else changes. Configured via env:
//   SMTP_USER  -- the Gmail address, e.g. codeforge26@gmail.com
//   SMTP_PASS  -- a Google *App Password* (16 chars, NOT your normal password;
//                 requires 2-Step Verification enabled on the account)
//   EMAIL_FROM -- optional display form, e.g. "CodeForge <codeforge26@gmail.com>".
//                 Defaults to SMTP_USER.
//
// If SMTP creds are missing we DON'T throw in development: the email is logged
// to the server console so reset links stay testable. In production a missing
// config is a real error and we surface it.
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
const from = process.env.EMAIL_FROM ?? (user ? `CodeForge <${user}>` : undefined)

// Gmail SMTP over the standard submission port. `service: "gmail"` picks the
// correct host/port/secure settings automatically.
const transporter =
  user && pass
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      })
    : null

export type SendEmailInput = {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailInput) {
  if (!transporter || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SMTP_USER / SMTP_PASS are not set — cannot send email in production.",
      )
    }
    // Dev fallback: log instead of sending so reset links are still reachable.
    console.warn(
      `\n[email:dev] SMTP not configured — not sending. Would send:\n` +
        `  to: ${to}\n  subject: ${subject}\n  text: ${text ?? "(html only)"}\n`,
    )
    return { messageId: "dev-noop" }
  }

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    ...(text ? { text } : {}),
  })
  return info
}
