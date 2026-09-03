import type { ReactNode } from "react";
import { isUnlocked } from "@/lib/gate";
import GateScreen, { type GateVariant } from "./GateScreen";

/**
 * Wraps anything that needs a password.
 *
 *     export default function Page() {
 *       return (
 *         <Gate slug="acme" title="…" blurb="…">
 *           <CaseStudyPage data={data} />
 *         </Gate>
 *       );
 *     }
 *
 * `children` is only an unrendered React element until this component returns
 * it, so a locked page never renders its protected subtree and none of it
 * reaches the browser — not in the HTML, not in the RSC payload. That is the
 * whole reason the check lives here on the server rather than in the form.
 *
 * The password comes from the environment, keyed by `slug`; see src/lib/gate.ts.
 * A slug with no password configured stays locked for everyone.
 */
export default async function Gate({
  slug,
  variant,
  title,
  blurb,
  hint,
  children,
}: {
  slug: string;
  variant?: GateVariant;
  title?: string;
  blurb?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  if (await isUnlocked(slug)) return <>{children}</>;

  return (
    <GateScreen
      slug={slug}
      variant={variant}
      title={title}
      blurb={blurb}
      hint={hint}
    />
  );
}
