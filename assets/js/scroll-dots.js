/**
 * Scroll Dots - Position indicator dots for carousel sections
 * Only activates on mobile (768px and below)
 */

export function initScrollDots() {
    // Only initialize on mobile
    if (window.innerWidth > 768) return;

    // Define carousel configurations
    const carousels = [
        {
            scrollSelector: '.case-study-scroll',
            itemSelector: '.case-study-card',
            dotsId: 'case-study-dots'
        },
        {
            scrollSelector: '.regulatory-marquee-track',
            itemSelector: '.regulatory-item-card:not(:nth-child(n+11))', // Exclude hidden duplicates
            dotsId: 'regulatory-dots',
            parentSelector: '.regulatory-scroll'
        },
        {
            scrollSelector: '.methodology-grid',
            itemSelector: '.method-card',
            dotsId: 'methodology-dots'
        },
        {
            scrollSelector: '.team-grid',
            itemSelector: '.team-member',
            dotsId: 'team-dots'
        }
    ];

    carousels.forEach(config => {
        const scrollContainer = document.querySelector(config.parentSelector || config.scrollSelector);
        const actualScrollElement = document.querySelector(config.scrollSelector);

        if (!scrollContainer || !actualScrollElement) return;

        const items = actualScrollElement.querySelectorAll(config.itemSelector);
        if (items.length <= 1) return;

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'scroll-dots';
        dotsContainer.id = config.dotsId;

        // Create dots
        for (let i = 0; i < items.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to item ${i + 1}`);
            dot.dataset.index = i;

            // Click to scroll to item
            dot.addEventListener('click', () => {
                const targetItem = items[i];
                if (targetItem) {
                    targetItem.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest'
                    });
                }
            });

            dotsContainer.appendChild(dot);
        }

        // Insert dots after scroll container
        scrollContainer.parentNode.insertBefore(dotsContainer, scrollContainer.nextSibling);

        // Update active dot on scroll
        const updateDots = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const containerWidth = scrollContainer.offsetWidth;

            // Calculate which item is most centered
            let closestIndex = 0;
            let closestDistance = Infinity;

            items.forEach((item, index) => {
                const itemLeft = item.offsetLeft - scrollContainer.offsetLeft;
                const itemCenter = itemLeft + (item.offsetWidth / 2);
                const viewCenter = scrollLeft + (containerWidth / 2);
                const distance = Math.abs(itemCenter - viewCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            // Update dot states
            dotsContainer.querySelectorAll('.scroll-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === closestIndex);
            });
        };

        // Throttled scroll handler
        let scrollTimeout;
        scrollContainer.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                updateDots();
                scrollTimeout = null;
            }, 50);
        });

        // Initial update
        updateDots();
    });
}

// Re-initialize on resize (handles orientation changes)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Remove existing dots
        document.querySelectorAll('.scroll-dots').forEach(el => el.remove());

        // Re-initialize if on mobile
        if (window.innerWidth <= 768) {
            initScrollDots();
        }
    }, 250);
});
