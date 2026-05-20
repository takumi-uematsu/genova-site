# Genova Inc. — Corporate Site

Genova株式会社のコーポレートサイト。`company.z-data.io` で公開する1ページLP。Next.js 14 (App Router) + TypeScript + Tailwind CSS で構築。

> 公開ドメイン構成
> - `https://z-data.io` → Z-Data 製品サイト（別 Vercel project: `zdata-site`）
> - `https://company.z-data.io` → Genova コーポレート（このプロジェクト）

## Quickstart

```bash
# 1. install deps
npm install

# 2. copy env file
cp env.example .env.local
# → .env.local を開いて値を埋める

# 3. dev server
npm run dev
# http://localhost:3000
```

## Scripts

| script | purpose |
| --- | --- |
| `npm run dev` | dev server（HMR） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番ビルドの起動 |
| `npm run lint` | ESLint |

## Environment variables

`env.example` を参照。本番では Vercel のダッシュボードに同名で登録すること。

| key | required | purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API（Contact フォーム送信） |
| `CONTACT_FROM_EMAIL` | yes | Resend で認証済みのドメインのアドレス（推奨：`noreply@z-data.io`） |
| `CONTACT_TO_EMAIL` | yes | カンマ区切りで複数指定可。社内通知の宛先 |
| `SLACK_WEBHOOK_URL` | no | 設定すると Slack にも通知。空なら無効 |
| `NEXT_PUBLIC_SITE_URL` | yes | オリジンのみ（例: `https://company.z-data.io`、末尾スラッシュなし）。OGP/sitemap/JSON-LD で使用 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | Google Analytics 4 の Measurement ID。空ならGA4 は読み込まれない |

## Tech

- Next.js 14.x (App Router) / React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion 11（軽量な fade / hover）
- Resend 4（Contact メール送信）
- Vercel（ホスティング想定）

## URL マップ（本番）

| 用途 | URL |
| --- | --- |
| トップ（1ページLP） | `https://company.z-data.io/` |
| プライバシーポリシー | `https://company.z-data.io/privacy` |
| OGP 画像 | `https://company.z-data.io/opengraph-image` |
| favicon | `https://company.z-data.io/icon` |
| apple-touch-icon | `https://company.z-data.io/apple-icon` |
| sitemap | `https://company.z-data.io/sitemap.xml` |
| robots | `https://company.z-data.io/robots.txt` |
| Contact API | `https://company.z-data.io/api/contact` |

## Directory

```
src/
  app/
    layout.tsx           # メタデータ・フォント・JSON-LD
    page.tsx             # トップページ（全セクションを縦に組む）
    globals.css
    api/contact/route.ts # Contact フォーム送信
    privacy/page.tsx     # プライバシーポリシー（簡易）
    sitemap.ts
    robots.ts
    opengraph-image.tsx  # OGP 画像（動的生成）
    icon.tsx             # favicon（動的生成）
    apple-icon.tsx       # apple-touch-icon
  components/
    Header.tsx Footer.tsx
    Hero.tsx About.tsx Mission.tsx Products.tsx Company.tsx Contact.tsx
    ui/ … 汎用 UI
  lib/
    resend.ts slack.ts validators.ts
  types/contact.ts
public/
  logos/genova/… logos/z-data/…
```

## Deploy (Vercel)

### 1. GitHub リポジトリ作成 → push

```bash
cd C:/Users/takumiuematsu/Documents/Genova/genova-site
git init
git add .
git commit -m "feat: initial Genova corporate site"
gh repo create genova-site --private --source=. --remote=origin --push
# 既に repo があれば: git remote add origin <url> && git push -u origin main
```

### 2. Vercel に Import

1. https://vercel.com/new でリポジトリを Import
2. Framework Preset は自動で「Next.js」
3. **Environment Variables** に登録（4 つ）：
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`（= `https://z-data.io`）
   - （任意）`SLACK_WEBHOOK_URL`
4. Deploy 押す → `https://<project>.vercel.app` が出る

### 3. 独自ドメイン `z-data.io` を紐付け

Vercel → Project → Settings → Domains で `z-data.io` を追加。  
Vercel が指示する DNS レコードを、ドメインレジストラ（Cloudflare / お名前ドット等）に登録：

- `A` レコード（apex）: `76.76.21.21`（または Vercel が指示する IP）
- もしくは `CNAME` レコード（`www`）: `cname.vercel-dns.com`

SSL は Vercel が自動取得。  
`https://z-data.io/company` で本番アクセス可能になる。

### 4. Resend ドメイン認証

- Resend ダッシュボード → Domains → `z-data.io` を Add
- 表示される SPF / DKIM / DMARC レコードをドメインレジストラに登録
- 認証完了後、`noreply@z-data.io` から送信可能

## Open items

- [ ] Resend ドメイン認証完了
- [ ] SNS アカウント取得後、`Footer.tsx` の `href="#"` を差し替え
- [ ] `/products/z-data/`（プロダクトサイト本体）実装
- [ ] `/privacy` 本文の法務確認
- [ ] z-data.io のルート (`/`) で表示する Z-Data プロダクトサイト（別プロジェクト想定）
