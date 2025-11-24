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

### Federal-Level Monitoring (GitHub Actions)

A GitHub Action runs **every Monday at 9 AM UTC** to monitor federal regulatory feeds:

- Federal Register (FDA rules)
- FDA News RSS feed

**What the Monitor Does:**

1. Checks RSS feeds and APIs for keywords: "mental health", "psychiatric", "suicide", "clinical decision support", etc.
2. Creates a GitHub Issue with findings if any are detected
3. Issue includes title, source, date, summary, and direct link for each finding

**Limitations:**
- **Federal-only**: Only monitors FDA sources; does not track state legislation
- **Forward-looking only**: RSS/API feeds retain only recent documents (30-90 days); cannot search historical archives
- **Misses some federal activity**: Does not capture FDA advisory committee recommendations or some draft guidances

**Reviewing Automated Findings:**

When you receive a notification:

1. Go to GitHub Issues and find the regulatory monitor issue
2. Review each finding for relevance
3. For relevant items:
   - Add to `regulations.yml` following the format above
   - Update "Last Updated" date in `index.md` line 417
4. Close the issue after review

### State Legislation Monitoring (WestLaw)

Since there is no unified API for 50 state legislatures, we use **WestLaw WestClip alerts** to track state mental health AI legislation.

**Setting Up WestClip Alerts:**

1. **Log in to WestLaw** (requires subscription)

2. **Navigate to WestClip**:
   - Click "Alerts" in the top menu
   - Select "Create Alert" → "WestClip"

3. **Configure Search Query** (Alert #1 - All Activity):
   ```
   "mental health" OR "behavioral health" OR psychiatric /s "artificial intelligence" OR AI OR "machine learning" OR chatbot
   ```
   - **Database**: State Statutes & Legislation (all jurisdictions)
   - **Frequency**: Weekly (Monday mornings recommended)
   - **Delivery**: Email with document links
   - **Date Range**: Last 7 days

4. **Create Second Alert** (Alert #2 - Enacted Laws Only):
   - Same search query as above
   - **Additional Filter**: Document Status = "Enacted" or "Signed"
   - **Frequency**: Weekly
   - This filters out proposed bills and focuses on actual law changes

**Processing WestLaw Alerts:**

1. **Review weekly alert emails** for relevant mental health AI legislation
2. **Evaluate for inclusion**:
   - Does it specifically regulate AI in mental health contexts?
   - Is it enacted (not just proposed)?
   - What's the impact level (disclosure only vs. practice restrictions)?
3. **Add to regulations.yml**:
   - Use `category: state`
   - Set `high_impact: true` for practice restrictions, bans, or liability provisions
   - Set `high_impact: false` for disclosure/transparency requirements
4. **Update "Last Updated" date** in `index.md` line 417

**Recommended Review Frequency:**
- **Weekly**: Process WestLaw alert emails as received
- **Quarterly**: Comprehensive manual review (see "Quarterly State Review Checklist" below)

**Quarterly State Review Checklist:**

Even with WestLaw alerts, conduct a quarterly manual check (January, April, July, October):

1. **High-Activity States** (search legislature sites directly):
   - California, Illinois, New York, Texas, Massachusetts, Washington
2. **Key Search Terms**:
   - "mental health artificial intelligence"
   - "AI therapy" or "AI counseling"
   - "digital mental health"
3. **WestLaw Verification**:
   - Run the WestClip query manually to catch anything alerts missed
   - Check for enacted laws in past 90 days

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
