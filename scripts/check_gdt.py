#!/usr/bin/env python3
import urllib.request
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

base_url = "https://s3.amazonaws.com/www-production.globaldairytrade.info/results/"

def fetch_json(path):
    url = base_url + path
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

latest = fetch_json("latest.json")
if latest and "latestEvent" in latest:
    guid = latest["latestEvent"]
    summary = fetch_json(f"{guid}/event_summary.json")
    prod_summary = fetch_json(f"{guid}/product_groups_summary.json")
    
    ev_info = summary.get("EventSummary", {}) if summary else {}
    print(f"=== GDT Event {ev_info.get('EventNumber')} ===")
    print(f"Date: {ev_info.get('EventDate')}")
    print(f"Average Winning Price: ${ev_info.get('AveragePublishedPrice')} / MT")
    print(f"Price Index Change: {ev_info.get('ChangeInPriceIndex')}%")
    print(f"Quantity Sold: {ev_info.get('QuantitySold')} MT")
    print(f"Participating Bidders: {ev_info.get('ParticipatingBidders')}")
    
    print("\n--- Product Groups Summary ---")
    if prod_summary:
        for p in prod_summary.get("ProductGroups", {}).get("ProductGroupResult", []):
            name = p.get("ProductGroupName")
            code = p.get("ProductGroupCode")
            price = p.get("AveragePublishedPrice")
            change = p.get("PriceIndexPercentageChange")
            if price:
                print(f"• {name} ({code}): ${price} / MT ({change}%)")
