import { Resend } from "resend";
import type { ContactPayload } from "@/types/contact";
import { CATEGORY_LABEL } from "@/types/contact";

let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is not set. See env.example for configuration.",
      );
    }
    client = new Resend(apiKey);
  }
  return client;
}

const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@genova.inc";
const FROM_NAME = "Genova Inc.";
const TO_RAW = process.env.CONTACT_TO_EMAIL ?? "";
const TO_LIST = TO_RAW
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

const formatTimestamp = (d = new Date()) => {
  // JST
  const fmt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${fmt.format(d)} JST`;
};

interface NotifyResult {
  notified: boolean;
  autoReplied: boolean;
}

export async function sendContactNotification(
  payload: ContactPayload,
): Promise<NotifyResult> {
  if (TO_LIST.length === 0) {
    throw new Error(
      "CONTACT_TO_EMAIL is not set. Add at least one recipient address.",
    );
  }

  const resend = getClient();
  const categoryLabel = payload.category
    ? CATEGORY_LABEL[payload.category]
    : "（未選択）";
  const timestamp = formatTimestamp();

  const subject = `【Genova お問い合わせ】${categoryLabel} - ${payload.company} ${payload.name} 様`;

  const internalText = [
    "────────────────────────────────",
    "Genova コーポレートサイトより、お問い合わせを受け付けました。",
    "────────────────────────────────",
    "",
    "■ お名前",
    payload.name,
    "",
    "■ 会社名",
    payload.company,
    "",
    "■ メールアドレス",
    payload.email,
    "",
    "■ お問い合わせ種別",
    categoryLabel,
    "",
    "■ お問い合わせ内容",
    payload.message,
    "",
    "────────────────────────────────",
    `受信日時: ${timestamp}`,
    "────────────────────────────────",
  ].join("\n");

  const internalHtml = `
<div style="font-family:'Hiragino Sans','Noto Sans JP',sans-serif;max-width:640px;margin:0 auto;color:#1A1A1A;line-height:1.7;">
  <div style="border-top:2px solid #1A1A1A;padding-top:16px;">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#4A7BC7;margin:0 0 4px;font-weight:700;">Genova Inquiry</p>
    <h1 style="font-size:18px;margin:0 0 16px;">コーポレートサイトより、お問い合わせを受け付けました。</h1>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tbody>
      ${row("お名前", escapeHtml(payload.name))}
      ${row("会社名", escapeHtml(payload.company))}
      ${row("メールアドレス", `<a href="mailto:${escapeHtml(payload.email)}" style="color:#4A7BC7;">${escapeHtml(payload.email)}</a>`)}
      ${row("種別", escapeHtml(categoryLabel))}
      ${row("内容", nl2br(payload.message))}
    </tbody>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#737373;">受信日時: ${escapeHtml(timestamp)}</p>
</div>`.trim();

  const { error: internalError } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM}>`,
    to: TO_LIST,
    replyTo: payload.email,
    subject,
    text: internalText,
    html: internalHtml,
  });
  if (internalError) {
    throw new Error(
      `Resend internal send failed: ${internalError.name ?? "unknown"} ${internalError.message ?? ""}`,
    );
  }

  // Auto-reply (best effort)
  let autoReplied = false;
  try {
    const replySubject = "【Genova】お問い合わせを受け付けました";
    const replyText = [
      `${payload.name} 様`,
      "",
      "この度は Genova株式会社へお問い合わせいただき、誠にありがとうございます。",
      "下記の内容で受け付けいたしました。3営業日以内にご返信いたします。",
      "",
      "────────────────────────────────",
      `■ お名前   ${payload.name}`,
      `■ 会社名   ${payload.company}`,
      `■ メール   ${payload.email}`,
      `■ 種別     ${categoryLabel}`,
      "■ 内容",
      payload.message,
      "────────────────────────────────",
      "",
      "※本メールは自動送信です。返信は不要です。",
      "",
      "—",
      "Genova株式会社",
      "https://genova.inc",
    ].join("\n");

    const replyHtml = `
<div style="font-family:'Hiragino Sans','Noto Sans JP',sans-serif;max-width:640px;margin:0 auto;color:#1A1A1A;line-height:1.8;">
  <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#4A7BC7;margin:0 0 8px;font-weight:700;">Auto-reply from Genova Inc.</p>
  <p>${escapeHtml(payload.name)} 様</p>
  <p>この度は Genova株式会社へお問い合わせいただき、誠にありがとうございます。<br>下記の内容で受け付けいたしました。<strong>3営業日以内にご返信いたします。</strong></p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;background:#FAFAF7;border-radius:8px;overflow:hidden;">
    <tbody>
      ${row("お名前", escapeHtml(payload.name))}
      ${row("会社名", escapeHtml(payload.company))}
      ${row("メール", escapeHtml(payload.email))}
      ${row("種別", escapeHtml(categoryLabel))}
      ${row("内容", nl2br(payload.message))}
    </tbody>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#737373;">※本メールは自動送信です。返信は不要です。</p>
  <hr style="border:none;border-top:1px solid #D4D4D4;margin:24px 0;">
  <p style="font-size:13px;color:#404040;">
    <strong>Genova株式会社</strong><br>
    <a href="https://genova.inc" style="color:#4A7BC7;">https://genova.inc</a>
  </p>
</div>`.trim();

    const { error: replyError } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM}>`,
      to: payload.email,
      subject: replySubject,
      text: replyText,
      html: replyHtml,
    });
    autoReplied = !replyError;
  } catch {
    autoReplied = false;
  }

  return { notified: true, autoReplied };
}

function row(label: string, value: string): string {
  return `
  <tr>
    <th style="text-align:left;padding:10px 12px;width:96px;background:#F5F5F0;border-bottom:1px solid #FFFFFF;font-weight:600;font-size:12px;letter-spacing:0.04em;color:#1A1A1A;">${escapeHtml(label)}</th>
    <td style="padding:10px 12px;border-bottom:1px solid #F5F5F0;color:#404040;">${value}</td>
  </tr>`;
}
