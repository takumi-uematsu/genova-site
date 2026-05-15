import type { ContactPayload } from "@/types/contact";
import { CATEGORY_LABEL } from "@/types/contact";

const WEBHOOK = process.env.SLACK_WEBHOOK_URL ?? "";

export function isSlackEnabled(): boolean {
  return WEBHOOK.length > 0;
}

export async function sendContactSlackNotification(
  payload: ContactPayload,
): Promise<boolean> {
  if (!isSlackEnabled()) return false;

  const categoryLabel = payload.category
    ? CATEGORY_LABEL[payload.category]
    : "（未選択）";

  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: "📨 Genova お問い合わせ", emoji: true },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*お名前*\n${escape(payload.name)}` },
        { type: "mrkdwn", text: `*会社名*\n${escape(payload.company)}` },
        {
          type: "mrkdwn",
          text: `*メール*\n<mailto:${encodeURIComponent(payload.email)}|${escape(payload.email)}>`,
        },
        { type: "mrkdwn", text: `*種別*\n${escape(categoryLabel)}` },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*内容*\n${escape(payload.message).slice(0, 2800)}`,
      },
    },
    { type: "divider" },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `:clock3: ${formatTimestamp()}`,
        },
      ],
    },
  ];

  const body = {
    text: `📨 Genova お問い合わせ — ${payload.company} ${payload.name} 様 (${categoryLabel})`,
    blocks,
  };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatTimestamp(d = new Date()): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
