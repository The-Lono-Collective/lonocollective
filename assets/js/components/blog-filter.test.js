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
