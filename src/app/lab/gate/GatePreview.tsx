"use client";

import { useState } from "react";
import GateScreen, { type GateVariant } from "@/components/gate/GateScreen";
import styles from "./GatePreview.module.css";

const VARIANTS: { id: GateVariant; label: string; note: string }[] = [
  {
    id: "blueprint",
    label: "Blueprint resolve",
    note: "Drafting sheet in teal line-work; the password puts the colour in, sweeping down the card.",
  },
  {
    id: "draw",
    label: "Drafting pen",
    note: "Four strokes box the card in, then a coral stamp lands on success.",
  },
  {
    id: "paper",
    label: "Paper peel",
    note: "A dog-eared sheet — tug it on hover, and unlocking peels it off the page.",
  },
];

/** The demo checks this in the browser. No real gate uses a literal password. */
const DEMO_PASSWORD = "open";

export default function GatePreview() {
  const [variant, setVariant] = useState<GateVariant>("blueprint");
  const [unlocked, setUnlocked] = useState(false);
  /* Bumping this remounts the gate, which is what replays its entrance. */
  const [run, setRun] = useState(0);

  const reset = () => {
    setUnlocked(false);
    setRun((n) => n + 1);
  };

  const active = VARIANTS.find((v) => v.id === variant)!;

  return (
    <>
      {unlocked ? (
        <div className={styles.unlocked}>
          <span className={styles.stampLabel}>Unlocked</span>
          <h1>This is where the protected page appears.</h1>
          <p>
            In a real gate the server has now sent the case study for the first
            time — it was never in the page before this moment.
          </p>
          <button type="button" onClick={reset}>
            Lock it again
          </button>
        </div>
      ) : (
        <GateScreen
          key={`${variant}-${run}`}
          slug="preview"
          variant={variant}
          demoPassword={DEMO_PASSWORD}
          onUnlocked={() => setUnlocked(true)}
          hint={
            <>
              Preview only — the password is <code>{DEMO_PASSWORD}</code>.
            </>
          }
        />
      )}

      <div className={styles.bar}>
        <div className={styles.switcher} role="group" aria-label="Animation">
          {VARIANTS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={option.id === variant ? styles.on : undefined}
              aria-pressed={option.id === variant}
              onClick={() => {
                setVariant(option.id);
                setUnlocked(false);
                setRun((n) => n + 1);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className={styles.note}>{active.note}</p>
        <button type="button" className={styles.replay} onClick={reset}>
          Replay
        </button>
      </div>
    </>
  );
}
