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

    test('closes menu on Escape key press', () => {
        initNavigation();

        // Open menu
        menuToggle.click();
        expect(menuToggle.getAttribute('aria-expanded')).toBe('true');

        // Mock focus method
        menuToggle.focus = jest.fn();

        // Press Escape key
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);

        expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
        expect(menuToggle.focus).toHaveBeenCalled();
    });

    test('does not close menu on Escape when menu is already closed', () => {
        initNavigation();

        // Menu starts closed (aria-expanded is not "true")
        expect(menuToggle.getAttribute('aria-expanded')).not.toBe('true');

        menuToggle.focus = jest.fn();

        // Press Escape key
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);

        // Should not focus toggle when menu was already closed
        expect(menuToggle.focus).not.toHaveBeenCalled();
    });

    test('traps focus with Tab key in open menu', () => {
        initNavigation();

        // Open menu
        menuToggle.click();

        const firstLink = mobileMenu.querySelector('a:first-child');
        const lastLink = mobileMenu.querySelector('a:last-child');

        // Mock focus methods
        firstLink.focus = jest.fn();
        lastLink.focus = jest.fn();

        // Set active element to last link
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            configurable: true,
            value: lastLink
        });

        // Press Tab (forward) on last element
        const tabEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            shiftKey: false,
            bubbles: true,
            cancelable: true
        });
        mobileMenu.dispatchEvent(tabEvent);

        // Should focus first element
        expect(firstLink.focus).toHaveBeenCalled();
    });

    test('traps focus with Shift+Tab in open menu', () => {
        initNavigation();

        // Open menu
        menuToggle.click();

        const firstLink = mobileMenu.querySelector('a:first-child');
        const lastLink = mobileMenu.querySelector('a:last-child');

        // Mock focus methods
        firstLink.focus = jest.fn();
        lastLink.focus = jest.fn();

        // Set active element to first link
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            configurable: true,
            value: firstLink
        });

        // Press Shift+Tab (backward) on first element
        const shiftTabEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            shiftKey: true,
            bubbles: true,
            cancelable: true
        });

        // Mock preventDefault
        shiftTabEvent.preventDefault = jest.fn();
        mobileMenu.dispatchEvent(shiftTabEvent);

        // Should focus last element
        expect(lastLink.focus).toHaveBeenCalled();
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
        // Mock window.scrollTo and pageYOffset
        const mockScrollTo = jest.fn();
        global.window.scrollTo = mockScrollTo;
        global.window.pageYOffset = 0;

        initSmoothScrolling();

        const link1 = document.getElementById('link1');
        const section1 = document.getElementById('section1');

        // Mock getBoundingClientRect
        section1.getBoundingClientRect = jest.fn().mockReturnValue({ top: 500 });

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
        // preventDefault is only called if target exists
        expect(clickEvent.defaultPrevented).toBe(false);
    });

    test('handles multiple anchor links', () => {
        // Mock window.scrollTo and pageYOffset
        const mockScrollTo = jest.fn();
        global.window.scrollTo = mockScrollTo;
        global.window.pageYOffset = 0;

        initSmoothScrolling();

        const section1 = document.getElementById('section1');
        const section2 = document.getElementById('section2');

        // Mock getBoundingClientRect
        section1.getBoundingClientRect = jest.fn().mockReturnValue({ top: 300 });
        section2.getBoundingClientRect = jest.fn().mockReturnValue({ top: 600 });

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
