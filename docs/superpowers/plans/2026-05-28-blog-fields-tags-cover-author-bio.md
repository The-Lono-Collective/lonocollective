# Blog Field Additions (Tags, Cover Image, Author Bio) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-post tags (with a client-side filter on `/blog/`), a per-post cover image (hero + social preview), and an author bio block (avatar + plain-text bio sourced once from the author record) to the Jekyll blog edited via Sveltia CMS.

**Architecture:** Fields are declared in `admin/config.yml` and rendered through Liquid templates. Tag filtering reuses the existing client-side show/hide pattern on `blog/index.md`, but the filter logic is extracted into a tested ES module (`assets/js/components/blog-filter.js`) wired through `main.js`, matching the existing `navigation.js` component pattern. A shared `_includes/author-link.html` partial renders the safe-URL-guarded author name in both the byline and the new bio block.

**Tech Stack:** Jekyll 4 (Liquid, `site.tags`, `slugify`), vanilla ES modules, Jest + jsdom, SCSS.

**Deviations from spec (flagged for approval):**
1. The blog filter logic is extracted into a tested module rather than left as an inline `<script>`. Rationale: the project enforces 80% coverage on `assets/js/**/*.js` and the `?tag=` URL parsing is security-sensitive.
2. A shared `_includes/author-link.html` partial is introduced so the byline and bio block reuse one safe-URL guard.

---

## File Structure

| File | Create/Modify | Responsibility |
|---|---|---|
| `admin/config.yml` | Modify | Declare `cover_image` + `tags` (posts) and `bio` + `image` (authors) |
| `_includes/author-link.html` | Create | Render author name, linked to `author.url` only if the URL is safe |
| `_layouts/post.html` | Modify | Cover hero, social meta, tag badges, author bio block; use the partial |
| `blog/index.md` | Modify | Tag-chip filter row, `data-tags` on cards, remove inline script |
| `assets/js/components/blog-filter.js` | Create | Pure filter helpers + `initBlogFilter` DOM wiring |
| `assets/js/components/blog-filter.test.js` | Create | Unit tests for the above |
| `assets/js/main.js` | Modify | Import and call `initBlogFilter` |
| `_sass/_blog.scss` | Modify | Styles: `.post-cover`, `.post-tags`/`.post-tag`, `.post-author-bio`, `.blog-tag-filter`/`.blog-tag-btn` |

---

## Task 1: CMS config — add the four fields

**Files:**
- Modify: `admin/config.yml`

- [ ] **Step 1: Add `cover_image` and `tags` to the posts collection**

In `admin/config.yml`, the posts collection `fields:` list currently ends with the Body field (line 48). Insert these two entries immediately **before** the Body field line `- { label: Body, name: body, widget: markdown }`:

```yaml
      - {
          label: Cover Image,
          name: cover_image,
          widget: image,
          required: false,
          hint: "Shown as the hero at the top of the post and as the social-share preview image.",
        }
      - {
          label: Tags,
          name: tags,
          widget: list,
          required: false,
          hint: "Freeform topic tags (e.g. LLM, regulation). Readers can filter the blog by these.",
        }
```

- [ ] **Step 2: Add `bio` and `image` to the authors collection**

In the authors collection `fields:` list (currently `name` then `url`, ending at line 66), append after the `url` field entry:

```yaml
      - {
          label: Bio,
          name: bio,
          widget: text,
          required: false,
          hint: "One or two sentences. Appears at the bottom of every post you write.",
        }
      - {
          label: Photo,
          name: image,
          widget: image,
          required: false,
          hint: "Headshot shown beside your bio.",
        }
```

- [ ] **Step 3: Verify the YAML parses**

Run: `ruby -ryaml -e "YAML.load_file('admin/config.yml'); puts 'config.yml OK'"`
Expected: `config.yml OK` (no exception).

- [ ] **Step 4: Commit**

```bash
git add admin/config.yml
git commit -m "feat(cms): add cover_image + tags (posts) and bio + image (authors) fields"
```

---

## Task 2: Author bio block + shared author-link partial

**Files:**
- Create: `_includes/author-link.html`
- Modify: `_layouts/post.html` (byline block at lines 61-74; footer block at lines 85-107)
- Modify: `_sass/_blog.scss` (append author-bio styles)

- [ ] **Step 1: Create the shared author-link partial**

Create `_includes/author-link.html` with exactly:

```liquid
{%- comment -%}
Renders include.author.name, linked to include.author.url only when the URL is
safe (relative path, anchor, or http/https). Optional include.class overrides
the link class. Expects include.author to be an author data object.
{%- endcomment -%}
{%- assign _url_lower = include.author.url | downcase | strip -%}
{%- assign _safe_url = false -%}
{%- if _url_lower == '' -%}{%- elsif _url_lower contains 'javascript:' -%}{%- elsif _url_lower contains 'vbscript:' -%}{%- elsif _url_lower contains 'data:' -%}{%- else -%}{%- assign _safe_url = true -%}{%- endif -%}
{%- if _safe_url -%}<a href="{{ include.author.url }}" class="{{ include.class | default: 'post-author-link' }}">{{ include.author.name }}</a>{%- else -%}<span class="post-author-name">{{ include.author.name }}</span>{%- endif -%}
```

- [ ] **Step 2: Replace the inline byline guard with the partial**

In `_layouts/post.html`, replace the existing byline block (lines 61-74, from `{% if page.author %}` through its `{% endif %}`) with:

```liquid
                        {% if page.author %}
                        {% assign author = site.data.authors[page.author] %}
                        <div class="post-byline">
                            <span class="post-byline-label">By</span>
                            {% include author-link.html author=author %}
                        </div>
                        {% endif %}
```

- [ ] **Step 3: Add the author bio block at the top of the post footer**

In `_layouts/post.html`, the footer opens with `<footer class="post-footer">` (line 85). Immediately after that opening tag and before `<div class="post-nav">`, insert:

```liquid
                        {% if page.author %}
                        {% assign post_author = site.data.authors[page.author] %}
                        {% if post_author %}
                        {% if post_author.bio or post_author.image %}
                        <aside class="post-author-bio">
                            {% if post_author.image %}
                            <img class="post-author-bio__avatar" src="{{ post_author.image | relative_url }}" alt="{{ post_author.name }}" width="64" height="64">
                            {% endif %}
                            <div class="post-author-bio__text">
                                <p class="post-author-bio__name">{% include author-link.html author=post_author class='post-author-bio__link' %}</p>
                                {% if post_author.bio %}
                                <p class="post-author-bio__blurb">{{ post_author.bio }}</p>
                                {% endif %}
                            </div>
                        </aside>
                        {% endif %}
                        {% endif %}
                        {% endif %}
```

- [ ] **Step 4: Add bio block styles**

In `_sass/_blog.scss`, immediately after the `.post-footer { ... }` rule (currently ends at line 352), insert:

```scss
.post-author-bio {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
    padding: 24px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: rgba(235, 255, 220, 0.05);
}

.post-author-bio__avatar {
    flex: 0 0 auto;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
}

.post-author-bio__name {
    font-family: 'Azeret Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.05em;
    margin: 0 0 6px;
}

.post-author-bio__link {
    color: var(--accent-primary);
    text-decoration: none;

    &:hover {
        color: var(--accent-secondary);
    }
}

.post-author-bio__blurb {
    font-size: var(--type-body-md);
    color: var(--text-secondary);
    line-height: var(--line-body);
    margin: 0;
}

@media (max-width: 600px) {
    .post-author-bio {
        flex-direction: column;
    }
}
```

- [ ] **Step 5: Verify the absent-data path (existing content unchanged)**

Run: `bundle exec jekyll build --quiet && grep -c "post-author-bio" _site/blog/2026/04/08/*/index.html`
Expected: `0` (no author currently has a bio/image, so the block is correctly omitted).
Also confirm the byline still renders: `grep -c "post-byline" _site/blog/2026/04/08/*/index.html` → Expected: `1`.

- [ ] **Step 6: Verify the present-data path, then revert the scratch data**

Temporarily add a bio to an author, build, confirm the block renders, then revert:

```bash
printf '\nbio: "Test bio for verification."\n' >> _data/authors/zrupp.yml
bundle exec jekyll build --quiet
grep -c "post-author-bio__blurb" _site/blog/2026/04/08/*/index.html   # Expected: 1
git checkout _data/authors/zrupp.yml                                   # revert scratch data
```

Expected: the grep prints `1`, and `git checkout` restores the unmodified author file.

- [ ] **Step 7: Run the JS suite (regression gate) and commit**

Run: `npm test`
Expected: `Tests: 43 passed, 43 total` (unchanged; this task touched no JS).

```bash
git add _includes/author-link.html _layouts/post.html _sass/_blog.scss
git commit -m "feat(blog): author bio block + shared author-link partial"
```

---

## Task 3: Cover image — hero + social preview

**Files:**
- Modify: `_layouts/post.html` (social meta at lines 18, 25; hero in `.post-header`)
- Modify: `_sass/_blog.scss` (append `.post-cover`)

- [ ] **Step 1: Point social meta at the cover image when present**

In `_layouts/post.html`, replace the two hardcoded social-image lines.

Line 18, replace:
```liquid
    <meta property="og:image" content="{{ '/assets/images/web-preview.png' | absolute_url }}">
```
with:
```liquid
    <meta property="og:image" content="{{ page.cover_image | default: '/assets/images/web-preview.png' | absolute_url }}">
```

Line 25, replace:
```liquid
    <meta name="twitter:image" content="{{ '/assets/images/web-preview.png' | absolute_url }}">
```
with:
```liquid
    <meta name="twitter:image" content="{{ page.cover_image | default: '/assets/images/web-preview.png' | absolute_url }}">
```

- [ ] **Step 2: Render the cover hero at the top of the post header**

In `_layouts/post.html`, the post header opens with `<header class="post-header">` (line 43). Immediately after that opening tag and before `<div class="post-meta-top">`, insert:

```liquid
                        {% if page.cover_image %}
                        <img class="post-cover" src="{{ page.cover_image | relative_url }}" alt="{{ page.title }}">
                        {% endif %}
```

- [ ] **Step 3: Add cover styles**

In `_sass/_blog.scss`, immediately before the `.post-header { ... }` rule (currently starts at line 166, under the `// ── Post article` comment), insert:

```scss
.post-cover {
    display: block;
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: 4px;
    margin: 0 0 32px;
}
```

- [ ] **Step 4: Verify both branches**

```bash
bundle exec jekyll build --quiet
grep -o 'og:image[^>]*web-preview.png' _site/blog/2026/04/08/*/index.html   # Expected: 1 match (fallback, post has no cover yet)
```
Then test the present branch:
```bash
printf '\ncover_image: /assets/images/web-preview.png\n' >> _posts/2026-04-08-welcome-to-the-collective.md
# NOTE: front matter is fenced; instead set it inside the front matter for a real test:
git checkout _posts/2026-04-08-welcome-to-the-collective.md
```
Because front matter is fenced by `---`, append-testing is invalid. Instead, verify the present branch by adding `cover_image` inside the front matter manually:

Run: edit `_posts/2026-04-08-welcome-to-the-collective.md`, add `cover_image: /assets/images/web-preview.png` on its own line within the `---` front matter block, then:
```bash
bundle exec jekyll build --quiet
grep -c 'class="post-cover"' _site/blog/2026/04/08/*/index.html             # Expected: 1
grep -o 'og:image[^>]*web-preview.png' _site/blog/2026/04/08/*/index.html   # Expected: 1 (now from cover_image)
git checkout _posts/2026-04-08-welcome-to-the-collective.md                 # revert scratch data
```
Expected: hero renders and og:image resolves from `cover_image`; revert restores the post.

- [ ] **Step 5: Commit**

```bash
git add _layouts/post.html _sass/_blog.scss
git commit -m "feat(blog): cover image hero and per-post social preview"
```

---

## Task 4: Post tag badges

**Files:**
- Modify: `_layouts/post.html` (in `.post-header`, after excerpt)
- Modify: `_sass/_blog.scss` (append `.post-tags` / `.post-tag`)

- [ ] **Step 1: Render the tag badge row**

In `_layouts/post.html`, inside `.post-header`, immediately after the excerpt block (`{% if page.excerpt %}...{% endif %}`, lines 57-59) and before the byline, insert:

```liquid
                        {% if page.tags and page.tags.size > 0 %}
                        <div class="post-tags">
                            {% for tag in page.tags %}
                            <a href="/blog/?tag={{ tag | slugify }}" class="post-tag">{{ tag }}</a>
                            {% endfor %}
                        </div>
                        {% endif %}
```

- [ ] **Step 2: Add tag badge styles**

In `_sass/_blog.scss`, immediately after the shared category-badge rule (the `.post-category-badge, .blog-category-badge { ... }` block ending at line 162), insert:

```scss
// ── Post tags (topical, lighter than the category badge) ──

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
}

.post-tag {
    font-family: 'Azeret Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border: 1px solid var(--border-color);
    border-radius: 2px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;

    &::before {
        content: "#";
        opacity: 0.5;
    }

    &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
    }
}
```

- [ ] **Step 3: Verify both branches**

Existing post has no tags, so confirm absence:
```bash
bundle exec jekyll build --quiet
grep -c 'class="post-tags"' _site/blog/2026/04/08/*/index.html   # Expected: 0
```
Then add scratch tags inside the front matter of `_posts/2026-04-08-welcome-to-the-collective.md` (add `tags: [LLM, "Mental Health AI"]` within the `---` block), and:
```bash
bundle exec jekyll build --quiet
grep -o 'href="/blog/?tag=[^"]*"' _site/blog/2026/04/08/*/index.html
# Expected: href="/blog/?tag=llm" and href="/blog/?tag=mental-health-ai"
git checkout _posts/2026-04-08-welcome-to-the-collective.md
```
Expected: tag anchors render with `slugify`d hrefs ("Mental Health AI" → `mental-health-ai`); revert restores the post.

- [ ] **Step 4: Commit**

```bash
git add _layouts/post.html _sass/_blog.scss
git commit -m "feat(blog): render per-post tag badges linking to filtered index"
```

---

## Task 5: blog-filter module (TDD)

**Files:**
- Create: `assets/js/components/blog-filter.js`
- Create: `assets/js/components/blog-filter.test.js`

- [ ] **Step 1: Write the failing tests**

Create `assets/js/components/blog-filter.test.js` with exactly:

```javascript
import { normalizeTag, readTagParam, cardMatches, initBlogFilter } from './blog-filter.js';

describe('normalizeTag', () => {
    test('lowercases and hyphenates spaces', () => {
        expect(normalizeTag('Mental Health AI')).toBe('mental-health-ai');
    });
    test('collapses punctuation runs to single hyphen and trims', () => {
        expect(normalizeTag('  LLM!! / Safety  ')).toBe('llm-safety');
    });
    test('handles null/undefined as empty string', () => {
        expect(normalizeTag(null)).toBe('');
        expect(normalizeTag(undefined)).toBe('');
    });
    test('strips an injection attempt down to safe chars', () => {
        expect(normalizeTag('<img src=x onerror=alert(1)>')).toBe('img-src-x-onerror-alert-1');
    });
});

describe('readTagParam', () => {
    test('reads and normalizes the tag param', () => {
        expect(readTagParam('?tag=Mental%20Health%20AI')).toBe('mental-health-ai');
    });
    test('returns null when absent', () => {
        expect(readTagParam('?foo=bar')).toBe(null);
        expect(readTagParam('')).toBe(null);
    });
    test('returns null when the param normalizes to empty', () => {
        expect(readTagParam('?tag=%20%20')).toBe(null);
    });
});

describe('cardMatches', () => {
    function card(category, tags) {
        const el = document.createElement('a');
        el.setAttribute('data-category', category);
        el.setAttribute('data-tags', tags);
        return el;
    }
    test('all/all shows everything', () => {
        expect(cardMatches(card('research', 'llm safety'), 'all', 'all')).toBe(true);
    });
    test('matches category only', () => {
        expect(cardMatches(card('research', 'llm'), 'research', 'all')).toBe(true);
        expect(cardMatches(card('announcement', 'llm'), 'research', 'all')).toBe(false);
    });
    test('matches tag only', () => {
        expect(cardMatches(card('research', 'llm safety'), 'all', 'safety')).toBe(true);
        expect(cardMatches(card('research', 'llm'), 'all', 'safety')).toBe(false);
    });
    test('requires both when both are active', () => {
        expect(cardMatches(card('research', 'llm'), 'research', 'llm')).toBe(true);
        expect(cardMatches(card('announcement', 'llm'), 'research', 'llm')).toBe(false);
    });
    test('a card with no tags never matches a specific tag', () => {
        expect(cardMatches(card('research', ''), 'all', 'llm')).toBe(false);
    });
});

describe('initBlogFilter', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="blog-filter">
                <button class="blog-filter-btn is-active" data-filter="all">All</button>
                <button class="blog-filter-btn" data-filter="research">Research</button>
            </div>
            <div class="blog-tag-filter">
                <button class="blog-tag-btn is-active" data-tag="all">All</button>
                <button class="blog-tag-btn" data-tag="llm">LLM</button>
                <button class="blog-tag-btn" data-tag="safety">Safety</button>
            </div>
            <div class="blog-post-list" id="blog-post-list">
                <a class="blog-post-card" data-category="research" data-tags="llm">A</a>
                <a class="blog-post-card" data-category="announcement" data-tags="safety">B</a>
                <p class="blog-empty-state">none</p>
            </div>`;
    });
    afterEach(() => { document.body.innerHTML = ''; });

    test('returns early without a post list', () => {
        document.body.innerHTML = '<div></div>';
        expect(() => initBlogFilter(document, '')).not.toThrow();
    });

    test('shows all cards on init with no tag param', () => {
        initBlogFilter(document, '');
        const cards = document.querySelectorAll('.blog-post-card');
        expect(cards[0].hidden).toBe(false);
        expect(cards[1].hidden).toBe(false);
    });

    test('clicking a category filters cards', () => {
        initBlogFilter(document, '');
        document.querySelector('[data-filter="research"]').click();
        const cards = document.querySelectorAll('.blog-post-card');
        expect(cards[0].hidden).toBe(false);
        expect(cards[1].hidden).toBe(true);
    });

    test('clicking a tag filters cards', () => {
        initBlogFilter(document, '');
        document.querySelector('[data-tag="llm"]').click();
        const cards = document.querySelectorAll('.blog-post-card');
        expect(cards[0].hidden).toBe(false);
        expect(cards[1].hidden).toBe(true);
    });

    test('pre-activates a tag from ?tag=', () => {
        initBlogFilter(document, '?tag=llm');
        expect(document.querySelector('[data-tag="llm"]').classList.contains('is-active')).toBe(true);
        expect(document.querySelectorAll('.blog-post-card')[1].hidden).toBe(true);
    });

    test('a hostile ?tag= param matches nothing and stays on "all"', () => {
        initBlogFilter(document, '?tag=<img src=x onerror=alert(1)>');
        // normalizes to a harmless slug ("img-src-x-onerror-alert-1") that matches no chip
        expect(document.querySelector('[data-tag="all"]').classList.contains('is-active')).toBe(true);
    });

    test('shows the empty state when nothing matches', () => {
        initBlogFilter(document, '');
        document.querySelector('[data-filter="research"]').click();
        document.querySelector('[data-tag="safety"]').click();
        var cards = document.querySelectorAll('.blog-post-card');
        expect(cards[0].hidden).toBe(true);   // A is research but not tagged safety
        expect(cards[1].hidden).toBe(true);   // B is tagged safety but is an announcement
        expect(document.querySelector('.blog-empty-state').hidden).toBe(false);
    });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx jest assets/js/components/blog-filter.test.js`
Expected: FAIL — `Cannot find module './blog-filter.js'`.

- [ ] **Step 3: Implement the module**

Create `assets/js/components/blog-filter.js` with exactly:

```javascript
// Tag/category filtering for the blog index. Pure helpers are exported for
// testing; initBlogFilter wires DOM events. The ?tag= param is normalized to
// [a-z0-9-] and only ever compared against known chip values or used to toggle
// classes — it is never written into the DOM, so a crafted param cannot inject.

export function normalizeTag(value) {
    return String(value == null ? '' : value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function readTagParam(search) {
    var params = new URLSearchParams(search || '');
    var raw = params.get('tag');
    if (!raw) return null;
    var normalized = normalizeTag(raw);
    return normalized === '' ? null : normalized;
}

export function cardMatches(card, activeCategory, activeTag) {
    var category = card.getAttribute('data-category') || '';
    var tags = (card.getAttribute('data-tags') || '').trim().split(/\s+/).filter(Boolean);
    var categoryOk = activeCategory === 'all' || category === activeCategory;
    var tagOk = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
    return categoryOk && tagOk;
}

export function initBlogFilter(doc, search) {
    doc = doc || document;
    var list = doc.getElementById('blog-post-list');
    if (!list) return;

    var cards = Array.prototype.slice.call(doc.querySelectorAll('.blog-post-card'));
    var categoryButtons = Array.prototype.slice.call(doc.querySelectorAll('.blog-filter-btn'));
    var tagButtons = Array.prototype.slice.call(doc.querySelectorAll('.blog-tag-btn'));
    var emptyState = doc.querySelector('.blog-empty-state');

    var activeCategory = 'all';
    var activeTag = 'all';

    function apply() {
        var visible = 0;
        cards.forEach(function (card) {
            var match = cardMatches(card, activeCategory, activeTag);
            card.hidden = !match;
            if (match) visible++;
        });
        if (emptyState) emptyState.hidden = visible > 0;
    }

    function setActive(buttons, active) {
        buttons.forEach(function (b) {
            var on = b === active;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }

    categoryButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activeCategory = btn.getAttribute('data-filter') || 'all';
            setActive(categoryButtons, btn);
            apply();
        });
    });

    tagButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activeTag = btn.getAttribute('data-tag') || 'all';
            setActive(tagButtons, btn);
            apply();
        });
    });

    var requested = readTagParam(
        search != null ? search : (typeof window !== 'undefined' && window.location ? window.location.search : '')
    );
    if (requested) {
        var match = tagButtons.filter(function (b) {
            return b.getAttribute('data-tag') === requested;
        })[0];
        if (match) {
            activeTag = requested;
            setActive(tagButtons, match);
        }
    }

    apply();
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx jest assets/js/components/blog-filter.test.js`
Expected: PASS — all `normalizeTag`, `readTagParam`, `cardMatches`, `initBlogFilter` tests green.

- [ ] **Step 5: Run lint and the full suite**

Run: `npm run lint && npm test`
Expected: lint clean; `Test Suites: 5 passed`, total test count increased from 43.

- [ ] **Step 6: Commit**

```bash
git add assets/js/components/blog-filter.js assets/js/components/blog-filter.test.js
git commit -m "feat(blog): tested blog-filter module (category+tag, safe ?tag= parsing)"
```

---

## Task 6: Wire the filter into the blog index and main.js

**Files:**
- Modify: `assets/js/main.js` (imports at lines 1-4; init calls)
- Modify: `blog/index.md` (add tag chips, `data-tags` on cards, remove inline `<script>`)
- Modify: `_sass/_blog.scss` (append `.blog-tag-filter` / `.blog-tag-btn`)

- [ ] **Step 1: Import and call initBlogFilter in main.js**

In `assets/js/main.js`, add to the import block (after line 1's navigation import):

```javascript
import { initBlogFilter } from './components/blog-filter.js';
```

Then, wherever the other `init*()` calls are invoked (the file calls `initNavigation()` etc. on DOM ready), add:

```javascript
    initBlogFilter(document, window.location.search);
```

Place it alongside the existing init calls so it runs on DOM ready. It returns early on pages without `#blog-post-list`.

- [ ] **Step 2: Add the tag-chip filter row to blog/index.md**

In `blog/index.md`, immediately after the existing category `.blog-filter` div (lines 13-17), insert:

```liquid
  {% if site.tags.size > 0 %}
  {% assign sorted_tags = site.tags | sort %}
  <div class="blog-tag-filter" role="group" aria-label="Filter posts by tag">
    <button class="blog-tag-btn is-active" data-tag="all" aria-pressed="true">All Tags</button>
    {% for tag in sorted_tags %}
    <button class="blog-tag-btn" data-tag="{{ tag[0] | slugify }}" aria-pressed="false">{{ tag[0] }}</button>
    {% endfor %}
  </div>
  {% endif %}
```

- [ ] **Step 3: Add `data-tags` to each post card**

In `blog/index.md`, change the card opening tag (line 26) from:

```liquid
    <a href="{{ post.url }}" class="blog-post-card" data-category="{{ post.category }}">
```
to:
```liquid
    <a href="{{ post.url }}" class="blog-post-card" data-category="{{ post.category }}" data-tags="{% for t in post.tags %}{{ t | slugify }} {% endfor %}">
```

- [ ] **Step 4: Remove the inline `<script>` block**

In `blog/index.md`, delete the entire inline script block (lines 46-76, from `<script>` through `</script>`). The logic now lives in the tested module loaded via `main.js`.

- [ ] **Step 5: Add tag-chip styles**

In `_sass/_blog.scss`, immediately after the `.blog-filter-btn { ... }` rule (ends at line 69), insert:

```scss
.blog-tag-filter {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 48px;
    margin-top: -32px;
}

.blog-tag-btn {
    font-family: 'Azeret Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.05em;
    padding: 6px 14px;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
    }

    &[aria-pressed="true"],
    &.is-active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: var(--color-kapu);
    }
}
```

- [ ] **Step 6: Build and verify the index wiring**

```bash
bundle exec jekyll build --quiet
grep -c 'blog-tag-filter' _site/blog/index.html        # Expected: 0 (no posts have tags yet) — see note
grep -c '<script>' _site/blog/index.html               # Expected: 0 (inline script removed)
grep -c 'data-tags=' _site/blog/index.html             # Expected: 1 (the card carries the attr, empty for now)
```
Note: `blog-tag-filter` renders only once at least one post has a tag. To verify the populated path, add `tags: [LLM]` inside the welcome post's front matter, rebuild, then:
```bash
grep -c 'data-tag="llm"' _site/blog/index.html         # Expected: 1
git checkout _posts/2026-04-08-welcome-to-the-collective.md
```

- [ ] **Step 7: Run the full suite and commit**

Run: `npm test`
Expected: all suites pass (the index no longer carries inline JS; module tests already cover the logic).

```bash
git add assets/js/main.js blog/index.md _sass/_blog.scss
git commit -m "feat(blog): tag-chip filter on index wired through tested module"
```

---

## Task 7: Full manual verification

**Files:** none (verification only)

- [ ] **Step 1: Serve the site**

Run: `bundle exec jekyll serve`
Open `http://localhost:4000/blog/`.

- [ ] **Step 2: Create a scratch post exercising every field**

Create `_posts/2026-05-28-scratch-verify.md` (delete after):

```markdown
---
layout: post
title: "Scratch Verify Post"
date: 2026-05-28
category: research
author: zrupp
tags: [LLM, "Mental Health AI"]
cover_image: /assets/images/web-preview.png
excerpt: "Scratch post to verify new fields."
---

Body text for the scratch verification post.
```

Also temporarily add to `_data/authors/zrupp.yml`:
```yaml
bio: "Co-founder of The Lono Collective."
image: /assets/images/web-preview.png
```

- [ ] **Step 3: Verify the post page**

At `http://localhost:4000/blog/2026/05/28/scratch-verify/` confirm:
- Cover image renders as a hero at the top.
- Two tag badges (`#LLM`, `#Mental Health AI`) appear, lighter than the category badge.
- Author bio block at the bottom shows avatar + name (linked to `/#team`) + bio.
- View source: `og:image` and `twitter:image` point at the cover image.

- [ ] **Step 4: Verify the index filter**

At `http://localhost:4000/blog/`:
- Category buttons and tag chips both render.
- Clicking the `LLM` chip hides the welcome post (no tags), shows the scratch post.
- Clicking category `Research` + tag `LLM` narrows correctly (AND logic).
- Visit `http://localhost:4000/blog/?tag=mental-health-ai` directly → that chip is pre-activated and the list is filtered.

- [ ] **Step 5: Verify the XSS guard**

Visit `http://localhost:4000/blog/?tag=<img src=x onerror=alert(1)>`.
Expected: no alert, no console error, nothing injected; the list simply matches nothing or stays at "All" (the param normalizes to a harmless slug that matches no chip).

- [ ] **Step 6: Verify graceful absence**

At `http://localhost:4000/blog/2026/04/08/welcome-to-the-collective/` (still has no new fields): no hero, no tag row, no bio block; byline intact; social image falls back to `web-preview.png`.

- [ ] **Step 7: Clean up scratch data**

```bash
rm _posts/2026-05-28-scratch-verify.md
git checkout _data/authors/zrupp.yml
```

- [ ] **Step 8: Final regression run**

Run: `npm test && npm run lint && bundle exec jekyll build --quiet && echo "ALL GREEN"`
Expected: tests pass, lint clean, build succeeds, `ALL GREEN` prints.

---

## Self-Review

**Spec coverage:**
- Tags field + freeform `list` → Task 1. ✓
- Cover image field → Task 1; hero + social → Task 3. ✓
- Author `bio` + `image` fields → Task 1; bio block → Task 2. ✓
- "Fill once" via author record → Task 2 reads `site.data.authors[page.author]`. ✓
- Tag filter (approach A, client-side, no plugin) → Tasks 5-6. ✓
- Tag badge link `/blog/?tag=<slug>` → Task 4. ✓
- Tag normalization via `slugify` + JS mirror → Tasks 4, 5. ✓
- DOM-XSS guard on `?tag=` → Task 5 (tested) + Task 7 step 5 (manual). ✓
- All fields optional / graceful absence → Tasks 2,3,4 verification steps + Task 7 step 6. ✓
- Categories retained → untouched; tag system added alongside. ✓
- Tests stay green; new module tested → Tasks 5-7. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete content. Verification steps that need scratch data create it and revert it explicitly.

**Type/name consistency:** `normalizeTag`, `readTagParam`, `cardMatches`, `initBlogFilter` names match across the module, its tests, and the `main.js` import. CSS classes (`.blog-tag-btn` with `data-tag`, `.blog-filter-btn` with `data-filter`, `.blog-post-card` with `data-tags`/`data-category`) are consistent between `blog/index.md`, the module, and the tests.
