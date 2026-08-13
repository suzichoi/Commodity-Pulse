import urllib.request
import re

url = 'https://www.globaldairytrade.info/en/product-results/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
html = urllib.request.urlopen(req).read().decode('utf-8')

print("Page HTML Length:", len(html))

# Look for table data
tables = re.findall(r'<table.*?>([\s\S]*?)</table>', html)
print(f"Found {len(tables)} tables")

for i, t in enumerate(tables):
    text_clean = re.sub(r'<[^>]+>', ' ', t)
    text_clean = ' '.join(text_clean.split())
    if any(k in text_clean for k in ['Index', 'WMP', 'SMP', 'Butter', 'USD', '3778']):
        print(f"--- Table {i} ---")
        print(text_clean[:500])

# Look for text around 3778 or Index
for line in html.split('\n'):
    if '3778' in line or '3,778' in line or '3,7' in line or '3,8' in line or 'USD/MT' in line or 'Average price' in line:
        clean = re.sub(r'<[^>]+>', ' ', line).strip()
        if len(clean) > 0 and len(clean) < 300:
            print("MATCH:", clean)
