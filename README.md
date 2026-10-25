# MDA Softech Solutions website

Responsive React website for MDA Softech Solutions with a Vite build, Express API and MongoDB enquiry storage.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` to a MongoDB database you control.
4. Run the frontend with `npm run dev` (Vite serves the site at `http://localhost:5173`).
5. In another terminal run `npm start` for the Express API at port 5000. Vite forwards local `/api` requests to it.

## Deploy to Vercel

1. Push this project to a Git provider and import it in Vercel, or run `npx vercel` from the project folder.
2. Keep the build command as `npm run build` and output directory as `dist` (also set in `vercel.json`).
3. In Vercel project settings, add `MONGODB_URI` for Production and Preview environments. The database must accept connections from Vercel.
4. Deploy. The Express API is exposed through `/api/*`; the health check is `/api/health`.

The frontend can be deployed without a database, but the enquiry form will show that it is unavailable until `MONGODB_URI` is configured. Calls and email links work without the API.

## Business details

The contact email is kept as supplied (`admin@mdasoftechsolusion.com`), including the spelling “solusion”. Please verify the domain spelling before launch. Brand artwork from the old site was not embedded because the supplied image links use the same possibly misspelled domain; the new site uses an original CSS illustration instead.
