document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'literary-folk';
    body.className = `theme--${savedTheme}`;
    updateButtonText(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('theme--literary-folk') ? 'literary-folk' : 'literary-folk-dark';
        const newTheme = currentTheme === 'literary-folk' ? 'literary-folk-dark' : 'literary-folk';

        // Remove old theme class and add new one
        body.classList.remove('theme--literary-folk', 'theme--literary-folk-dark');
        body.classList.add(`theme--${newTheme}`);

        // Save to localStorage
        localStorage.setItem('theme', newTheme);

        // Update button text
        updateButtonText(newTheme);
    });

    function updateButtonText(theme) {
        if (theme === 'literary-folk') {
            themeToggle.textContent = 'Dark Mode';
        } else {
            themeToggle.textContent = 'Light Mode';
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener((e) => {
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'literary-folk-dark' : 'literary-folk';
                body.className = `theme--${systemTheme}`;
                updateButtonText(systemTheme);
            }
        });
    }
});
