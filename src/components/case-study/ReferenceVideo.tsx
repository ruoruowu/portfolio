"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/*
 * The server cannot know the preference, so it renders the moving version and
 * the client corrects it. That way the default — motion allowed — costs no
 * flash, and the correction only happens for the visitors who asked for it.
 */
const getServerSnapshot = () => false;

/**
 * A reference figure that moves. Loops silently by default; under reduced
 * motion it becomes a still frame with controls, so the visitor decides
 * whether it plays rather than the page deciding for them.
 *
 * `poster` carries the alt text's job: a <video> has no alt, so the label
 * underneath the figure is what a screen reader gets, and the element is
 * marked decorative rather than announcing an empty node.
 */
export default function ReferenceVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <video
      className={className}
      src={src}
      poster={poster}
      preload={reduced ? "none" : "metadata"}
      controls={reduced}
      autoPlay={!reduced}
      loop={!reduced}
      muted
      playsInline
      aria-hidden={!reduced}
      tabIndex={reduced ? undefined : -1}
    />
  );
}
