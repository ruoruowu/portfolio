/**
 * The "ru.wu" mark: "ru" over "wu" on a teal tile, the period a coral dot.
 *
 * Drawn as strokes rather than real type so it renders identically wherever it
 * lands — a browser tab has no Gabarito to load. The same artwork lives at
 * src/app/icon.svg, which Next emits as the tab icon; edit both together.
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
      <rect width="64" height="64" rx="15" fill="var(--teal-700)" />
      <g transform="translate(32 32) scale(1.1) translate(-32.5 -31.5)">
        <g
          fill="none"
          stroke="var(--cream-100)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 27V14" />
          <path d="M20.5 19.5C20.5 15.5 23.5 14 27 14" />
          <path d="M36 14v8.5a4.5 4.5 0 0 0 9 0V14" />
          <path d="M12 36l4 13 4-9.5 4 9.5 4-13" />
          <path d="M36 36v8.5a4.5 4.5 0 0 0 9 0V36" />
        </g>
        <circle cx="52.75" cy="46.25" r="2.75" fill="var(--coral-500)" />
      </g>
    </svg>
  );
}
