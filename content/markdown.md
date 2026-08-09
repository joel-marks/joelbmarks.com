---
title: "Markdown"
url: "/markdown/"
date: 2000-01-01
hideMeta: true
# Internal reference page: keep it out of the sitemap and out of the index.
# robotsNoIndex is PaperMod's own flag (layouts/_partials/head.html) and flips
# the single robots meta to "noindex, nofollow".
sitemap:
  disable: true
robotsNoIndex: true
---

## Git gfm cheatsheet

GitHub Flavored Markdown (GFM) is the dialect of Markdown used by GitHub — extending CommonMark with tables, fenced code blocks, task lists, strikethrough, and autolinks. This page renders a sample of those features as a typography and styling reference.

## Sample

# Heading 1 — wire title
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Body text & emphasis

A longer body paragraph to judge serif reading rhythm at length. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Here is some `inline code`, a [sample link](/about/), **bold text**, *italic text*, and ~~struck-through~~ words within a sentence.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.[^1]

> A blockquote, to test the quoted-text treatment. "The site does heavy lifting because there is no social media funnel." — set in the body serif, slightly indented.

## Lists

Unordered, with nesting:

- First item
- Second item
  - Nested item one
  - Nested item two
- Third item

Ordered:

1. Read the brief
2. Scaffold the site
3. Propose, then commit

Task list:

- [x] Files created
- [x] Theme toggle moved right
- [ ] Real copy supplied

## Code

Inline `const x = 42;` then a fenced block (highlighting disabled by config):

```js
async function fetchPublishedPapers(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const papers = await response.json();
  return papers.filter((paper) => paper.status === "published");
}
```

```bash
hugo server --port 1313
```

## Table

| Role  | Font           | Weight  |
| ----- | -------------- | ------- |
| Title | Raleway        | 200–300 |
| Sans  | Inter          | 200–700 |
| Body  | Source Serif 4 | 400/600 |

---

Horizontal rule above. Final paragraph after the divider to confirm spacing returns to normal body rhythm.

[^1]: A footnote, to test footnote rendering and the back-reference link. This text should be sans-serif and slightly smaller than the body.