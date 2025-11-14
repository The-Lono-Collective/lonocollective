/**
 * @jest-environment jsdom
 */

import {
    ScrollAnimations,
    MicroInteractions,
    PerformanceOptimizer,
    AccessibilityEnhancer
} from './animations.js';

describe('ScrollAnimations', () => {
    let scrollAnimations;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="fade-in-up">Element 1</div>
            <div class="fade-in-left">Element 2</div>
            <div class="parallax-element">Parallax</div>
            <a href="#section">Link</a>
            <div id="section">Section</div>
        `;

        // Mock IntersectionObserver
        global.IntersectionObserver = jest.fn().mockImplementation((callback, options) => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn()
        }));
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('initializes IntersectionObserver with correct options', () => {
        scrollAnimations = new ScrollAnimations();

        expect(global.IntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
    });

    test('observes elements with animation classes', () => {
        const mockObserve = jest.fn();
        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: mockObserve,
            unobserve: jest.fn()
        }));

        scrollAnimations = new ScrollAnimations();

        // Should observe both fade-in-up and fade-in-left elements
        expect(mockObserve).toHaveBeenCalledTimes(2);
    });

    test('adds animate class to intersecting elements', () => {
        let intersectionCallback;
        const mockUnobserve = jest.fn();

        global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            intersectionCallback = callback;
            return {
                observe: jest.fn(),
                unobserve: mockUnobserve
            };
        });

        scrollAnimations = new ScrollAnimations();

        const element = document.querySelector('.fade-in-up');
        const entries = [{
            isIntersecting: true,
            target: element
        }];

        intersectionCallback(entries);

        expect(element.classList.contains('animate')).toBe(true);
        expect(mockUnobserve).toHaveBeenCalledWith(element);
    });

    test('does not add animate class to non-intersecting elements', () => {
        let intersectionCallback;

        global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            intersectionCallback = callback;
            return {
                observe: jest.fn(),
                unobserve: jest.fn()
            };
        });

        scrollAnimations = new ScrollAnimations();

        const element = document.querySelector('.fade-in-up');
        const entries = [{
            isIntersecting: false,
            target: element
        }];

        intersectionCallback(entries);

        expect(element.classList.contains('animate')).toBe(false);
    });

    test('sets up parallax effect when parallax elements exist', () => {
        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn()
        }));

        scrollAnimations = new ScrollAnimations();

        const parallaxElement = document.querySelector('.parallax-element');
        expect(parallaxElement).toBeTruthy();

        // Simulate scroll
        global.pageYOffset = 100;
        window.dispatchEvent(new Event('scroll'));

        expect(parallaxElement.style.transform).toContain('translateY');
    });

    test('skips parallax setup when no parallax elements exist', () => {
        document.body.innerHTML = `
            <div class="fade-in-up">Element 1</div>
        `;

        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn()
        }));

        expect(() => {
            scrollAnimations = new ScrollAnimations();
        }).not.toThrow();
    });

    test('handles smooth scrolling with valid target', () => {
        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn()
        }));

        const mockScrollTo = jest.fn();
        global.scrollTo = mockScrollTo;

        scrollAnimations = new ScrollAnimations();

        const link = document.querySelector('a[href="#section"]');
        const section = document.querySelector('#section');

        // Mock offsetTop property
        Object.defineProperty(section, 'offsetTop', {
            writable: true,
            value: 500
        });

        link.click();

        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 420, // 500 - 80 (header height)
            behavior: 'smooth'
        });
    });

    test('handles smooth scrolling with no target element', () => {
        document.body.innerHTML = `
            <a href="#nonexistent">Broken Link</a>
        `;

        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn()
        }));

        const mockScrollTo = jest.fn();
        global.scrollTo = mockScrollTo;

        scrollAnimations = new ScrollAnimations();

        const link = document.querySelector('a');
        link.click();

        // Should not call scrollTo when target doesn't exist
        expect(mockScrollTo).not.toHaveBeenCalled();
    });
});

describe('MicroInteractions', () => {
    let microInteractions;

    beforeEach(() => {
        document.body.innerHTML = `
            <button class="cta-button">Click me</button>
            <div class="service-card">Card</div>
            <div class="team-member">Member</div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('initializes without errors', () => {
        expect(() => {
            microInteractions = new MicroInteractions();
        }).not.toThrow();
    });

    test('adds ripple effect on button click', () => {
        jest.useFakeTimers();
        microInteractions = new MicroInteractions();

        const button = document.querySelector('.cta-button');
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 100
        });

        // Mock getBoundingClientRect
        button.getBoundingClientRect = jest.fn().mockReturnValue({
            left: 50,
            top: 50,
            width: 100,
            height: 40
        });

        button.dispatchEvent(clickEvent);

        const ripple = button.querySelector('.ripple');
        expect(ripple).toBeTruthy();

        // Ripple should be removed after timeout
        jest.advanceTimersByTime(600);
        expect(button.querySelector('.ripple')).toBeNull();

        jest.useRealTimers();
    });

    test('applies card tilt on mousemove', () => {
        microInteractions = new MicroInteractions();

        const card = document.querySelector('.service-card');
        card.getBoundingClientRect = jest.fn().mockReturnValue({
            left: 0,
            top: 0,
            width: 200,
            height: 200
        });

        const mouseMoveEvent = new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 150
        });

        card.dispatchEvent(mouseMoveEvent);

        expect(card.style.transform).toContain('perspective');
        expect(card.style.transform).toContain('rotateX');
        expect(card.style.transform).toContain('rotateY');
    });

    test('resets card transform on mouseleave', () => {
        microInteractions = new MicroInteractions();

        const card = document.querySelector('.service-card');
        card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';

        card.dispatchEvent(new MouseEvent('mouseleave'));

        expect(card.style.transform).toBe('perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
    });
});

describe('PerformanceOptimizer', () => {
    let performanceOptimizer;

    beforeEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = `
            <img data-src="image1.jpg" class="lazy" />
            <img data-src="image2.jpg" class="lazy" />
        `;

        // Mock IntersectionObserver for lazy loading
        global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn()
        }));
    });

    afterEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('initializes without errors', () => {
        expect(() => {
            performanceOptimizer = new PerformanceOptimizer();
        }).not.toThrow();
    });

    test('observes lazy load images', () => {
        const mockObserve = jest.fn();
        global.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe: mockObserve,
            unobserve: jest.fn()
        }));

        performanceOptimizer = new PerformanceOptimizer();

        expect(mockObserve).toHaveBeenCalledTimes(2);
    });

    test('adds critical CSS to head', () => {
        performanceOptimizer = new PerformanceOptimizer();

        const styles = document.head.querySelectorAll('style');
        expect(styles.length).toBeGreaterThan(0);

        const criticalStyle = Array.from(styles).find(style =>
            style.textContent.includes('.hero-section')
        );
        expect(criticalStyle).toBeTruthy();
    });

    test('adds preload links', () => {
        performanceOptimizer = new PerformanceOptimizer();

        const preloadLinks = document.head.querySelectorAll('link[rel="preload"]');
        expect(preloadLinks.length).toBeGreaterThan(0);
    });
});

describe('AccessibilityEnhancer', () => {
    let accessibilityEnhancer;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="service-card">
                <h3>Service Title</h3>
            </div>
            <div class="team-member">
                <h3>Member Name</h3>
            </div>
            <button>Test Button</button>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('initializes without errors', () => {
        expect(() => {
            accessibilityEnhancer = new AccessibilityEnhancer();
        }).not.toThrow();
    });

    test('adds keyboard-navigation class on Tab key', () => {
        accessibilityEnhancer = new AccessibilityEnhancer();

        const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
        document.dispatchEvent(tabEvent);

        expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
    });

    test('removes keyboard-navigation class on mousedown', () => {
        accessibilityEnhancer = new AccessibilityEnhancer();

        document.body.classList.add('keyboard-navigation');

        const mouseEvent = new MouseEvent('mousedown');
        document.dispatchEvent(mouseEvent);

        expect(document.body.classList.contains('keyboard-navigation')).toBe(false);
    });

    test('blurs active element on Escape key', () => {
        accessibilityEnhancer = new AccessibilityEnhancer();

        const button = document.querySelector('button');
        button.focus();

        const blurSpy = jest.spyOn(button, 'blur');

        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);

        expect(blurSpy).toHaveBeenCalled();
    });

    test('adds ARIA attributes to service cards', () => {
        accessibilityEnhancer = new AccessibilityEnhancer();

        const serviceCard = document.querySelector('.service-card');
        expect(serviceCard.getAttribute('role')).toBe('article');
        expect(serviceCard.getAttribute('aria-labelledby')).toBeTruthy();
    });

    test('adds ARIA attributes to team members', () => {
        accessibilityEnhancer = new AccessibilityEnhancer();

        const teamMember = document.querySelector('.team-member');
        expect(teamMember.getAttribute('role')).toBe('article');
        expect(teamMember.getAttribute('aria-labelledby')).toBeTruthy();
    });
});
