# Lono Collective Website

## Project Overview
Static website for The Lono Collective - a worker-owned cooperative specializing in AI safety evaluation frameworks for mental health AI systems.

**Tech Stack:** Jekyll (Ruby) + Vanilla JavaScript (ES2021+) + SCSS
**Hosting:** GitHub Pages at lonocollective.ai

## Commands

```bash
# Development
bundle exec jekyll serve    # Local server at http://localhost:4000

# Testing (80% coverage threshold)
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report

# Linting
npm run lint                # ESLint on assets/js/**/*.js
```

## Code Style
- ES2021+ JavaScript with ESLint
- Test files co-located: `file.js` + `file.test.js`
- SCSS partials prefixed with underscore (`_header.scss`)
- Pre-commit hook runs `npm test` automatically

## Project Structure
```
_sass/          # SCSS partials
assets/js/      # JavaScript with tests
_includes/      # Jekyll partials
_layouts/       # Jekyll templates
```

---

# Plugin Usage Rules

## When to Use Each Plugin

### Serena (Semantic Code Tools)
**Use when:** Working with code symbols, understanding code relationships, making precise edits
- Prefer `find_symbol` over grep for finding functions/classes
- Use `get_symbols_overview` before diving into a file
- Use `replace_symbol_body` for editing entire functions/methods
- Use `find_referencing_symbols` to understand impact of changes

### Context7 (Documentation Lookup)
**Use when:** Need up-to-date documentation for libraries/frameworks
- Always use for Jekyll, Jest, ESLint documentation
- Use before suggesting library-specific solutions

### Figma (Design Tools)
**Use when:** Implementing designs from Figma files
- Use `get_screenshot` to view design context
- Use `get_design_context` for implementation details
- Use `create_design_system_rules` for new projects

### Supabase (Database/Backend)
**Use when:** Working with Supabase projects
- Use `search_docs` for Supabase-specific questions
- Use `list_tables`, `execute_sql` for database operations
- Use `apply_migration` for schema changes

### Linear (Project Management)
**Use when:** Managing issues, projects, documentation
- Use `list_issues`, `create_issue` for task management
- Use `get_document`, `create_document` for specs/docs
- Check Linear before starting work to understand context

### Greptile (Code Search/Review)
**Use when:** Searching across repos, reviewing PRs, finding patterns
- Use for cross-repository searches
- Use `trigger_code_review` for PR reviews
- Use `search_greptile_comments` for past review context

### Hugging Face Skills
**Use when:** Working with ML models, datasets, training
- Use for model training on HF infrastructure
- Use for dataset creation and management
- Use for paper publishing

### Frontend Design
**Use when:** Building UI components, pages, or applications
- Invoke for any frontend implementation work
- Creates polished, production-grade interfaces

### Feature Dev
**Use when:** Guided feature development needed
- Use for complex features requiring architecture focus
- Provides codebase understanding and structured approach

### Code Review / PR Review Toolkit
**Use when:** Reviewing code or PRs
- Use `code-review` for general code review
- Use `review-pr` for comprehensive PR review with specialized agents

### Superpowers Skills
**Always check for applicable skills before any task:**
- `/brainstorming` - Before creative work or new features
- `/systematic-debugging` - Before fixing bugs
- `/test-driven-development` - Before implementing features
- `/verify-project` - **Always run before committing**
- `/verification-before-completion` - Before claiming work is done
- `/writing-plans` - For multi-step tasks
- `/requesting-code-review` - When completing major work

## Plugin Priority Order
1. **Process skills first** (brainstorming, debugging) - determine HOW to approach
2. **Serena** for code understanding and editing
3. **Context7** for documentation needs
4. **Domain plugins** (Figma, Supabase, Linear, etc.) as applicable
