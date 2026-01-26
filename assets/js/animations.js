// Scroll-triggered animations
export class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
        );

        // Group elements by their parent section for staggered animation
        const sections = new Map();

        animatedElements.forEach(element => {
            const section = element.closest('section') || document.body;
            if (!sections.has(section)) {
                sections.set(section, []);
            }
            sections.get(section).push(element);
        });

        // Add stagger index as CSS custom property
        sections.forEach((elements) => {
            elements.forEach((el, index) => {
                el.style.setProperty('--stagger-index', index);
                this.observer.observe(el);
            });
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation to prevent re-triggering
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Micro-interactions for interactive elements
export class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initButtonRipples();
    }

    initButtonRipples() {
        const buttons = document.querySelectorAll('.cta-button');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

}

// Footer animations with scroll-driven glyph reveal
export class FooterAnimations {
    constructor() {
        this.footer = document.querySelector('.site-footer');
        this.glyphs = document.querySelectorAll('[data-glyph]');

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!this.prefersReducedMotion && this.footer && this.glyphs.length > 0) {
            this.initScrollDrivenAnimation();
        } else if (this.prefersReducedMotion) {
            // Show elements immediately if reduced motion is preferred
            this.glyphs.forEach(glyph => {
                glyph.style.opacity = '1';
                glyph.style.transform = 'none';
            });
        }
    }

    initScrollDrivenAnimation() {
        // Bind scroll handler
        this.handleScroll = this.handleScroll.bind(this);

        // Use requestAnimationFrame for smooth performance
        this.ticking = false;
        document.body.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // Initial calculation
        this.handleScroll();
    }

    handleScroll() {
        const footerRect = this.footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate when footer is halfway into view
        const footerMiddle = footerRect.top + (footerRect.height/4);
        const triggerPoint = windowHeight;

        // Calculate scroll progress (0 to 1)
        // Start when footer middle reaches bottom of viewport
        // Complete when footer middle reaches middle of viewport
        const scrollProgress = Math.max(0, Math.min(1,
            (triggerPoint - footerMiddle) / (windowHeight / 2)
        ));
        // Apply transforms to each glyph based on scroll progress
        this.glyphs.forEach((glyph, index) => {
            // Each glyph has a staggered offset
            const glyphMidPoint = Math.floor(this.glyphs.length/2);
            const offset = Math.abs(index - glyphMidPoint) * 0.025;
            const cosOffset = Math.cos(offset*45);
            const sinOffset = Math.sin(offset*45);
            const glyphProgress = Math.max(0, Math.min(1, (scrollProgress - offset) / (1 - offset)));

            // Calculate translateY (starts at 100%, ends at 0%)
            const translateY = 100 - (glyphProgress * 100);

            const rotationAmount = 1 - glyphProgress

            // Calculate opacity (0 to 1)
            const opacity = glyphProgress;

            // Apply transform
            if (index < glyphMidPoint){
                glyph.style.transform = `matrix(${Math.cos(rotationAmount)}, ${-1*Math.sin(rotationAmount)}, ${Math.sin(rotationAmount)}, ${Math.cos(rotationAmount)}, ${-1*translateY}, ${translateY})`;
            } else if (index > glyphMidPoint){
                glyph.style.transform = `matrix(${Math.cos(rotationAmount)}, ${Math.sin(rotationAmount)}, ${-1*Math.sin(rotationAmount)}, ${Math.cos(rotationAmount)}, ${translateY}, ${translateY})`;
            }
            
            glyph.style.opacity = opacity;
        });
    }
}

// Keyboard navigation accessibility
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new MicroInteractions();
    new FooterAnimations();
    initKeyboardNavigation();

    // Add ripple effect and keyboard navigation styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .keyboard-navigation *:focus {
            outline: 2px solid #c9a382 !important;
            outline-offset: 2px !important;
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(style);
});
