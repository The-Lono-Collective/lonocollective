# Blog Field Additions: Tags, Cover Image, Author Bio

**Date:** 2026-05-28
**Branch:** feature/sveltia-cms-trial
**Status:** Approved (design), pending implementation plan

## Overview

Extend the Jekyll blog (now edited via Sveltia CMS) with three editor-facing
additions, all configured through `admin/config.yml` field schemas and rendered
through Jekyll templates:

1. **Tags** — freeform per-post tags, filterable on the blog index.
2. **Cover image** — per-post image used as a top-of-post hero and as the
   per-post social (Open Graph / Twitter) preview image.
3. **Author bio block** — author avatar + plain-text bio rendered at the bottom
   of every post, sourced once from the author's record (not per post).

## Goals

- Writers configure tags and a cover image per post in Sveltia.
- Each author fills a bio + avatar **once** on their author record; it appears
  automatically on every post they write.
- Readers filter posts by tag on `/blog/`, reusing the existing client-side
  category-filter mechanism (no new build infrastructure, no plugins).
- All new fields are optional; existing content (1 post, 4 authors) renders
  unchanged with nothing to backfill.

## Non-Goals (YAGNI)

- **Per-tag URL pages** (e.g. `/tags/llm/`). Rejected: requires `jekyll-archives`
  + a GitHub Actions build that does not exist today. Client-side filtering on
  the existing index covers the need.
- Controlled tag vocabulary. Tags are freeform per the decision below.
- Tag/avatar handling for the `file` widget, `object` grouping, or any widget
  beyond `image`/`list`/`text`.
- Changes to editorial review flow (tracked separately for the Sveltia migration).

## Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Tag input | Freeform (`list` widget of strings) |
| Tag display | Badges on post + filterable on `/blog/` |
| Tag filter mechanism | Approach A: extend existing client-side index filter |
| Tag badge link target | `/blog/?tag=<normalized-tag>` |
| Cover image use | Hero at top of post **and** per-post social image |
| Author bio content | Avatar + plain-text bio |
| Author bio source | Author record (`_data/authors/<slug>.yml`), filled once |
| Backfill | All new fields optional; layout hides when absent |

## Data Model

### Author record — `_data/authors/<slug>.yml`
Existing fields: `name`, `url`. Add:
- `bio` — plain-text string, optional. One or two sentences.
- `image` — path to avatar under the media folder, optional.

Posts continue to reference an author via the existing `author` relation field.
Bio/avatar are resolved at render time via `site.data.authors[page.author]`, so
a writer updating their bio updates it across all their past and future posts.

### Post front matter — `_posts/*.md`
Existing: `layout`, `title`, `date`, `category`, `author`, `excerpt`, `body`. Add:
- `cover_image` — path string, optional.
- `tags` — array of strings, optional (Jekyll-native; populates `site.tags`).

## Component Design

### 1. CMS config — `admin/config.yml`

**Posts collection** — append two fields:
- `cover_image`: `{ label: Cover Image, name: cover_image, widget: image, required: false, hint: "Shown as the hero at the top of the post and as the social-share preview." }`
- `tags`: `{ label: Tags, name: tags, widget: list, required: false, hint: "Freeform topic tags. Readers can filter the blog by these." }`
  - `list` with no `field`/`fields` yields a simple string array, matching
    Jekyll's native `tags`.

**Authors collection** — append two fields:
- `bio`: `{ label: Bio, name: bio, widget: text, required: false, hint: "One or two sentences. Appears at the bottom of every post you write." }`
- `image`: `{ label: Photo, name: image, widget: image, required: false, hint: "Headshot shown beside your bio." }`

Media continues to use the configured `media_folder: assets/images/blog` /
`public_folder: /assets/images/blog`.

### 2. Post layout — `_layouts/post.html`

- **Social meta (in `<head>`):** change `og:image` and `twitter:image` to
  `{{ page.cover_image | default: '/assets/images/web-preview.png' | absolute_url }}`.
  Absolute URL is required by Open Graph.
- **Hero (top of `.post-header`):** when `page.cover_image` is set, render
  `<img class="post-cover" src="{{ page.cover_image | relative_url }}" alt="{{ page.title }}">`
  with empty/decorative-safe alt fallback to the title.
- **Tags row (in `.post-header`, after title/excerpt):** when `page.tags` is
  non-empty, render `.post-tags` containing one `.post-tag` anchor per tag:
  `<a href="/blog/?tag={{ tag | slugify }}" class="post-tag">{{ tag }}</a>`.
  Display the original tag text; link uses the normalized slug.
- **Author bio block (in `.post-footer`):** when the resolved author has a `bio`
  or `image`, render `.post-author-bio` with the avatar (if present), the
  author name (linked via the existing `author.url` sanitization already in the
  layout), and the plain-text bio. Reuse the existing safe-URL guard for the
  name link; do not duplicate it divergently.

### 3. Blog index — `blog/index.md`

Extend the existing filter, do not replace it:
- Render a `.blog-tag-filter` chip row built by iterating `site.tags`
  (`{% for tag in site.tags %}`), each chip carrying `data-tag="{{ tag[0] | slugify }}"`
  and displaying `{{ tag[0] }}`.
- Add `data-tags="{% for t in post.tags %}{{ t | slugify }} {% endfor %}"` to each
  `.blog-post-card`.
- Extend the existing filter JS so a card is visible when it matches the active
  category **and** the active tag (tag defaults to "all"). Keep the current
  category path intact.
- On load, read `?tag=` from `location.search`, and if it matches a known chip,
  activate that tag filter. **Security:** the param is only ever compared against
  the known tag list and applied by toggling classes / matching `data-tags`. It
  is never written into the DOM via `innerHTML`. Any "showing posts tagged X"
  label uses `textContent`. This avoids DOM-based XSS from a crafted `?tag=`.

### 4. Styling — `_sass/_blog.scss`

Add, matching the existing badge/card idiom and the dark-green/cream theme
variables already in use:
- `.post-cover` — responsive hero image (full content width, rounded corners
  consistent with existing cards, constrained max-height).
- `.post-tags` / `.post-tag` — tag badge row on the post, visually distinct from
  the category badge (lighter weight) so the two badge types don't read as equal.
- `.post-author-bio` — bottom-of-post block: avatar (small rounded), name, bio
  text. Lays out horizontally on wide screens, stacks on narrow.
- `.blog-tag-filter` / chip styles on the index, consistent with the existing
  `.blog-filter-btn`.

## Tag Normalization

All tag matching (badge link, `data-tag`, `data-tags`, `?tag=` param) uses
Jekyll's `slugify` filter (lowercase, spaces→hyphens, punctuation stripped) so
"Mental Health AI" and "mental health ai" resolve to the same `mental-health-ai`
for filtering, while the original casing is preserved for display. The
client-side `?tag=` read normalizes with the same rule (lowercase + collapse to
hyphens) before comparing to chip `data-tag` values.

## Backfill & Optionality

Every new field is optional. Each template block is wrapped in an existence
check (`{% if page.cover_image %}`, `{% if page.tags and page.tags.size > 0 %}`,
author bio guard). The existing post and four author records require no edits and
render exactly as today until someone chooses to add the new data in Sveltia.

## Testing

- `npm test` — must stay green. These are Liquid/SCSS changes, not JS modules;
  the existing 43 tests should be unaffected. Confirm, don't assume.
- Manual `bundle exec jekyll serve`:
  - Post **with** cover/tags and an author who has bio+avatar → hero, tag badges,
    bio block all render; social meta uses the cover image.
  - Post **without** any of them (the existing welcome post) → renders as today,
    no empty blocks, social meta falls back to `web-preview.png`.
  - `/blog/` → tag chips appear; clicking a chip filters; category filter still
    works; combining a category + a tag narrows correctly.
  - Visiting `/blog/?tag=announcement` directly pre-activates that filter.
  - Crafted `/blog/?tag=<img src=x onerror=...>` does not execute or inject;
    it simply matches nothing.

## Files Touched

- `admin/config.yml` (edit: 2 post fields, 2 author fields)
- `_layouts/post.html` (edit: social meta, hero, tags, bio block)
- `blog/index.md` (edit: tag chips, card data attrs, filter JS)
- `_sass/_blog.scss` (edit: new component styles)
- `_data/authors/*.yml` (optional later content edits; not required by this work)
