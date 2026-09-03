This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Password-protected pages

Wrap anything that needs a password in `<Gate>`:

```tsx
import Gate from "@/components/gate/Gate";

export default function Page() {
  return (
    <Gate
      slug="acme-nda"
      variant="blueprint"
      title="This one's under wraps"
      blurb="…"
      hint={<>Email me for the password.</>}
    >
      <CaseStudyPage data={data} />
    </Gate>
  );
}
```

The check runs on the server, so a locked page never sends the protected
content to the browser — not in the HTML, not in the RSC payload. Unlocking
posts to `/api/gate`, which sets an httpOnly cookie scoped to that one `slug`;
`DELETE /api/gate?slug=…` locks it again.

Passwords come from the environment (see `.env.example`):

| Variable                | Meaning                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `GATE_PASSWORD`         | Fallback password for every gate                              |
| `GATE_PASSWORD_<SLUG>`  | Overrides it for one gate — `acme-nda` → `GATE_PASSWORD_ACME_NDA` |
| `GATE_SECRET`           | Optional. Keys the cookie digest independently of the password |
| `GATE_LAB`              | Set to `1` to expose the preview routes on a deployed site     |

A gate with no password configured stays locked for everyone: a forgotten
variable hides a page rather than publishing it.

`variant` picks the unlock animation — `blueprint`, `draw`, or `paper`. Compare
them at **/lab/gate** (dev only, password `open`); **/lab/gate/live** is the
same gate wired to a real cookie, for checking a deploy's configuration.
