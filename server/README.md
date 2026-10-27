# PetalWish API (Backend & Database)

Node.js + Express 5 REST API with MongoDB (Mongoose) and JWT authentication.

## Quick start

```bash
cd server
npm install
cp .env.example .env        # then fill in MONGODB_URI and JWT_SECRET
npm run dev                 # http://localhost:5000/api  (frontend at http://localhost:5000)
```

No database yet? `npm run dev:memory` runs the API against a temporary in-memory MongoDB (the data is lost on exit).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start with auto-reload, using `MONGODB_URI` |
| `npm run dev:memory` | Start with a throw-away in-memory MongoDB |
| `npm start` | Production start |
| `npm run seed` | Insert/update the 40 templates (+ admin account if `ADMIN_EMAIL`/`ADMIN_PASSWORD` set) and build indexes |
| `npm run extract-templates` | Re-generate `src/data/templates.json` from `../script.js` after adding templates there |
| `npm test` | 35 API tests against an in-memory database |

## How the website uses the API

`api.js` (repository root) is a small `fetch` client exposed as `window.PetalWishAPI`, and `script.js` uses it for:

- **Login and sign-up:** real accounts with password checks. The JWT is kept in `localStorage` (`petalwish_token_v1`) and checked against `/auth/me` on page load. An expired or revoked token signs the user out with a message.
- **Templates:** loaded from MongoDB on start-up, including premium badges and per-user `isFavorite`/`isOwned` flags. If the server is not running, the site falls back to the built-in templates in `script.js`.
- **Favorites and My Designs:** stored in the account when signed in. Guests can still use them, saved on the device, and that guest data is moved into the account the first time they log in.
- **Demo buttons** in the login modal sign in to real seeded accounts (`elena@example.com`, `julian@example.com`, `sarah@example.com`, password `petalwish2026`). These are created automatically unless `NODE_ENV=production` or `SEED_DEMO_USERS=false`.

When the page is served from another local port (for example `python -m http.server 8000`), `api.js` calls `http://localhost:5000/api` automatically. For a deployed frontend, set `window.PETALWISH_API_BASE = 'https://your-api.example.com/api'` before `api.js` loads, and add that site to `CLIENT_ORIGIN`.

RSVPs and email sharing still use `localStorage`/EmailJS. They belong to the RSVP and email module (Member 3).

## Connecting MongoDB Atlas

1. Create a free **M0** cluster at <https://cloud.mongodb.com>.
2. **Database Access**: add a database user with a password, and give it the *Read and write to any database* role.
3. **Network Access**: add your IP address. For hosted deployments such as Render, add `0.0.0.0/0`.
4. **Connect → Drivers**: copy the connection string into `server/.env`, putting the database name before `?`:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.xxxxx.mongodb.net/petalwish?retryWrites=true&w=majority
   ```
   If your password contains special characters (`@ : / ? # %`), URL-encode them.
5. Run `npm run seed` once, then `npm run dev`. The log should say `Connected to MongoDB (petalwish)`.

## Project structure

```
server/
├── src/
│   ├── app.js              Express app: security headers, CORS, JSON, routes, static frontend
│   ├── server.js           Connects to MongoDB, seeds templates, starts listening
│   ├── config/             env.js (validated environment), db.js (Mongoose connection)
│   ├── models/             User, Template, Design, Favorite, Payment
│   ├── validators/         Zod schemas for every request body / query / param
│   ├── middleware/         auth (JWT), validate, errorHandler, rateLimiters
│   ├── controllers/        Request handlers
│   ├── routes/             URL → controller mapping
│   ├── services/           token, template (seeding/lookup), payment (DB layer for Razorpay)
│   └── data/templates.json Seed catalogue extracted from the frontend
├── scripts/                seed, dev-memory, extract-templates
└── tests/                  node:test + supertest
```

## API reference

Base URL: `http://localhost:5000/api`. Every response uses one of these shapes:

```jsonc
{ "success": true, "data": { ... }, "meta": { "page": 1, "limit": 20, "total": 40, "totalPages": 2 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Validation failed",
  "details": [{ "location": "body", "field": "email", "message": "Please enter a valid email address" }] } }
```

Authenticated routes need the header `Authorization: Bearer <token>`.

### Auth: `/api/auth`

| Method | Path | Auth | Body | Notes |
| --- | --- | --- | --- | --- |
| POST | `/register` | – | `{ name, email, password }` | Password: 8+ characters with a letter and a number. Returns `{ token, tokenType, expiresAt, user }` |
| POST | `/login` | – | `{ email, password }` | Same response as register. Rate-limited to 20 failed attempts per 15 minutes |
| GET | `/me` | ✔ | – | Current user |
| PATCH | `/me` | ✔ | `{ name?, avatarUrl? }` | Update profile |
| PATCH | `/me/password` | ✔ | `{ currentPassword, newPassword }` | Returns a new token. Revokes all other sessions |
| POST | `/logout-all` | ✔ | – | Revokes every token for this user. For a normal logout, the client just deletes its token |

### Templates: `/api/templates`

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/` | optional | Query: `q`, `category` (Wedding, Birthday, Baby & Kids, Party, All), `style`, `color`, `orientation`, `tag`, `premium`, `trending`, `includeElements` (default `true`), `sort` (featured, newest, oldest, popular, title), `page`, `limit` (max 100, default 50). Signed-in users also get `isFavorite` and `isOwned` |
| GET | `/filters` | optional | Distinct categories, styles, colours and orientations, with counts |
| GET | `/:idOrSlug` | optional | e.g. `/api/templates/birthday-zoe-13` |
| POST | `/` | admin | Create a template |
| PATCH | `/:idOrSlug` | admin | Partial update |
| DELETE | `/:idOrSlug` | admin | Also removes it from everyone's favorites |

Template shape: `{ id, slug, title, category, style, color, orientation, tags, bg, elements, isPremium, price (paise), currency, isTrending, favoritesCount, usageCount, ... }`. `slug` is the `id` the current frontend uses.

### Designs: `/api/designs` (all routes need auth; users only ever see their own)

| Method | Path | Body / Query | Notes |
| --- | --- | --- | --- |
| GET | `/` | `q`, `status`, `sort` (updated, created, title), `page`, `limit` | List view omits `elements` and `surfaces` |
| POST | `/` | `{ templateId? , title?, bg?, elements?, surfaces?, thumbnail?, status? }` | With `templateId` (id or slug), the canvas is copied from the template. Otherwise `bg` is required |
| GET | `/:id` | – | Full design for the editor |
| PATCH | `/:id` | any of `title, category, bg, elements, surfaces, thumbnail, status` | Autosave target |
| DELETE | `/:id` | – | |
| POST | `/:id/duplicate` | `{ title? }` | |

`surfaces` keys: `front`, `insideLeft`, `insideRight`, `back`. Each is `{ bg, elements }`, exactly as `script.js` stores them. Canvas elements need `id, type, x, y, width, height`. Other styling properties such as `fontSize` and `color` are stored as they are.

### Favorites: `/api/favorites` (auth)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/` | Favourite templates, newest first |
| GET | `/ids` | `{ ids: [...], slugs: [...] }` for heart icons |
| POST | `/:templateIdOrSlug` | Idempotent: 201 the first time, 200 after that |
| DELETE | `/:templateIdOrSlug` | Idempotent |
| POST | `/sync` | `{ templateIds: [...] }` imports favorites from `localStorage` after the first login |

### Payments: `/api/payments` (auth, read-only)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/` | The user's payments. Query: `status`, `page`, `limit` |
| GET | `/summary` | Totals paid and refunded, plus counts per status |
| GET | `/:id` | One payment, with item templates populated |
| GET | `/admin/all` | Admin only. Query: `status`, `userId`, `from`, `to`. Includes totals |

### File uploads with Multer

Uploads use `multipart/form-data` with the file in the field **`image`**. Allowed types are PNG, JPEG, WEBP and GIF, up to `MAX_UPLOAD_MB` (default 5 MB). All upload routes need auth.

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/uploads/images` | Image for a card in the editor. Returns `{ id, url, path, filename, size, ... }` |
| GET | `/api/uploads` | The user's uploads. Query: `kind`, `page`, `limit` |
| GET / DELETE | `/api/uploads/:id` | Own uploads only. DELETE also removes the file from disk |
| PUT / DELETE | `/api/auth/me/avatar` | Profile picture. A new one replaces the old file |
| PUT | `/api/designs/:id/thumbnail` | Design preview image (owner only). Deleted together with the design |
| PUT | `/api/templates/:idOrSlug/thumbnail` | Template cover image (admin only) |

How it works:
- **Multer** (`src/middleware/upload.js`) saves files with `diskStorage` to `server/uploads/<kind>/` under a random file name. The user's original file name is never used on disk.
- Each file is checked twice: `fileFilter` checks the MIME type, then the server reads the file's first bytes to confirm it really is that image format. A renamed `.html` or `.exe` file is rejected, and SVG is not accepted because it can contain scripts.
- Every file gets a document in the **`uploads`** collection (`owner`, `kind`, `filename`, `originalName`, `mimetype`, `size`, `path`, `design`/`template`).
- If a request fails after Multer saved the file (wrong owner, invalid image…), the error handler deletes the file.
- Files are served at `/uploads/...`. `server/uploads/` is in `.gitignore`.
- In the editor, a logged-in user's image is uploaded and the design stores only its URL. Guests, or a failed upload, fall back to embedding the image in the design as before.

When deploying to a host with a temporary disk (e.g. Render's free tier), uploaded files are lost on redeploy unless a persistent disk is attached. Set `PUBLIC_URL` so image links use the public address.

## Payment database (for the Razorpay module)

The `payments` collection stores these fields:

| Field | Type | Notes |
| --- | --- | --- |
| `razorpay_order_id` | string, unique | From `razorpay.orders.create` |
| `razorpay_payment_id` | string, unique (sparse) | Set after the user pays |
| `amount` | number (paise) | Must equal the sum of the item prices (checked by the schema) |
| `status` | `created`, `attempted`, `paid`, `failed`, `refunded` | |
| `userId` | ObjectId → User | |
| `items` | `[{ kind, template, sku, name, unitPrice, quantity }]` | Prices come from the database, never from the client |
| `createdAt` / `updatedAt` | Date | Automatic |
| also | `razorpay_signature` (hidden), `currency`, `receipt`, `method`, `email`, `contact`, `amountPaid`, `attempts`, `failure{}`, `refund{}`, `paidAt`, `notes`, `events[]` | `events` holds an audit trail of every status change and webhook |

Use the helpers in `src/services/payment.service.js` rather than writing to the model directly:

```js
import { buildTemplateItems, totalOf, createPaymentRecord, markPaymentPaid, markPaymentFailed,
         markPaymentAttempted, markPaymentRefunded, userOwnsTemplate } from '../services/payment.service.js';

// POST /api/payments/orders  { templateIds: ['wedding-luxury'] }
const items = await buildTemplateItems(req.user, req.body.templateIds); // rejects free/owned/unknown
const order = await razorpay.orders.create({ amount: totalOf(items), currency: 'INR', receipt: `rcpt_${Date.now()}` });
await createPaymentRecord({ user: req.user, order, items });

// POST /api/payments/verify, after checking the HMAC signature
await markPaymentPaid({ razorpay_order_id, razorpay_payment_id, razorpay_signature, source: 'checkout' });
```

`markPaymentPaid` runs in a transaction and is idempotent, so both the checkout callback and the `payment.captured` webhook can call it. It adds the templates to `user.purchasedTemplates`, which turns `isOwned` true. A full refund removes them again.

## Security notes

- Passwords are hashed with bcrypt and are never included in responses.
- JWTs are signed with HS256 and include a `tokenVersion`, so a password change or logout-all revokes old tokens.
- Every input is validated with Zod and unknown fields are rejected. This blocks role escalation and `$`-operator injection.
- Login and registration are rate-limited, and Helmet sets security headers. CORS is restricted to `CLIENT_ORIGIN`.
- Only `index.html`, `style.css`, `script.js` and `assets/` are served publicly. `server/` and `.env` never are.
