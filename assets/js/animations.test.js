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
        jest.useFakeTimers();

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
        jest.useRealTimers();
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

    test('applies card tilt on mousemove to team members', () => {
        microInteractions = new MicroInteractions();

        const card = document.querySelector('.team-member');
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

        const card = document.querySelector('.team-member');
        card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';

        card.dispatchEvent(new MouseEvent('mouseleave'));

        expect(card.style.transform).toBe('perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
    });
});

