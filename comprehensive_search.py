#!/usr/bin/env python3
"""
Comprehensive search for mental health AI regulations in 2025
"""

import requests
from datetime import datetime

KEYWORDS = [
    'mental health', 'psychiatric', 'suicide', 'crisis', 'behavioral health',
    'depression', 'anxiety', 'clinical decision support', 'AI', 'artificial intelligence',
    'machine learning', 'telehealth', 'digital therapeutics', 'mental', 'psychological'
]

print(">> Comprehensive search: Mental health AI regulations in 2025")
print(">> Searching 200 most recent FDA documents...")
print("=" * 80)

findings = []
start_date = datetime(2025, 1, 1)
end_date = datetime(2025, 11, 24)

try:
    # Search with higher limit
    url = 'https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=food-and-drug-administration&per_page=200'
    response = requests.get(url, timeout=30)

    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])
        print(f">> Retrieved {len(results)} documents")
        print(">> Filtering for 2025 + mental health AI keywords...")
        print("-" * 80)

        for item in results:
            # Check date
            pub_date_str = item.get('publication_date', '')
            try:
                pub_date = datetime.strptime(pub_date_str, '%Y-%m-%d')
                if not (start_date <= pub_date <= end_date):
                    continue
            except:
                continue

            # Check keywords
            title = item.get('title', '').lower()
            abstract = item.get('abstract', '').lower()
            combined_text = f"{title} {abstract}"

            matching_keywords = [kw for kw in KEYWORDS if kw.lower() in combined_text]

            if matching_keywords:
                findings.append({
                    'date': pub_date_str,
                    'title': item.get('title', 'No title'),
                    'type': item.get('type', 'Unknown'),
                    'link': item.get('html_url', ''),
                    'abstract': item.get('abstract', 'No abstract')[:500],
                    'matching_keywords': matching_keywords
                })

                print(f"\n[FOUND] {item.get('title', 'No title')[:100]}")
                print(f"  Date: {pub_date_str}")
                print(f"  Type: {item.get('type', 'Unknown')}")
                print(f"  Matched: {', '.join(matching_keywords[:5])}")
    else:
        print(f"HTTP Error: {response.status_code}")

except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 80)
print(f">> TOTAL FINDINGS: {len(findings)}")
print("=" * 80)

if findings:
    # Save to JSON
    import json
    with open('mental_health_ai_regulations_2025.json', 'w') as f:
        json.dump(findings, f, indent=2)

    print("\n>> DETAILED RESULTS:")
    print("=" * 80)

    for i, finding in enumerate(findings, 1):
        print(f"\n{i}. {finding['title']}")
        print(f"   Date: {finding['date']}")
        print(f"   Type: {finding['type']}")
        print(f"   Matched Keywords: {', '.join(finding['matching_keywords'])}")
        print(f"   Link: {finding['link']}")
        print(f"   Abstract: {finding['abstract'][:200]}...")

    print(f"\n[SUCCESS] Full results saved to: mental_health_ai_regulations_2025.json")
else:
    print("\n[INFO] No mental health AI regulations found in 2025.")
    print("This suggests:")
    print("  - No major mental health AI regulations published by FDA in 2025 yet")
    print("  - May need to check CMS, state legislatures, or clinical bodies")
