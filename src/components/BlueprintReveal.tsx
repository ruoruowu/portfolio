import styles from "./BlueprintReveal.module.css";

/**
 * The drafting furniture Home is drawn on before it resolves into colour:
 * grid, sheet border, lettered gridline bubbles, a dimension string and the
 * title block.
 *
 * Markup only — no state, no effect, no client bundle. The phase this reacts
 * to lives in `data-bp` on <html>, set and cleared entirely by the inline
 * script in the root layout, which is what makes the sequence impossible to
 * strand: the code that raises the sheet is the code that takes it down.
 * Everything here is inert (hidden, `pointer-events: none`) unless that
 * attribute says otherwise, so a repeat visitor pays nothing for it.
 */
export default function BlueprintReveal() {
  return (
    <div className={styles.sheet} data-bp-sheet aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.frame} />

      {/* Column gridlines with their bubbles, aligned to the 980px page column. */}
      <div className={styles.columns}>
        {["A", "B", "C"].map((letter) => (
          <div key={letter} className={styles.column}>
            <span className={styles.bubble}>{letter}</span>
          </div>
        ))}
      </div>

      {/* The page container's own width, dimensioned the way a plan would. */}
      <div className={styles.widthDim}>
        <span className={styles.dimValue}>980</span>
      </div>

      <div className={styles.titleBlock}>
        <div className={styles.titleRow}>
          <span>RUOCHEN WU</span>
          <span>SHT 01</span>
        </div>
        <div className={styles.titleRow}>
          <span>HOME — INDEX</span>
          <span>1:1</span>
        </div>
        <div className={styles.titleNote}>ISSUED FOR REVIEW</div>
      </div>
    </div>
  );
}
