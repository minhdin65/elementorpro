# Vercel Deployment

## 1. Deploy

Connect your GitHub repo to Vercel. Vercel will use `vercel.json` for build settings.

## 2. Environment Variables

In Vercel Project Settings > Environment Variables, add:

| Variable | Description |
|----------|-------------|
| `ADMIN_USER` | Admin username (default: admin) |
| `ADMIN_PASS` | Admin password |
| `ADMIN_SECRET` | Secret for token validation |
| `REDIRECT_ENABLED` | `true` or `false` (fallback if no Blob) |
| `REDIRECT_URL` | Affiliate link (fallback if no Blob) |
| `VITE_PAYPAL_CLIENT_ID` | PayPal Client ID for checkout |

## 3. Vercel Blob (for Admin to save redirect config)

1. Go to your project > **Storage** tab
2. Create a **Blob store**
3. `BLOB_READ_WRITE_TOKEN` is auto-added

With Blob, the Admin can change redirect URL and toggle on/off via the UI. Without Blob, use `REDIRECT_ENABLED` and `REDIRECT_URL` env vars (change in dashboard, then redeploy).

## 4. Admin Panel

- URL: `https://your-domain.vercel.app/#/admin`
- Login: Use `ADMIN_USER` / `ADMIN_PASS`
