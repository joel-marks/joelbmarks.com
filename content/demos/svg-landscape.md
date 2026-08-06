---
title: "SVG Landscape"
description: "Procedural Landscape Generator"
summary: "A one-page web app that draws procedural 2D landscapes in the browser and exports them as vector files. Built as a test of an AI-assisted production process, with planning and execution split across two tools."
date: 2026-08-06
---

SVG Landscape Generator is a one-page web app that draws procedural 2D landscapes in the browser. You pick an archetype, tune the terrain, lighting, and colour, then export the result as a standalone vector file, or as a settings file that reproduces the same scene exactly. There is no backend, no accounts, and no server. Everything runs client-side and the repo can be cloned and run as a static site.

It exists because I needed simple vector landscapes for another project. This is also my first public, functional vibe-coded application, and the reason it sits in this section: the interesting part is not only the output, but the production process that produced it.

{{< button url="https://joel-marks.github.io/svg-landscape" label="Open the live demo" newtab="true" >}}

## What it does

The generator is built around ten landscape 'archetypes', each with its own procedural generator rather than a shared template with different settings. Each archetype has its own JS file.

| Type | Status |
| --- | --- |
| Open valley | Feature complete |
| Desert mesa | New and partially complete |
| All other archetypes | Automatically ported from the /skill and not yet polished |
| In gorge | Note: this archetype is currently broken |

On top of the terrain sits a continuous time-of-day lighting model with sun, moon, and star fields, plus an optional pseudo-3D shadow split that can either follow the time of day or be driven independently. Colour comes from eight curated themes or an algorithmic randomiser, with depth and atmospheric haze controls, and two colouring modes: a continuous depth ramp, or flat bands of colour per depth region.

Every setting persists between visits, and every setting is carried into both export formats. A scene can therefore be handed to someone else as a small settings file rather than as a finished image.

## Features

* Procedural 2D and pseudo-3D landscape generator, in the style of an illustration
* Terrain type ('archetype') can be changed, with control over various aspects of the terrain
* Extensive control over colour and lighting
* Colour theming system for the landscape
* UI can be 'tinted' to match the dominant colour of the current landscape
* Designed for desktop, but responsive on mobile
* SEO and accessibility built in, as well as help and tooltips

## How it is put together

The codebase separates the part that computes the picture from the part that presents it. Nothing in the core layer imports from the interface layer, and nothing in the core layer touches the DOM. Each archetype is a single module exporting one function, which takes a seed and the terrain parameters and returns a set of closed-polygon layers ordered from furthest to nearest, along with a declaration of where its own stack divides into background, middle, and foreground.

That boundary is what makes the extension points cheap. The colour themes live in a JSON file as three ramp colours and an interface tint each, so adding a theme is a data change rather than a code change. Presets work the same way: a settings file dropped into the presets folder is discovered automatically and appears in the dropdown, with no code touched at all.

The stack is deliberately small. Vite for the dev server and build, vanilla JavaScript in ES modules with no framework, simplex-noise for the noise base, chroma-js for palette generation, Tweakpane for the control panel, and Tailwind for page chrome. The markdown renderer used for the in-app help and about panels is hand-rolled rather than pulled in as a dependency. Pushing to the main branch builds and deploys to GitHub Pages automatically, so there are no built files committed to the repository.

An accessibility, contrast, and responsive pass covers both interface themes: the app is keyboard-operable throughout, meets WCAG AA contrast in light and dark, respects reduced-motion preferences, and reflows from a desktop-first layout to two columns and then one as the viewport narrows.

## How it was built

Initial attempts to get an LLM to create a simple vector landscape failed. The model couldn't conceptualise what I was trying to create. The first solution was to build a simple landscape generator as a /skill in Claude that output to an HTML canvas. I got fairly consistently good output this way, but adding layers of complexity, or version control, required a rethink. This then became my test case for using Claude chat to assist in developing a functional app in Claude Code.

That process split planning from execution. Architecture, scope, and code review happened in conversation with Claude in a project workspace. The implementation ran through Claude Code inside VS Code. I sat between the two: relaying instructions, testing results, making the calls that got flagged rather than silently resolved, and deciding what actually shipped. Nothing merged without a human looking at it first.

The useful finding was where the process strains. The two halves each need the same architectural context, and keeping that context file synchronised between them was manual. That single manual step was the clearest point of failure in the whole workflow, which is a fair illustration of the general case: the friction in AI-assisted work tends to show up in the handover between tools rather than inside either one of them.

## Status

Under active development rather than a finished release, so expect rough edges. The archetypes will be refined as time allows. Open valley is the production-ready one and Desert mesa is partially complete; the rest were ported automatically from the original /skill and have not yet been polished.

Idea, concept, and vibe coding: Joel B. Marks. First release: August 2026. Released under the MIT licence.
