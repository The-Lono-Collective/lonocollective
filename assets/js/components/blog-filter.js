// Tag/category filtering for the blog index. Pure helpers are exported for
// testing; initBlogFilter wires DOM events. The ?tag= param is normalized to
// [a-z0-9-] and only ever compared against known chip values or used to toggle
// classes — it is never written into the DOM, so a crafted param cannot inject.

// Mirrors Jekyll's default `slugify` filter (downcase, runs of non-alphanumeric
// characters to a single hyphen, trim leading/trailing hyphens) so a value
// normalized here matches the data-tag/href slugs the Liquid templates emit via
// `| slugify`. Equivalent for this site's ASCII tag vocabulary.
export function normalizeTag(value) {
    return String(value == null ? '' : value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function readTagParam(search) {
    const params = new URLSearchParams(search || '');
    const raw = params.get('tag');
    if (!raw) return null;
    const normalized = normalizeTag(raw);
    return normalized === '' ? null : normalized;
}

// activeCategory/activeTag are already-slugified values ('all' is the wildcard);
// data-tags is the space-separated, slugified tag list emitted by the template.
export function cardMatches(card, activeCategory, activeTag) {
    const category = card.getAttribute('data-category') || '';
    const tags = (card.getAttribute('data-tags') || '').trim().split(/\s+/).filter(Boolean);
    const categoryOk = activeCategory === 'all' || category === activeCategory;
    const tagOk = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
    return categoryOk && tagOk;
}

export function initBlogFilter(doc, search) {
    doc = doc || document;
    const list = doc.getElementById('blog-post-list');
    if (!list) return;

    const cards = Array.from(doc.querySelectorAll('.blog-post-card'));
    const categoryButtons = Array.from(doc.querySelectorAll('.blog-filter-btn'));
    const tagButtons = Array.from(doc.querySelectorAll('.blog-tag-btn'));
    const emptyState = doc.querySelector('.blog-empty-state');

    let activeCategory = 'all';
    let activeTag = 'all';

    const apply = () => {
        let visible = 0;
        cards.forEach((card) => {
            const match = cardMatches(card, activeCategory, activeTag);
            card.hidden = !match;
            if (match) visible++;
        });
        if (emptyState) emptyState.hidden = visible > 0;
    };

    const setActive = (buttons, active) => {
        buttons.forEach((b) => {
            const on = b === active;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    };

    categoryButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            activeCategory = btn.getAttribute('data-filter') || 'all';
            setActive(categoryButtons, btn);
            apply();
        });
    });

    tagButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            activeTag = btn.getAttribute('data-tag') || 'all';
            setActive(tagButtons, btn);
            apply();
        });
    });

    const requested = readTagParam(
        search != null ? search : (typeof window !== 'undefined' && window.location ? window.location.search : '')
    );
    if (requested) {
        const match = tagButtons.find((b) => b.getAttribute('data-tag') === requested);
        if (match) {
            activeTag = requested;
            setActive(tagButtons, match);
        }
    }

    apply();
}
