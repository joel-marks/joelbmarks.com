Favicon assets.

Present (vector, committed):

- favicon.svg          — primary favicon (JBM). Used by modern browsers.
- safari-pinned-tab.svg — Safari pinned-tab mask icon.

Still needed (raster — generate from favicon.svg):

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png  (180x180, for iOS home screen)

Until these exist, hugo.yaml's params.assets links to them will 404 in the
page <head> (harmless — modern browsers fall back to favicon.svg for the tab
icon; only iOS home-screen icons truly need the raster apple-touch-icon).

To generate: upload favicon.svg to realfavicongenerator.net, or install a
rasterizer locally (e.g. `brew install librsvg`) and convert. Paths are
referenced from hugo.yaml under params.assets.
