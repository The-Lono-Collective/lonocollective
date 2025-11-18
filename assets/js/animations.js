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
        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
        );

        animatedElements.forEach(element => {
            this.observer.observe(element);
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
