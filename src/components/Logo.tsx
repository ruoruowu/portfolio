/**
 * The "ru.wu" mark: r sits above the u on a shared stem, w and u share a
 * baseline. Read the right column downward for "ru", the bottom row across
 * for "wu" — the u belongs to both.
 *
 * Letter widths and stroke weight are Gabarito 600's own, measured off the
 * font file: width/x-height of 0.584 (r), 0.914 (u), 1.497 (w), stroke 0.266.
 * The letters are stroked paths rather than live text so the mark renders the
 * same in a browser tab, where no webfont is available. The same artwork lives
 * at src/app/icon.svg, which Next emits as the tab icon; edit both together.
 */
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="15" fill="var(--teal-500)" />
      <g
        fill="none"
        stroke="var(--cream-100)"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M41.95 10.4V23.6" />
        <path d="M41.95 15.4C41.95 12.2 44.5 10.4 47.66 10.4" />
        <path d="M41.95 40.4V47.775A5.825 5.825 0 0 0 53.6 47.775V40.4" />
        <path d="M10.4 40.4L15.94 53.6L21.48 45.68L27.01 53.6L32.55 40.4" />
      </g>
    </svg>
  );
}
