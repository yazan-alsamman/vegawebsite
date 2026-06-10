# VegaCore Backend (Node.js + MongoDB)

باك اند VegaCore مبني بـ **Node.js + Express + MongoDB (Mongoose)**.

## هيكل المجلد

```
backend/
├── index.ts          # تشغيل السيرفر
├── database.ts       # اتصال MongoDB
├── seed.ts           # تعبئة المشاريع الأولية
├── types.ts          # أنواع البيانات
├── models/
│   ├── Project.ts    # مشاريع البورتفوليو
│   └── AdminUser.ts  # مستخدم الأدمن
├── middleware/       # JWT auth
└── routes/           # API endpoints
```

## المتطلبات

- Node.js 18+
- **MongoDB** محلي أو [MongoDB Atlas](https://www.mongodb.com/atlas)

## الإعداد

```bash
cp .env.example .env
```

عدّل `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/vegacore
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
JWT_SECRET=long-random-secret
```

## التشغيل

```bash
npm install
npm run build          # بناء الواجهة
npm run start          # production: API + website
```

أو للتطوير:

```bash
npm run dev            # frontend :5173 + backend :3001
```

## API

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/health` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/projects` | No |
| POST | `/api/projects` | Admin |
| PUT | `/api/projects/:id` | Admin |
| DELETE | `/api/projects/:id` | Admin |
| POST | `/api/upload?type=project\|logo` | Admin |

## الرفع على السيرفر

```bash
git pull origin main
npm install
npm run build
pm2 start ecosystem.config.cjs
```

تأكد أن MongoDB شغّال على السيرفر أو استخدم MongoDB Atlas.

## تسجيل الدخول الافتراضي

- Username: `admin`
- Password: `admin123` (غيّره في `.env`)
