Bus Pay System PRO
===================
Backend + Frontend (frontend is served by backend)

Quick start (inside backend folder):
  1. copy .env.example to .env and set BUS_ADMIN_KEY
  2. npm install
  3. npm start
  4. Open http://localhost:3000 in your browser

API endpoints:
  POST /api/invoice  -> body { amount, memo }
  GET  /api/payments -> returns payments from LNbits

Make sure LNBITS_URL in .env points to your LNbits instance (eg. http://chirilicas.com:5000)
