import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Genova株式会社のプライバシーポリシー。個人情報の取り扱いに関する基本方針。",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[120px] pb-32">
        <div className="container max-w-narrow">
          <p className="text-eyebrow uppercase text-twilight">PRIVACY POLICY</p>
          <h1 className="mt-4 text-h1 md:text-h1 text-[32px] leading-tight tracking-tight">
            プライバシーポリシー
          </h1>

          <div className="mt-12 space-y-8 text-ink-700 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-4">
            <p>
              Genova株式会社（以下「当社」）は、当社が提供するサービス（以下「本サービス」）における、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
            </p>

            <h2>1. 取得する情報</h2>
            <p>
              当社は、お問い合わせフォーム等を通じて、氏名・会社名・メールアドレス・お問い合わせ内容を取得します。
            </p>

            <h2>2. 利用目的</h2>
            <p>
              取得した情報は、(1) お問い合わせへの返信、(2) サービスのご案内、(3)
              当社事業に関するご連絡、(4) 統計的なデータの作成、を目的として利用します。
            </p>

            <h2>3. 第三者提供</h2>
            <p>
              当社は、法令に基づく場合を除き、ご本人の同意なく取得した情報を第三者に提供しません。
            </p>

            <h2>4. 安全管理措置</h2>
            <p>
              当社は、取得した情報の漏えい・滅失・毀損を防止するため、合理的な安全管理措置を講じます。
            </p>

            <h2>5. お問い合わせ窓口</h2>
            <p>
              本ポリシーに関するお問い合わせは、当サイトの
              <Link href="/#contact" className="text-twilight underline underline-offset-2 mx-1">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>

            <h2>6. 改定</h2>
            <p>
              本ポリシーの内容は、必要に応じて、ユーザーに通知することなく変更することがあります。変更後の内容は当ページに掲載した時点から効力を生じます。
            </p>

            <p className="!mt-16 text-bodysm text-ink-500">制定日: 2026年5月1日</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
