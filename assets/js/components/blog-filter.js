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
