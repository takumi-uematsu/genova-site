import type { ContactCategory, ContactPayload } from "@/types/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CATEGORIES: ContactCategory[] = [
  "z-data",
  "partnership",
  "recruitment",
  "media",
  "other",
];

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
  data: ContactPayload;
}

export function validateContactPayload(input: unknown): ValidationResult {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  const obj = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;

  const name = trim(obj.name).slice(0, 100);
  const company = trim(obj.company).slice(0, 100);
  const email = trim(obj.email).slice(0, 200);
  const message = trim(obj.message).slice(0, 5000);
  const rawCategory = trim(obj.category);
  const category =
    rawCategory && (VALID_CATEGORIES as string[]).includes(rawCategory)
      ? (rawCategory as ContactCategory)
      : undefined;

  if (!name) errors.name = "お名前を入力してください。";
  if (!company) errors.company = "会社名を入力してください。";
  if (!email) errors.email = "メールアドレスを入力してください。";
  else if (!EMAIL_RE.test(email))
    errors.email = "正しい形式のメールアドレスを入力してください。";
  if (!message) errors.message = "お問い合わせ内容を入力してください。";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { name, company, email, category, message },
  };
}

function trim(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim();
}
