document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'default';
    body.className = `theme--${savedTheme}`;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('theme--default') ? 'default' : 'light';
        const newTheme = currentTheme === 'default' ? 'light' : 'default';
        
        // Remove old theme class and add new one
        body.classList.remove('theme--default', 'theme--light');
        body.classList.add(`theme--${newTheme}`);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener((e) => {
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'default' : 'light';
                body.className = `theme--${systemTheme}`;
                updateThemeIcon(systemTheme);
            }
        });
    }
});
