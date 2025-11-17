export function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    // Get all focusable elements in menu
    const getFocusableElements = () => {
        return Array.from(mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'));
    };

    // Toggle menu open/closed
    const toggleMenu = (isOpen) => {
        menuToggle.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);

        // Focus first menu item when opening
        if (isOpen) {
            const focusableElements = getFocusableElements();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    };

    // Close menu
    const closeMenu = () => {
        toggleMenu(false);
    };

    // Menu toggle click
    menuToggle.addEventListener('click', function() {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isOpen);
    });

    // Click outside to close
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking a link
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Keyboard support: Escape to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Focus trap in mobile menu
    mobileMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && menuToggle.getAttribute('aria-expanded') === 'true') {
            const focusableElements = getFocusableElements();
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}

export function initSmoothScrolling() {
    const HEADER_HEIGHT = 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore empty or just # links
            if (!href || href === '#') return;

            // Prevent default link behavior
            e.preventDefault();

            // Find the target element
            const target = document.querySelector(href);

            if (target) {
                // Calculate position accounting for fixed header
                const targetPosition = target.offsetTop - HEADER_HEIGHT;

                // Scroll to target with smooth behavior
                try {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    // Fallback for browsers that don't support smooth scrolling
                    window.scrollTo(0, targetPosition);
                }
            }
        });
    });
}
