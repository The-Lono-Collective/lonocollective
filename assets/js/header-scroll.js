// Header scroll behavior - hide on scroll down, show on scroll up, solid when past hero
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');

    if (!header) return;

    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    let lastScrollY = 0;

    document.body.addEventListener('scroll', function() {
        const currentScrollY = document.body.scrollTop;

        // Solid background once scrolled past the hero
        if (currentScrollY > heroHeight) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Hide on scroll down past threshold, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('header--hidden');
        } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
            header.classList.remove('header--hidden');
        } else if (currentScrollY <= 100) {
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
});
