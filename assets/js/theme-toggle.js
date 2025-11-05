document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Get saved theme or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'green-gradient-dark';
    body.className = `theme--${savedTheme}`;
    updateButtonText(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('theme--green-gradient-dark') ? 'green-gradient-dark' : 'green-gradient-light';
        const newTheme = currentTheme === 'green-gradient-dark' ? 'green-gradient-light' : 'green-gradient-dark';

        // Remove old theme class and add new one
        body.classList.remove('theme--green-gradient-dark', 'theme--green-gradient-light');
        body.classList.add(`theme--${newTheme}`);

        // Save to localStorage
        localStorage.setItem('theme', newTheme);

        // Update button text
        updateButtonText(newTheme);
    });

    function updateButtonText(theme) {
        if (theme === 'green-gradient-light') {
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
                const systemTheme = e.matches ? 'green-gradient-dark' : 'green-gradient-light';
                body.className = `theme--${systemTheme}`;
                updateButtonText(systemTheme);
            }
        });
    }
});
