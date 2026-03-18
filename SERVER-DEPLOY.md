# Server deployment

## Environment variables (.env on server)

Create a `.env` file in the project root with:

```
# Admin login
ADMIN_USER=admin
ADMIN_PASS=Minhlam1122@
ADMIN_SECRET=elementor-skin-admin-2025

# PayPal (optional, for checkout)
VITE_PAYPAL_CLIENT_ID=your_client_id
```

## Run on server

```bash
npm install
npm run build
npm run start
```

Or with PM2 (recommended):

```bash
npm install
npm run build
pm2 start server/index.js --name elementor-skin
pm2 save
pm2 startup
```

Set PORT if needed: `PORT=80 pm2 start server/index.js --name elementor-skin`

## Admin panel

- URL: `https://your-domain.com/#/admin`
- Login: admin / Minhlam1122@
