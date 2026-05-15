# Genova Inc. — Logo Usage Guide

ジェノバ株式会社のロゴデータ一式。

## 構成

```
Genova/
├── horizontal/   ← 横型コンビネーション（シンボル＋ロゴタイプ横並び）
├── vertical/     ← 縦型コンビネーション（シンボル上＋ロゴタイプ下）
├── symbol/       ← シンボルのみ（5本バー）
└── logotype/     ← ロゴタイプのみ（テキストのみ）
```

各フォルダに **color / black / white** の3色バリエーション。

## ブランド要素

| 要素 | 仕様 |
|---|---|
| シンボル | E — Signal（5本の縦バー、中央が最も高い） |
| 意味 | 信号・情報・洞察の集積。ビジネスのシグナルを捉える会社 |
| ロゴタイプ | DM Sans Bold（柔らかさ＋プロフェッショナル） |
| メインカラー | Charcoal `#1A1A1A` |
| サブカラー | Twilight Blue `#4A7BC7`（"Inc."のアクセント） |

## どれを使うべきか

| シーン | 推奨 |
|---|---|
| Webサイトヘッダー | `horizontal/genova_h_color.svg` |
| 提案書・PPT表紙 | `horizontal/genova_h_color.svg` |
| 名刺（白背景） | `horizontal/genova_h_color.svg` |
| 名刺（裏面ベタ色） | `horizontal/genova_h_white.svg` |
| 暗い背景・動画OP | `horizontal/genova_h_white.svg` |
| FAX・モノクロ印刷 | `horizontal/genova_h_black.svg` |
| ファビコン・SNSアイコン | `symbol/genova_symbol_color.svg` |
| 看板・正方形SNS投稿 | `vertical/genova_v_color.svg` |
| フッター・コピーライト | `logotype/genova_logotype_color.svg` |

## 色バリエーションの使い分け

- **color** — ブランドカラー版。ペーパー（明るい背景）でブランド表現したい時のメイン
- **black** — モノクロ黒。FAX、印刷物のサブセクション、白背景の文書
- **white** — モノクロ白（線画）。**暗い背景**で使う。動画・写真の上・ダーク背景LP

## やってはいけないこと

- ロゴの変形（縦横比を保つ）
- カラー以外の色への置き換え（緑のGenovaロゴ等NG）
- 余白を削って詰めて使う（ロゴ周囲にバー1本分のクリアスペースを確保）
- 5本のバーの本数を変える、形を変える
- ロゴタイプのフォント変更

## ファイル形式について

このフェーズではSVGのみ提供。サイズ展開（PNG / OGP / ファビコン用ico等）はブランド確定後にスクリプトで一括生成する。
