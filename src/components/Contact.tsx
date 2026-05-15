"use client";

import { useState, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import AmbientField from "@/components/AmbientField";
import { cn } from "@/lib/cn";
import type {
  ContactCategory,
  ContactPayload,
  ContactResponse,
} from "@/types/contact";

const CATEGORIES: Array<{ value: ContactCategory; label: string }> = [
  { value: "z-data", label: "Z-Dataについて" },
  { value: "partnership", label: "業務提携" },
  { value: "recruitment", label: "採用について" },
  { value: "media", label: "取材依頼" },
  { value: "other", label: "その他" },
];

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export default function Contact() {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    company: "",
    email: "",
    category: undefined,
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const update =
    <K extends keyof ContactPayload>(key: K) =>
    (value: ContactPayload[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as ContactResponse;

      if (json.success) {
        setStatus({ type: "success", message: json.message });
        setForm({
          name: "",
          company: "",
          email: "",
          category: undefined,
          message: "",
        });
        setErrors({});
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus({
          type: "error",
          message:
            json.message ?? "送信に失敗しました。入力内容をご確認ください。",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "通信エラーが発生しました。時間をおいて再度お試しください。",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32"
    >
      <AmbientField
        count={22}
        palette={["twilight", "sunsetPink", "windowLight"]}
        maxOpacity={0.6}
        sizeRange={[3, 6]}
        seed={4}
        safeZone={{ x0: 22, y0: 8, x1: 78, y1: 95 }}
      />

      <Container width="narrow" className="relative z-10">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="contact-heading"
            className="mt-3 text-[28px] leading-[1.25] tracking-[-0.02em] font-bold text-charcoal sm:mt-4 sm:text-[32px] lg:text-h1"
          >
            お問い合わせ
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p
            className="mt-6 max-w-xl text-[14px] leading-[1.85] text-ink-700 sm:mt-8 sm:text-[16px] sm:leading-[1.8]"
            style={{ wordBreak: "keep-all" }}
          >
            Z-Data のご紹介、業務提携、採用、取材に関するご相談を受け付けています。
            ミッションに共感いただける方からのご連絡を、お待ちしています。
          </p>
        </Reveal>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 space-y-5 sm:mt-16 sm:space-y-6"
          aria-busy={submitting}
        >
          <Field
            id="name"
            label="お名前"
            required
            error={errors.name}
            input={
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                autoComplete="name"
                maxLength={100}
                required
                className={inputClass(!!errors.name)}
              />
            }
          />
          <Field
            id="company"
            label="会社名"
            required
            error={errors.company}
            input={
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={(e) => update("company")(e.target.value)}
                autoComplete="organization"
                maxLength={100}
                required
                className={inputClass(!!errors.company)}
              />
            }
          />
          <Field
            id="email"
            label="メールアドレス"
            required
            error={errors.email}
            input={
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                autoComplete="email"
                maxLength={200}
                required
                className={inputClass(!!errors.email)}
              />
            }
          />
          <Field
            id="category"
            label="お問い合わせ種別"
            error={errors.category}
            input={
              <select
                id="category"
                name="category"
                value={form.category ?? ""}
                onChange={(e) =>
                  update("category")(
                    e.target.value === ""
                      ? undefined
                      : (e.target.value as ContactCategory),
                  )
                }
                className={cn(inputClass(false), "appearance-none bg-white pr-10")}
              >
                <option value="">選択してください</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            }
          />
          <Field
            id="message"
            label="お問い合わせ内容"
            required
            error={errors.message}
            input={
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(e) => update("message")(e.target.value)}
                rows={6}
                maxLength={5000}
                required
                className={inputClass(!!errors.message)}
              />
            }
          />

          {status.type === "error" && (
            <div
              role="alert"
              className="rounded-md border border-error/30 bg-error/5 p-4 text-[14px] text-error"
            >
              {status.message}
            </div>
          )}

          {status.type === "success" && (
            <div
              role="status"
              className="rounded-md border border-success/30 bg-success/10 p-4 text-[16px] text-success"
            >
              {status.message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-charcoal px-8 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:scale-[0.985] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:text-[16px]"
            >
              {submitting ? "送信中…" : "送信する"}
              {!submitting && <span aria-hidden>→</span>}
            </button>
          </div>

          <p className="text-[12px] leading-relaxed text-ink-500">
            送信前に
            <a
              href="/privacy"
              className="mx-1 text-twilight underline underline-offset-2 hover:text-charcoal"
            >
              プライバシーポリシー
            </a>
            をご確認ください。
          </p>
        </form>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  input,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-semibold text-charcoal"
      >
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </label>
      {input}
      {error && (
        <p className="mt-2 text-[13px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "block w-full rounded-sm border-[1.5px] bg-white px-4 py-3 text-[15px] text-charcoal placeholder-ink-500 transition-colors duration-200 focus:outline-none",
    hasError
      ? "border-error focus:border-error focus:ring-2 focus:ring-error/30"
      : "border-ink-300 focus:border-twilight focus:ring-2 focus:ring-twilight/20",
  );
}
