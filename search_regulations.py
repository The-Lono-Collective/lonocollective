#!/usr/bin/env python3
"""
Search for mental health AI regulatory developments
Date range: January 1, 2024 - November 24, 2024
"""

import feedparser
import requests
import json
from datetime import datetime, timedelta

# Mental health AI keywords to filter for
KEYWORDS = [
    'mental health', 'psychiatric', 'suicide', 'crisis intervention',
    'clinical decision support', 'behavioral health', 'psychotherapy',
    'depression screening', 'anxiety', 'AI diagnostic', 'mental healthcare',
    'telehealth', 'digital therapeutics'
]

# RSS/API feeds to monitor
FEEDS = [
    {
        'name': 'Federal Register (FDA)',
        'url': 'https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=food-and-drug-administration&conditions[type][]=RULE&conditions[type][]=PRORULE&per_page=100',
        'type': 'json'
    },
    {
        'name': 'FDA News',
        'url': 'https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/fda-newsroom/rss.xml',
        'type': 'rss'
    }
]

findings = []
start_date = datetime(2024, 3, 1)
end_date = datetime(2024, 12, 31)

print(f">> Searching for mental health AI regulatory developments...")
print(f">> Date range: {start_date.strftime('%B %d, %Y')} - {end_date.strftime('%B %d, %Y')}\n")
print("=" * 80)

for feed_info in FEEDS:
    try:
        print(f"\n>> Checking: {feed_info['name']}")
        print("-" * 80)

        if feed_info['type'] == 'rss':
            feed = feedparser.parse(feed_info['url'])

            for entry in feed.entries:
                title = entry.get('title', '').lower()
                summary = entry.get('summary', '').lower()
                combined_text = f"{title} {summary}"

                # Check if any keywords match
                if any(keyword.lower() in combined_text for keyword in KEYWORDS):
                    pub_date_str = entry.get('published', '')

                    findings.append({
                        'source': feed_info['name'],
                        'title': entry.get('title', 'No title'),
                        'link': entry.get('link', ''),
                        'date': pub_date_str,
                        'summary': entry.get('summary', 'No summary')[:400]
                    })
                    print(f"[FOUND] {entry.get('title', 'No title')}")
                    print(f"  Date: {pub_date_str}")
                    print(f"  Link: {entry.get('link', 'N/A')[:80]}")
                    print()

        elif feed_info['type'] == 'json':
            response = requests.get(feed_info['url'], timeout=15)
            if response.status_code == 200:
                data = response.json()
                results = data.get('results', [])

                for item in results:
                    title = item.get('title', '').lower()
                    abstract = item.get('abstract', '').lower()
                    combined_text = f"{title} {abstract}"

                    # Parse date
                    pub_date_str = item.get('publication_date', '')
                    try:
                        pub_date = datetime.strptime(pub_date_str, '%Y-%m-%d')
                        if not (start_date <= pub_date <= end_date):
                            continue
                    except:
                        pass

                    if any(keyword.lower() in combined_text for keyword in KEYWORDS):
                        findings.append({
                            'source': feed_info['name'],
                            'title': item.get('title', 'No title'),
                            'link': item.get('html_url', ''),
                            'date': pub_date_str,
                            'summary': item.get('abstract', 'No summary')[:400]
                        })
                        print(f"[FOUND] {item.get('title', 'No title')}")
                        print(f"  Date: {pub_date_str}")
                        print(f"  Link: {item.get('html_url', 'N/A')}")
                        print()

    except Exception as e:
        print(f"[WARNING] Error checking {feed_info['name']}: {str(e)}")
        print()

print("\n" + "=" * 80)
print(f">> TOTAL FINDINGS: {len(findings)}")
print("=" * 80)

if findings:
    # Save findings to JSON
    with open('regulatory_search_results.json', 'w') as f:
        json.dump(findings, f, indent=2)
    print(f"\n[SUCCESS] Results saved to: regulatory_search_results.json")

    # Print summary
    print("\n>> SUMMARY OF FINDINGS:")
    print("=" * 80)
    for i, finding in enumerate(findings, 1):
        print(f"\n{i}. {finding['title']}")
        print(f"   Source: {finding['source']}")
        print(f"   Date: {finding['date']}")
        print(f"   Link: {finding['link']}")
else:
    print("\n[INFO] No mental health AI regulatory developments found in the specified date range.")
    print("This could mean:")
    print("  - Feeds don't contain items matching our keywords")
    print("  - Items are outside the date range")
    print("  - Network/API issues")
