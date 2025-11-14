export function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

export function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
