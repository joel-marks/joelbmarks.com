Favicon assets (JBM monogram).

- favicon.svg           — primary favicon, used by modern browsers.
- safari-pinned-tab.svg — Safari pinned-tab mask icon.
- favicon-16x16.png     — generated from favicon.svg.
- favicon-32x32.png     — generated from favicon.svg.
- apple-touch-icon.png  — 180x180, iOS home screen; generated from favicon.svg.

All paths are referenced from hugo.yaml under params.assets.

To regenerate the rasters after editing favicon.svg (needs librsvg):

  rsvg-convert -w 16  -h 16  favicon.svg -o favicon-16x16.png
  rsvg-convert -w 32  -h 32  favicon.svg -o favicon-32x32.png
  rsvg-convert -w 180 -h 180 favicon.svg -o apple-touch-icon.png
