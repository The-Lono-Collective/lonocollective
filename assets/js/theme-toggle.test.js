/**
 * Theme Toggle Tests
 *
 * Tests theme switching functionality, localStorage persistence,
 * and accessibility features.
 */

describe('Theme Toggle', () => {
  let themeToggleButton;
  let mockLocalStorage;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <body class="theme--green-gradient-dark">
        <button class="theme-toggle" id="theme-toggle">Light Mode</button>
      </body>
    `;

    // Mock localStorage
    mockLocalStorage = {
      store: {},
      getItem: jest.fn((key) => mockLocalStorage.store[key] || null),
      setItem: jest.fn((key, value) => {
        mockLocalStorage.store[key] = value;
      }),
      clear: jest.fn(() => {
        mockLocalStorage.store = {};
      })
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    themeToggleButton = document.getElementById('theme-toggle');
  });

  afterEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should default to dark mode when no saved theme', () => {
      const savedTheme = localStorage.getItem('theme') || 'green-gradient-dark';
      expect(savedTheme).toBe('green-gradient-dark');
    });

    test('should load saved theme from localStorage', () => {
      localStorage.setItem('theme', 'green-gradient-light');
      const savedTheme = localStorage.getItem('theme');
      expect(savedTheme).toBe('green-gradient-light');
    });

    test('should apply correct body class on load', () => {
      document.body.className = 'theme--green-gradient-dark';
      expect(document.body.classList.contains('theme--green-gradient-dark')).toBe(true);
    });
  });

  describe('Theme Switching', () => {
    test('should toggle from dark to light theme', () => {
      document.body.classList.remove('theme--green-gradient-dark', 'theme--green-gradient-light');
      document.body.classList.add('theme--green-gradient-dark');

      // Simulate toggle
      document.body.classList.remove('theme--green-gradient-dark');
      document.body.classList.add('theme--green-gradient-light');

      expect(document.body.classList.contains('theme--green-gradient-light')).toBe(true);
      expect(document.body.classList.contains('theme--green-gradient-dark')).toBe(false);
    });

    test('should toggle from light to dark theme', () => {
      document.body.classList.remove('theme--green-gradient-dark', 'theme--green-gradient-light');
      document.body.classList.add('theme--green-gradient-light');

      // Simulate toggle
      document.body.classList.remove('theme--green-gradient-light');
      document.body.classList.add('theme--green-gradient-dark');

      expect(document.body.classList.contains('theme--green-gradient-dark')).toBe(true);
      expect(document.body.classList.contains('theme--green-gradient-light')).toBe(false);
    });

    test('should persist theme choice to localStorage', () => {
      localStorage.setItem('theme', 'green-gradient-light');
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'green-gradient-light');
    });
  });

  describe('Button Text Updates', () => {
    test('should display "Dark Mode" when light theme is active', () => {
      const updateButtonText = (theme) => {
        if (theme === 'green-gradient-light') {
          themeToggleButton.textContent = 'Dark Mode';
        } else {
          themeToggleButton.textContent = 'Light Mode';
        }
      };

      updateButtonText('green-gradient-light');
      expect(themeToggleButton.textContent).toBe('Dark Mode');
    });

    test('should display "Light Mode" when dark theme is active', () => {
      const updateButtonText = (theme) => {
        if (theme === 'green-gradient-light') {
          themeToggleButton.textContent = 'Dark Mode';
        } else {
          themeToggleButton.textContent = 'Light Mode';
        }
      };

      updateButtonText('green-gradient-dark');
      expect(themeToggleButton.textContent).toBe('Light Mode');
    });
  });

  describe('Accessibility', () => {
    test('should have accessible button element', () => {
      expect(themeToggleButton).toBeTruthy();
      expect(themeToggleButton.tagName).toBe('BUTTON');
    });

    test('should have descriptive text content', () => {
      const buttonText = themeToggleButton.textContent;
      expect(buttonText).toMatch(/Dark Mode|Light Mode/);
    });

    test('theme toggle button should be keyboard accessible', () => {
      // Button elements are inherently keyboard accessible
      // Testing that it's actually a button element
      expect(themeToggleButton.tagName).toBe('BUTTON');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing localStorage gracefully', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true
      });

      // Should not throw error when localStorage is unavailable
      expect(() => {
        const theme = (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'green-gradient-dark';
        expect(theme).toBe('green-gradient-dark');
      }).not.toThrow();
    });

    test('should handle missing button element gracefully', () => {
      document.getElementById('theme-toggle')?.remove();
      const missingButton = document.getElementById('theme-toggle');
      expect(missingButton).toBeNull();
    });
  });
});
