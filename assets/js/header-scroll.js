// Header scroll behavior - hide on scroll down, show on scroll up
document.addEventListener('DOMContentLoaded', function() {
    console.log('Header scroll script loaded');

    const header = document.querySelector('.header');
    const container = document.querySelector('.container');

    if (!header) {
        console.error('Header element not found!');
        return;
    }

    console.log('Header element found:', header);
    console.log('Container element:', container);

    let lastScrollY = 0;

    // Listen to body scroll (that's where the scroll is happening)
    document.body.addEventListener('scroll', function() {
        const currentScrollY = document.body.scrollTop;

        // Scrolling down and past threshold - hide
        if (currentScrollY > lastScrollY && currentScrollY > 400) {
            header.classList.add('header--hidden');
        }
        // Scrolling up - show
        else if (currentScrollY < lastScrollY && currentScrollY > 100) {
            header.classList.remove('header--hidden');
        }
        // At top - show
        else if (currentScrollY <= 100) {
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    console.log('Scroll listener attached to document.body');
});
