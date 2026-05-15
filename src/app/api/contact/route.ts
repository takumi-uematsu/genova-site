import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validators";
import { sendContactNotification } from "@/lib/resend";
import { sendContactSlackNotification } from "@/lib/slack";
import type { ContactResponse } from "@/types/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonResponse(
      { success: false, message: "リクエスト形式が不正です。" },
      400,
    );
  }

  const { ok, errors, data } = validateContactPayload(json);
  if (!ok) {
    return jsonResponse(
      {
        success: false,
        message: "入力内容を確認してください。",
        errors,
      },
      400,
    );
  }

  try {
    // Email is mandatory; Slack is best-effort
    const [emailResult] = await Promise.all([
      sendContactNotification(data),
      sendContactSlackNotification(data).catch(() => false),
    ]);

    return jsonResponse(
      {
        success: true,
        message: emailResult.autoReplied
          ? "お問い合わせを受け付けました。3営業日以内にご返信します。確認メールをお送りしましたのでご確認ください。"
          : "お問い合わせを受け付けました。3営業日以内にご返信します。",
      },
      200,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[contact] send failed:", message);
    return jsonResponse(
      {
        success: false,
        message: "送信に失敗しました。しばらくしてから再度お試しください。",
      },
      500,
    );
  }
}

function jsonResponse(payload: ContactResponse, status: number): Response {
  return NextResponse.json(payload, { status });
}
