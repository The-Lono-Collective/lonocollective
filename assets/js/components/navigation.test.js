import { initNavigation, initSmoothScrolling } from './navigation.js';

describe('initNavigation', () => {
    let menuToggle, mobileMenu;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="menuToggle" class="menu-toggle">
                <div class="menu-line"></div>
                <div class="menu-line"></div>
                <div class="menu-line"></div>
            </div>
            <div id="mobileMenu" class="mobile-menu">
                <a href="#section1">Section 1</a>
                <a href="#section2">Section 2</a>
            </div>
        `;
        menuToggle = document.getElementById('menuToggle');
        mobileMenu = document.getElementById('mobileMenu');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('initializes without errors when elements exist', () => {
        expect(() => initNavigation()).not.toThrow();
    });

    test('returns early if menuToggle does not exist', () => {
        menuToggle.remove();
        expect(() => initNavigation()).not.toThrow();
    });

    test('returns early if mobileMenu does not exist', () => {
        mobileMenu.remove();
        expect(() => initNavigation()).not.toThrow();
    });

    test('toggles active class on menuToggle when clicked', () => {
        initNavigation();

        expect(menuToggle.classList.contains('active')).toBe(false);
        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);
        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(false);
    });

    test('toggles active class on mobileMenu when menuToggle clicked', () => {
        initNavigation();

        expect(mobileMenu.classList.contains('active')).toBe(false);
        menuToggle.click();
        expect(mobileMenu.classList.contains('active')).toBe(true);
        menuToggle.click();
        expect(mobileMenu.classList.contains('active')).toBe(false);
    });

    test('closes menu when clicking outside', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);
        expect(mobileMenu.classList.contains('active')).toBe(true);

        document.body.click();
        expect(menuToggle.classList.contains('active')).toBe(false);
        expect(mobileMenu.classList.contains('active')).toBe(false);
    });

    test('does not close menu when clicking menuToggle itself', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(false);
    });

    test('does not close menu when clicking inside mobileMenu', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);

        // Click on the mobileMenu itself (not a link)
        mobileMenu.click();
        expect(menuToggle.classList.contains('active')).toBe(true);
    });

    test('closes menu when clicking a link inside mobileMenu', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);
        expect(mobileMenu.classList.contains('active')).toBe(true);

        const link = mobileMenu.querySelector('a');
        link.click();

        expect(menuToggle.classList.contains('active')).toBe(false);
        expect(mobileMenu.classList.contains('active')).toBe(false);
    });

    test('closes menu on window resize to desktop size', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);

        // Mock window width >= 768
        global.innerWidth = 1024;
        window.dispatchEvent(new Event('resize'));

        expect(menuToggle.classList.contains('active')).toBe(false);
        expect(mobileMenu.classList.contains('active')).toBe(false);
    });

    test('keeps menu state on resize to mobile size', () => {
        initNavigation();

        menuToggle.click();
        expect(menuToggle.classList.contains('active')).toBe(true);

        // Mock window width < 768
        global.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));

        expect(menuToggle.classList.contains('active')).toBe(true);
        expect(mobileMenu.classList.contains('active')).toBe(true);
    });
});

describe('initSmoothScrolling', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <nav>
                <a href="#section1" id="link1">Section 1</a>
                <a href="#section2" id="link2">Section 2</a>
                <a href="https://example.com" id="external">External</a>
            </nav>
            <div id="section1">Section 1 Content</div>
            <div id="section2">Section 2 Content</div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('initializes without errors', () => {
        expect(() => initSmoothScrolling()).not.toThrow();
    });

    test('adds click event listeners to anchor links', () => {
        // Mock window.scrollTo
        const mockScrollTo = jest.fn();
        global.window.scrollTo = mockScrollTo;

        initSmoothScrolling();

        const link1 = document.getElementById('link1');
        const section1 = document.getElementById('section1');

        // Mock offsetTop property
        Object.defineProperty(section1, 'offsetTop', {
            writable: true,
            value: 500
        });

        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        link1.dispatchEvent(clickEvent);

        expect(clickEvent.defaultPrevented).toBe(true);
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 420, // 500 - 80 (header height)
            behavior: 'smooth'
        });
    });

    test('does not affect external links', () => {
        initSmoothScrolling();

        const externalLink = document.getElementById('external');
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        externalLink.dispatchEvent(clickEvent);

        // External link should not prevent default (it doesn't start with #)
        expect(clickEvent.defaultPrevented).toBe(false);
    });

    test('handles missing target gracefully', () => {
        document.body.innerHTML = `
            <a href="#nonexistent" id="broken">Broken Link</a>
        `;

        initSmoothScrolling();

        const brokenLink = document.getElementById('broken');
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        expect(() => brokenLink.dispatchEvent(clickEvent)).not.toThrow();
        expect(clickEvent.defaultPrevented).toBe(true);
    });

    test('handles multiple anchor links', () => {
        // Mock window.scrollTo
        const mockScrollTo = jest.fn();
        global.window.scrollTo = mockScrollTo;

        initSmoothScrolling();

        const section1 = document.getElementById('section1');
        const section2 = document.getElementById('section2');

        // Mock offsetTop properties
        Object.defineProperty(section1, 'offsetTop', {
            writable: true,
            value: 300
        });
        Object.defineProperty(section2, 'offsetTop', {
            writable: true,
            value: 600
        });

        document.getElementById('link1').click();
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 220, // 300 - 80
            behavior: 'smooth'
        });

        document.getElementById('link2').click();
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 520, // 600 - 80
            behavior: 'smooth'
        });
    });
});
