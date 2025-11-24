# Regulatory Tracker Data

## Overview

The regulatory tracker displays mental health AI regulatory developments on the homepage. All data is stored in `regulations.yml` for easy maintenance.

## How to Add New Regulatory Items

### Via GitHub Web Interface (Easiest)

1. Navigate to `_data/regulations.yml` on GitHub
2. Click the pencil icon to edit
3. Add a new entry following this format:

```yaml
- date: "Month Year"
  category: federal | state | clinical | international
  high_impact: true | false
  title: "Title of regulatory development"
  description: "Detailed description of the regulatory development and its implications for mental health AI systems."
  impact_note: "Optional: High-impact warning message for critical regulations"
  source_label: "Source organization name"
  source_url: "https://link-to-source.com"
```

4. Commit directly to `main` or create a pull request
5. GitHub Pages will automatically rebuild the site

### Field Descriptions

- **date**: Display date (e.g., "January 2025")
- **category**: One of four types:
  - `federal`: FDA, CMS, federal agencies
  - `state`: State legislation
  - `clinical`: APA, Joint Commission, clinical standards bodies
  - `international`: EU, WHO, international bodies
- **high_impact**: `true` adds "High Impact" badge and is reserved for regulations that mandate specific actions or create legal requirements
- **title**: Brief, descriptive title
- **description**: 2-3 sentences explaining the development and its implications
- **impact_note**: Optional. Only include for high-impact items. Shows a warning box with key implications
- **source_label**: Organization name (appears as link text)
- **source_url**: Direct link to the regulatory document or announcement

## Automated Monitoring

A GitHub Action runs **every Monday at 9 AM UTC** to monitor regulatory feeds:

- Federal Register (FDA rules)
- FDA News RSS feed

### What the Monitor Does

1. Checks RSS feeds and APIs for keywords: "mental health", "psychiatric", "suicide", "clinical decision support", etc.
2. Creates a GitHub Issue with findings if any are detected
3. Issue includes title, source, date, summary, and direct link for each finding

### Reviewing Automated Findings

When you receive a notification:

1. Go to GitHub Issues and find the regulatory monitor issue
2. Review each finding for relevance
3. For relevant items:
   - Add to `regulations.yml` following the format above
   - Update "Last Updated" date in `index.md` line 417
4. Close the issue after review

## Manual Monitoring Sources

For comprehensive coverage, periodically check:

### Federal
- [Federal Register - FDA](https://www.federalregister.gov/agencies/food-and-drug-administration)
- [CMS Newsroom](https://www.cms.gov/newsroom)
- [SAMHSA News](https://www.samhsa.gov/newsroom)

### State
- [California Legislature](https://leginfo.legislature.ca.gov/)
- [NCSL Health Technology Tracking](https://www.ncsl.org/health)

### Clinical Standards
- [APA Practice Guidelines](https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines)
- [Joint Commission Standards Updates](https://www.jointcommission.org/standards/)

### International
- [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [WHO Digital Health](https://www.who.int/health-topics/digital-health)

## Maintenance

### Updating Last Updated Date

Edit `index.md` line 417:
```liquid
<div class="regulatory-tracker-last-updated fade-in-up">Last Updated: January 2025</div>
```

### Archiving Old Items

To keep the tracker focused on recent developments (12-18 months):

1. Remove outdated items from `regulations.yml`
2. Consider creating an archive page if historical tracking is valuable

## Testing Changes

After editing `regulations.yml`:

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview changes before committing.

## Troubleshooting

### Build Errors

If Jekyll build fails after editing YAML:
- Check YAML syntax (indentation, quotes)
- Ensure all required fields are present
- Verify category is one of: federal, state, clinical, international

### Items Not Appearing

- Clear Jekyll cache: `bundle exec jekyll clean`
- Rebuild: `bundle exec jekyll build`
- Check `_site/index.html` for generated output
