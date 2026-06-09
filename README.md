# joelbmarks.com

The personal site of Joel B. Marks, independent AI governance and editorial
consultant. Built with [Hugo](https://gohugo.io/) on an extended
[PaperMod](https://github.com/adityatelange/hugo-PaperMod) base, deployed to GitHub Pages.

Live: https://joelbmarks.com

## About

Joel B. Marks advises values-led and mission-driven organisations on AI governance in
editorial and publishing practice. The centrepiece of the site is the published
"Capability-First Framework for Responsible AI Adoption", alongside an overview of the
Editorial AI Standards Review.

- Site: https://joelbmarks.com
- LinkedIn: https://linkedin.com/in/joelbmarks

## Stack

- Hugo extended, pinned to 0.160.1 locally and in CI
- PaperMod theme, included as a git submodule and never modified directly
- Overrides and additions in `assets/css/extended/` and the project layout tree
- GitHub Pages, deployed via GitHub Actions on push to `main`

## What this adds over PaperMod

PaperMod provides the base. This site extends it well beyond a standard theme
configuration:

- A custom `papers` section with dedicated list and single templates, presented as
  two-column document-icon cards
- A published whitepaper rendered with diagrams: a hand-drawn-style Mermaid flowchart
  and a flat, harmonised quadrant
- Per-paper PDF generation in CI (see Deployment), with a download link on each paper
- Theme-aware code blocks: Chroma highlighting that tracks light and dark mode,
  bordered, wrapping, with a copy-to-clipboard button
- Phosphor icons surfaced through a reusable icon partial
- A button component with optional icon and spacer
- A warm light and dark theme, built with vanilla CSS overrides rather than forked
  theme files

All extensions use Hugo's current template system (`layouts/_partials`, `_shortcodes`,
`_markup`, and section templates under `layouts/papers/`), keeping the PaperMod
submodule untouched.

## Local development

```
hugo server
```

Draft and future-dated content is excluded by default. `buildFuture` is off; the site
is never served with `-F`.

## Deployment

A push to `main` triggers the GitHub Actions workflow, which:

1. Checks out the repository with the PaperMod submodule
2. Builds the site with Hugo extended
3. Runs a headless-Chromium step (Playwright) that renders each published paper and
   prints a PDF to its slug URL
4. Uploads the build, including the generated PDFs, as the Pages artifact and deploys it

PDFs are generated in CI on every deploy and are never committed. The custom domain is
managed by `static/CNAME`.

## How it was built

The site was developed iteratively using a two-instance workflow: Joel B. Marks as
architect and strategist, setting scope and direction, with Claude Code running in
VSCode to carry out file edits, Hugo configuration, and git operations against an
agreed brief. The specification, design decisions, and copy are Joel's own; the
implementation was executed and verified through that paired process.
