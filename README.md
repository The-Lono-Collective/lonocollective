# The Lono Collective

Official website for The Lono Collective - Independent AI Safety Evaluation Frameworks.

🌐 **Live Site:** [lonocollective.ai](https://lonocollective.ai)

## About

Worker-owned cooperative providing regulatory-grade AI safety evaluations for high-stakes systems. Our multidisciplinary team brings clinical psychology, emergency medicine, legal compliance, and technical AI expertise to deliver independent validation that withstands peer review and legal scrutiny.

## Tech Stack

- **Framework:** Jekyll 4.3
- **Styling:** SCSS with CSS custom properties
- **JavaScript:** ES6 modules
- **Animations:** IntersectionObserver API
- **Testing:** Jest with jsdom
- **Hosting:** GitHub Pages
- **Domain:** Custom domain with SSL

## Features

- ✅ Fully responsive design (mobile-first)
- ✅ WCAG 2.1 accessibility compliance
- ✅ Scroll-triggered fade-in animations
- ✅ Skip-to-content navigation
- ✅ SEO optimized (Open Graph, Twitter Cards)
- ✅ Pre-commit hooks for quality assurance
- ✅ Comprehensive test coverage

## Local Development

### Prerequisites

- Ruby 2.7+ with Bundler
- Node.js 14+ with npm
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/The-Lono-Collective/lonocollective.git
cd lonocollective

# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install

# Serve locally
bundle exec jekyll serve

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

The site will be available at `http://localhost:4000`

## Project Structure

```
lonocollective/
├── _data/              # YAML data files
│   ├── contact.yml
│   ├── navigation.yml
│   └── team.yml
├── _includes/          # Reusable components
│   ├── footer.html
│   ├── header.html
│   ├── hero.html
│   └── navigation.html
├── _layouts/           # Page templates
│   └── default.html
├── _sass/              # SCSS partials
│   ├── _flowing-arcs.scss
│   ├── _footer.scss
│   ├── _header.scss
│   ├── _home.scss
│   ├── _navigation.scss
│   └── _themes.scss
├── assets/
│   ├── css/
│   │   └── main.scss   # Main stylesheet
│   ├── images/         # Site images
│   └── js/             # JavaScript modules
│       ├── main.js
│       ├── animations.js
│       └── components/
│           └── navigation.js
├── _config.yml         # Jekyll configuration
├── index.md            # Homepage content
└── package.json        # Node.js dependencies
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Custom Domain Setup

1. **DNS Configuration** (already configured at domain registrar):
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```

2. **GitHub Pages Settings:**
   - Repository → Settings → Pages
   - Source: Deploy from branch `main`
   - Custom domain: `lonocollective.ai`
   - Enforce HTTPS: ✅ Enabled

## Testing

All JavaScript code includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Current test coverage:** 31 passing tests across animations, navigation, and main initialization.

## Git Workflow

Pre-commit hooks automatically run tests before each commit to ensure code quality. To bypass (not recommended):

```bash
git commit --no-verify
```

## Code Style

- **SCSS:** Component-based architecture with CSS custom properties for theming
- **JavaScript:** ES6+ modules with JSDoc comments
- **HTML:** Semantic markup with ARIA attributes for accessibility
- **Commits:** Descriptive messages with Claude Code co-authorship attribution

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader optimized
- Skip-to-content link
- Proper heading hierarchy
- ARIA labels and roles
- Focus management

## Performance

- Optimized images
- Minified CSS/JS in production
- Font display swap to prevent FOUT
- Preconnect to Google Fonts
- Respects `prefers-reduced-motion`

## Contributing

This is a private repository for The Lono Collective. For team members:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Description"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

Copyright © 2025 The Lono Collective, LLC. All rights reserved.

## Contact

For inquiries: contact@lonocollective.ai

---

Built with [Jekyll](https://jekyllrb.com/) • Hosted on [GitHub Pages](https://pages.github.com/)
