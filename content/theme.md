---
title: "Theme additional"
url: "/theme/"
date: 2000-01-01
---

## Custom CSS components (additional to PaperMod theme)

### Buttons

```
{{</* button url="/papers/" label="See papers" */>}}
```

{{< button url="/papers/" label="See papers" >}}
{{< button url="https://example.com" label="External (new tab)" newtab="true" >}}
{{< button url="/about/" label="Smaller" size="sm" >}}


### Infoboxes

{{< infobox type="note" >}}
A **note** callout. Neutral theme variables only — no tint. Use for incidental remarks.
{{< /infobox >}}

{{< infobox type="info" >}}
An **info** callout. Tinted blue. Use for background context.
{{< /infobox >}}

{{< infobox type="tip" >}}
A **tip** callout. Tinted green. Use for advice or recommended practice.
{{< /infobox >}}

{{< infobox type="warning" >}}
A **warning** callout. Tinted amber. Use for caution.
{{< /infobox >}}

{{< infobox type="danger" >}}
A **danger** callout. Tinted red. Use for serious risk.
{{< /infobox >}}

### Infobox with inline CTA

```
{{</* infobox type="info" title="Available now" cta_url="/papers/" cta_label="See the whitepaper" */>}}
A callout with an inline CTA button. The button uses the same partial as the standalone shortcode — single source of markup.
{{</* /infobox */>}}
```

{{< infobox type="info" title="Available now" cta_url="/papers/" cta_label="See the whitepaper" >}}
A callout with an inline CTA button. The button uses the same partial as the standalone shortcode — single source of markup.
{{< /infobox >}}

