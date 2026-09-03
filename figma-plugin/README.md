# Case Study Plates — Figma plugin

Builds the 23 case-study section templates as real auto-layout frames on
whatever Figma page you run it from. Same plates as the reference gallery,
same tokens as `src/app/globals.css`.

This exists because Figma has no write API. The REST API and the Figma MCP
connector are both read-only for design content — comments are the only thing
either can create. Frames can only be made by the Plugin API, which runs
inside Figma, so a plugin is the only way to inject layouts into a file.

## Install (once)

1. Figma desktop app → **Plugins → Development → Import plugin from manifest…**
2. Pick `figma-plugin/manifest.json` from this repo.

The desktop app is required; the browser version cannot load a local manifest.

## Run

1. Open the target file and select the page you want the plates on.
2. **Plugins → Development → Case Study Plates**

It builds a single `Case Study Plates` frame, parks it to the right of
anything already on the page so nothing is overlapped, selects it, and zooms
to fit. Re-running adds another copy rather than replacing the first — delete
the old one yourself if you don't want both.

## Fonts

Wants Gabarito, Hanken Grotesk and JetBrains Mono, matching the site. Any it
cannot load are substituted (Inter, Roboto Mono) and named in the completion
toast, so a silent fallback never passes for the real thing.

## Known limitation

Plate **D2**, the before/after wipe, builds as two side-by-side halves. Figma
has no `clip-path` equivalent, so the draggable wipe cannot be reproduced as
a static frame — rebuild it with component variants, or leave it to code.
