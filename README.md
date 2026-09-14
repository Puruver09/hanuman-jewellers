# Hanuman Jewellers — Premium Bullion & Jewellery Website

A premium white, ivory and gold Next.js website for Hanuman Jewellers, redesigned using the **information architecture and bullion-focused feel** of the supplied Magna Bullion reference while using original Hanuman Jewellers branding and copy.

## Rate source

The primary market reference is **India Bullion & Jewellers Association (IBJA)**: https://ibja.co/

- Gold 999, 22K, 20K and 18K are read from the official IBJA homepage when available.
- The site links visitors to IBJA as the authoritative source page.
- Silver 999/kg can be populated from your licensed IBJA feed with `IBJA_SILVER_RATE_INR_KG`.
- Rates are explicitly described as indicative and exclusive of applicable GST/making charges.

## Environment

Create `.env.local` if you have a licensed current silver feed:

```env
IBJA_SILVER_RATE_INR_KG=123456
```

## Run

```bash
npm install
npm run dev
```

## Deploy

Deploy the project to Vercel or another Node/Next.js host. Add the environment variable above in the deployment settings if required.
