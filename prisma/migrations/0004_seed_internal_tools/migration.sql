-- Seed the Internal Tools list (en + jp) with names and descriptions.
-- Only runs when the table is empty, so databases that already have tools
-- (added by hand or in the dashboard) are left as they are.
INSERT INTO "internal_tool" ("locale", "name", "description", "position")
SELECT v.locale, v.name, v.description, v.position
FROM (VALUES
  ('en', 'Financial Tracker', 'A self-hosted budget dashboard that replaced my monthly spreadsheets. It tracks expenses and income by category, works out the minimum cost of living and savings runway, and estimates business tax and GST. Built with React, TypeScript and Node.js on PostgreSQL, with a script that imports years of old budget sheets.', 0),
  ('en', 'Productivity Tracker', 'A local-first, Jira-style kanban board for task projects and job searches. Custom statuses, drag-and-drop cards with tags, due dates and comments, and an overview of overdue work and recent activity. Built with React and a Node.js API on SQLite.', 1),
  ('en', 'Fitness Tracker', 'A training dashboard that brings together data from a Garmin watch, a gym log and a smart scale. Python ETL scripts import the exports, including GPS routes, and the dashboard charts progress, workouts and body composition.', 2),
  ('en', 'Invoice Manager', 'A self-hosted client, project and invoice manager for freelance work. Auto-numbered invoices with tax, reusable line items, PDF export, and a dashboard of active projects and outstanding totals. Built with Next.js, Prisma and PostgreSQL.', 3),
  ('jp', '家計管理ツール', '毎月の予算表の代わりに作った、セルフホスト型の家計ダッシュボード。カテゴリ別に支出と収入を記録し、最低生活費や貯蓄で生活できる期間、事業の税金と GST を計算します。React・TypeScript・Node.js と PostgreSQL で構築し、過去の予算表を取り込むスクリプトも用意しました。', 0),
  ('jp', '生産性トラッカー', 'タスク管理と就職活動のための、ローカルで動く Jira 風のカンバンボード。ステータスの自由な追加、タグ・期限・コメント付きカードのドラッグ＆ドロップ、期限切れのタスクや最近の動きをまとめた概要ページを備えています。React と Node.js の API、SQLite で構築。', 1),
  ('jp', 'フィットネストラッカー', 'Garmin ウォッチ、ジムの記録、体組成計のデータをまとめたトレーニングダッシュボード。Python の ETL スクリプトで GPS ルートを含むデータを取り込み、進捗・ワークアウト・体組成をグラフで表示します。', 2),
  ('jp', '請求書管理ツール', 'フリーランスの仕事のための、セルフホスト型の顧客・プロジェクト・請求書管理ツール。税金付きの自動採番請求書、再利用できる明細、PDF 出力、進行中のプロジェクトと未収金のダッシュボードを備えています。Next.js、Prisma、PostgreSQL で構築。', 3)
) AS v(locale, name, description, position)
WHERE NOT EXISTS (SELECT 1 FROM "internal_tool");
