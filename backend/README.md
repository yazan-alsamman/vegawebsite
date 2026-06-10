# VegaCore Backend

هذا مجلد الباك اند — API + قاعدة البيانات + رفع الصور + لوحة الإدارة.

## محتويات المجلد

```
backend/
├── index.ts          # نقطة التشغيل الرئيسية
├── database.ts       # SQLite database
├── seed.ts           # تعبئة المشاريع الأولية
├── middleware/       # JWT auth
└── routes/           # auth, projects, upload
```

## التشغيل محلياً

من جذر المشروع:

```bash
npm install
npm run build          # بناء الواجهة
npm run start          # تشغيل الباك اند + الموقع معاً
```

أو للتطوير:

```bash
npm run dev            # frontend :5173 + backend :3001
```

## الرفع على السيرفر

ارفع **المشروع كامل** (ليس مجلد backend لوحده) إلى السيرفر، ثم:

```bash
cd /var/www/vegacore
git pull origin main
npm install
cp .env.example .env   # عدّل كلمة المرور
npm run build
pm2 start ecosystem.config.cjs
```

## الملفات المهمة على السيرفر

| المسار | الوظيفة |
|--------|---------|
| `backend/` | كود الباك اند |
| `data/vegacore.db` | قاعدة البيانات |
| `uploads/` | صور المشاريع المرفوعة |
| `dist/` | الواجهة المبنية |
| `.env` | إعدادات الأمان |

## روابط

- Admin: `/admin/login`
- API health: `/api/health`
- المشاريع: `/api/projects`

## تسجيل الدخول الافتراضي

- Username: `admin`
- Password: `admin123` (غيّره في `.env` قبل النشر)
