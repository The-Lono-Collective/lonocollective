#!/usr/bin/env python3
"""
Check what's actually in the regulatory feeds (no date filter, no keyword filter)
"""

import feedparser
import requests
from datetime import datetime

print(">> Checking what's actually available in the feeds...")
print("=" * 80)

# Check FDA News RSS
print("\n>> FDA News RSS - Last 10 items:")
print("-" * 80)
try:
    feed = feedparser.parse('https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/fda-newsroom/rss.xml')
    print(f"Total entries in feed: {len(feed.entries)}")
    for i, entry in enumerate(feed.entries[:10], 1):
        print(f"\n{i}. {entry.get('title', 'No title')}")
        print(f"   Published: {entry.get('published', 'Unknown')}")
        print(f"   Link: {entry.get('link', 'N/A')[:80]}")
except Exception as e:
    print(f"Error: {e}")

# Check Federal Register API
print("\n\n>> Federal Register (FDA) - Last 10 items:")
print("-" * 80)
try:
    url = 'https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=food-and-drug-administration&per_page=10'
    response = requests.get(url, timeout=15)
    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])
        print(f"Total items returned: {len(results)}")
        for i, item in enumerate(results, 1):
            print(f"\n{i}. {item.get('title', 'No title')}")
            print(f"   Date: {item.get('publication_date', 'Unknown')}")
            print(f"   Type: {item.get('type', 'Unknown')}")
            print(f"   Link: {item.get('html_url', 'N/A')}")
    else:
        print(f"HTTP Error: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 80)
print(">> This shows you what's actually available in the feeds")
