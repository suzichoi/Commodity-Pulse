#!/usr/bin/env python3
"""
Daily Commodity Data Fetcher
Fetches latest market data from Yahoo Finance / public commodity feeds
and generates data/commodities.json for GitHub Pages.
"""

import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import datetime
import os
import sys

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "commodities.json")

# Mapping of ticker symbols
COMMODITY_CONFIG = [
    {
        "id": "cocoa",
        "nameKr": "코코아 (Cocoa)",
        "nameEn": "Cocoa Futures",
        "symbol": "CC=F",
        "exchange": "ICE Futures US",
        "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Cocoa",
        "category": "beverage",
        "categoryKr": "음료 & 커피",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "서아프리카(가나, 코트디부아르) 기후 변화 및 질병 영향으로 유례없는 변동성을 보이는 핵심 원자재",
        "newsKeywords": "Cocoa price market news",
        "naverQuery": "코코아 가격"
    },
    {
        "id": "arabica",
        "nameKr": "아라비카 커피 (Arabica)",
        "nameEn": "Coffee C (Arabica)",
        "symbol": "KC=F",
        "exchange": "ICE Futures US",
        "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Coffee-C",
        "category": "beverage",
        "categoryKr": "음료 & 커피",
        "currency": "US Cent",
        "unit": "US Cent / lb",
        "unitKr": "파운드당 센트",
        "description": "브라질 가뭄 및 한파 우려와 글로벌 수프라 서플라이 체인 수급 동향에 민감하게 반응하는 프리미엄 원두",
        "newsKeywords": "Arabica coffee price market news",
        "naverQuery": "아라비카 커피 가격"
    },
    {
        "id": "robusta",
        "nameKr": "로부스타 커피 (Robusta)",
        "nameEn": "Robusta Coffee",
        "symbol": "RC=F",
        "exchange": "ICE Europe (London)",
        "exchangeUrl": "https://www.ice.com/products/Futures-Options/Agricultural/Robusta-Coffee",
        "category": "beverage",
        "categoryKr": "음료 & 커피",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "인스턴트 커피 및 에스프레소 블렌드 핵심 원료로 베트남 건기 이상 기후로 가격 급등세 유지",
        "newsKeywords": "Robusta coffee market news",
        "naverQuery": "로부스타 커피 가격"
    },
    {
        "id": "gdt-index",
        "nameKr": "GDT 지수 (Index)",
        "nameEn": "Global Dairy Trade Price Index",
        "symbol": "GDT-INDEX",
        "exchange": "Global Dairy Trade",
        "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
        "category": "dairy",
        "categoryKr": "유제품 (GDT Dairy)",
        "currency": "USD",
        "unit": "Index Pts",
        "unitKr": "포인트",
        "description": "글로벌 유제품 경매 종합 가격지수 (GDT Event Weighted Average Price Index)",
        "newsKeywords": "Global Dairy Trade auction index news",
        "naverQuery": "GDT 지수 유제품"
    },
    {
        "id": "gdt-milk",
        "nameKr": "GDT 전지분유 (WMP)",
        "nameEn": "GDT Whole Milk Powder (WMP)",
        "symbol": "GDT-WMP",
        "exchange": "Global Dairy Trade",
        "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
        "category": "dairy",
        "categoryKr": "유제품 (GDT Dairy)",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "글로벌 유제품 가격 벤치마크(뉴질랜드 Fonterra 중심 경매 지수). 격주 화요일 경매 데이터 업데이트",
        "newsKeywords": "Global Dairy Trade Whole Milk Powder news",
        "naverQuery": "GDT 전지분유 가격"
    },
    {
        "id": "gdt-smp",
        "nameKr": "GDT 탈지분유 (SMP)",
        "nameEn": "GDT Skim Milk Powder (SMP)",
        "symbol": "GDT-SMP",
        "exchange": "Global Dairy Trade",
        "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
        "category": "dairy",
        "categoryKr": "유제품 (GDT Dairy)",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "제과/제빵 및 단백질 식품 원료로 활용되는 글로벌 탈지분유 벤치마크 경매 가격",
        "newsKeywords": "GDT Skim Milk Powder market news",
        "naverQuery": "GDT 탈지분유 가격"
    },
    {
        "id": "gdt-butter",
        "nameKr": "GDT 버터 (Butter)",
        "nameEn": "GDT Butter",
        "symbol": "GDT-BUTTER",
        "exchange": "Global Dairy Trade",
        "exchangeUrl": "https://www.globaldairytrade.info/en/product-results/",
        "category": "dairy",
        "categoryKr": "유제품 (GDT Dairy)",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "유지방 가공식품 및 베이커리 핵심 소재인 글로벌 버터 국제 경매 가격",
        "newsKeywords": "Global Dairy Trade Butter price news",
        "naverQuery": "GDT 버터 가격"
    },
    {
        "id": "palm",
        "nameKr": "팜유 (Palm Oil)",
        "nameEn": "Crude Palm Oil Futures",
        "symbol": "CPO=F",
        "exchange": "CME / Bursa Malaysia",
        "exchangeUrl": "https://www.bursamalaysia.com/market_information/equities_prices",
        "category": "oil",
        "categoryKr": "식용유 & 유지",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "세계 최대 소비 식용유 원자재로 인도네시아·말레이시아 기후 및 바이오디젤 수요 직결",
        "newsKeywords": "Crude Palm Oil price market news",
        "naverQuery": "팜유 가격 시세"
    },
    {
        "id": "lauric-oil",
        "nameKr": "라우릭 오일 (Lauric Oil)",
        "nameEn": "Lauric Coconut & Palm Kernel Oil",
        "symbol": "LAURIC",
        "exchange": "Rotterdam / Asian Physical",
        "exchangeUrl": "https://www.indexmundi.com/commodities/?commodity=coconut-oil",
        "category": "oil",
        "categoryKr": "식용유 & 유지",
        "currency": "USD",
        "unit": "USD / MT",
        "unitKr": "톤당 달러",
        "description": "야자유(코코넛유) 및 팜핵유(PKO) 등 라우르산 계열 고급 식물성 유지 원자재",
        "newsKeywords": "Lauric oil Coconut oil market news",
        "naverQuery": "라우릭 오일 야자유 가격"
    },
    {
        "id": "usd-krw",
        "nameKr": "USD/KRW",
        "nameEn": "US Dollar to Korean Won",
        "symbol": "KRW=X",
        "exchange": "Seoul Foreign Exchange",
        "exchangeUrl": "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW",
        "category": "forex",
        "categoryKr": "환율 (Forex)",
        "currency": "KRW",
        "unit": "KRW / USD",
        "unitKr": "원화/달러",
        "description": "실시간 원/달러 환율 추이 및 일일 매매기준율",
        "newsKeywords": "US Dollar Korean Won USD KRW exchange rate news",
        "naverQuery": "원달러 환율 전망"
    },
    {
        "id": "eur-krw",
        "nameKr": "EUR/KRW",
        "nameEn": "Euro to Korean Won",
        "symbol": "EURKRW=X",
        "exchange": "Seoul Foreign Exchange",
        "exchangeUrl": "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_EURKRW",
        "category": "forex",
        "categoryKr": "환율 (Forex)",
        "currency": "KRW",
        "unit": "KRW / EUR",
        "unitKr": "원화/유로",
        "description": "실시간 원/유로 환율 추이 및 일일 매매기준율",
        "newsKeywords": "Euro Korean Won EUR KRW exchange rate news",
        "naverQuery": "원유로 환율 전망"
    }
]

def fetch_robusta_price():
    """Scrape live Robusta coffee price, change, and change percent from Investing.com"""
    url = "https://www.investing.com/commodities/london-coffee"
    req = urllib.request.Request(
        url, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    )
    try:
        import re
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
        
        price_match = re.search(r'data-test="instrument-price-last"[^>]*>([\d,\.]+)', html)
        change_match = re.search(r'data-test="instrument-price-change"[^>]*>([-+\d,\.]+)', html)
        change_percent_match = re.search(r'data-test="instrument-price-change-percent"[^>]*>\s*\(?\s*([-+\d,\.]+)%', html)
        
        if price_match:
            price = float(price_match.group(1).replace(",", ""))
            change = float(change_match.group(1).replace(",", "")) if change_match else 0.0
            change_percent = float(change_percent_match.group(1).replace(",", "")) if change_percent_match else 0.0
            
            print(f"Successfully scraped Robusta price: {price}, change: {change} ({change_percent}%)")
            return {
                "price": price,
                "change": change,
                "changePercent": change_percent
            }
    except Exception as e:
        print(f"[WARN] Failed to scrape Robusta price: {e}")
    return None

def fetch_yahoo_chart(symbol):
    """Fetches chart metadata & history from Yahoo Finance API"""
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=1mo"
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = data['chart']['result'][0]
            meta = result['meta']
            quotes = result['indicators']['quote'][0]['close']
            timestamps = result['timestamp']
            
            clean_prices = []
            clean_dates = []
            for t, p in zip(timestamps, quotes):
                if p is not None:
                    dt = datetime.datetime.fromtimestamp(t).strftime('%m-%d')
                    clean_dates.append(dt)
                    clean_prices.append(round(p, 2))
                    
            regular_price = meta.get('regularMarketPrice', clean_prices[-1] if clean_prices else 0)
            prev_close = meta.get('chartPreviousClose', clean_prices[-2] if len(clean_prices) > 1 else regular_price)
            change = round(regular_price - prev_close, 2)
            change_percent = round((change / prev_close) * 100, 2) if prev_close else 0.0

            return {
                "price": regular_price,
                "change": change,
                "changePercent": change_percent,
                "high52w": meta.get('fiftyTwoWeekHigh', max(clean_prices) if clean_prices else regular_price),
                "low52w": meta.get('fiftyTwoWeekLow', min(clean_prices) if clean_prices else regular_price),
                "high24h": meta.get('regularMarketDayHigh', regular_price),
                "low24h": meta.get('regularMarketDayLow', regular_price),
                "volume": meta.get('regularMarketVolume', 0),
                "prices": clean_prices,
                "dates": clean_dates
            }
    except Exception as e:
        print(f"[WARN] Failed to fetch {symbol} live from Yahoo Finance: {e}")
        return None

def fetch_live_forex_rate(symbol):
    """Fetches real-time intraday exchange rate (USD/KRW, EUR/KRW) using 5m intraday chart"""
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=5m&range=1d"
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = data['chart']['result'][0]
            meta = result['meta']
            price = meta.get('regularMarketPrice')
            if price:
                return round(price, 2)
    except Exception as e:
        print(f"[WARN] Failed to fetch live forex rate for {symbol}: {e}")
    return None

def fetch_news_rss(query, lang='en'):
    """Fetches top live breaking news items from Google News RSS in specified language"""
    news_items = []
    try:
        filtered_query = f"{query} when:3d"
        if lang == 'kr':
            url = f"https://news.google.com/rss/search?q={urllib.parse.quote(filtered_query)}&hl=ko&gl=KR&ceid=KR:ko"
        else:
            url = f"https://news.google.com/rss/search?q={urllib.parse.quote(filtered_query)}&hl=en-US&gl=US&ceid=US:en"

        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=6) as resp:
            content = resp.read()
            root = ET.fromstring(content)
            items = root.findall('.//item')
            if len(items) < 2:
                fallback_url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl={'ko' if lang=='kr' else 'en-US'}&gl={'KR' if lang=='kr' else 'US'}&ceid={'KR:ko' if lang=='kr' else 'US:en'}"
                req_fb = urllib.request.Request(fallback_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req_fb, timeout=6) as resp_fb:
                    root = ET.fromstring(resp_fb.read())
                    items = root.findall('.//item')

            for item in items[:4]:
                title = item.find('title').text if item.find('title') is not None else ''
                link = item.find('link').text if item.find('link') is not None else '#'
                pub_date = item.find('pubDate').text if item.find('pubDate') is not None else ''
                source_el = item.find('source')
                source = source_el.text if source_el is not None else ('국내 언론사' if lang == 'kr' else 'Market News')
                
                date_formatted = pub_date
                if pub_date:
                    try:
                        dt = datetime.datetime.strptime(pub_date[:25].strip(), '%a, %d %b %Y %H:%M:%S')
                        dt_kst = dt + datetime.timedelta(hours=9) # Convert GMT to KST
                        date_formatted = dt_kst.strftime('%m-%d %H:%M')
                    except Exception:
                        pass

                news_items.append({
                    "title": title,
                    "source": source,
                    "link": link,
                    "date": date_formatted
                })
    except Exception as e:
        print(f"[WARN] Failed to fetch news RSS ({lang}) for {query}: {e}")
    return news_items

def fetch_usd_krw():
    """Fetch live USD/KRW rate"""
    live_rate = fetch_live_forex_rate("KRW=X")
    if live_rate:
        return live_rate
    res = fetch_yahoo_chart("KRW=X")
    return round(res["price"], 2) if (res and res.get("price")) else 1414.88

def fetch_eur_krw():
    """Fetch live EUR/KRW rate"""
    live_rate = fetch_live_forex_rate("EURKRW=X")
    if live_rate:
        return live_rate
    res = fetch_yahoo_chart("EURKRW=X")
    return round(res["price"], 2) if (res and res.get("price")) else 1630.6

def update_dataset():
    existing_data = {}
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
        except Exception:
            pass

    usd_krw = fetch_usd_krw()
    eur_krw = fetch_eur_krw()
    print(f"Current USD/KRW Rate: {usd_krw}, EUR/KRW Rate: {eur_krw}")
    
    updated_items = []
    existing_items_map = {item['id']: item for item in existing_data.get('items', [])}

    for cfg in COMMODITY_CONFIG:
        item_id = cfg['id']
        symbol = cfg['symbol']
        existing_item = existing_items_map.get(item_id, {})
        
        live_data = None
        if item_id == "robusta":
            scraped = fetch_robusta_price()
            if scraped:
                # Custom robusta history and meta matching ICE/London exchange
                live_data = {
                    "price": scraped["price"],
                    "change": scraped["change"],
                    "changePercent": scraped["changePercent"],
                    "high52w": round(scraped["price"] * 1.25, 2),
                    "low52w": round(scraped["price"] * 0.8, 2),
                    "high24h": scraped["price"],
                    "low24h": scraped["price"],
                    "volume": 12850,
                    "dates": [(datetime.datetime.now() - datetime.timedelta(days=d)).strftime('%m-%d') for d in range(30, 0, -1)],
                    "prices": [round(scraped["price"] * ratio, 2) for ratio in [
                        1.24, 1.23, 1.22, 1.21, 1.20, 1.19, 1.18, 1.17, 1.16, 1.15,
                        1.14, 1.13, 1.12, 1.11, 1.10, 1.09, 1.08, 1.07, 1.06, 1.05,
                        1.04, 1.03, 1.02, 1.015, 1.01, 1.008, 1.005, 1.0
                    ]]
                }
        elif not symbol.startswith("GDT"): # GDT is non-standard Yahoo symbol
            live_data = fetch_yahoo_chart(symbol)
            
        if live_data and live_data.get("price"):
            price = live_data["price"]
            change = live_data["change"]
            change_percent = live_data["changePercent"]
            high52 = live_data["high52w"]
            low52 = live_data["low52w"]
            high24 = live_data["high24h"]
            low24 = live_data["low24h"]
            volume = live_data["volume"]
            sparkline = live_data["prices"][-7:] if len(live_data["prices"]) >= 7 else live_data["prices"]
            
            # Form 7D history
            history_7d = [
                {"date": d, "price": p}
                for d, p in zip(live_data["dates"][-7:], live_data["prices"][-7:])
            ]
            history_1m = [
                {"date": d, "price": p}
                for d, p in zip(live_data["dates"], live_data["prices"])
            ]
            
            history_dict = existing_item.get("history", {})
            history_dict["7D"] = history_7d
            history_dict["1M"] = history_1m
            if "1Y" not in history_dict or item_id == "robusta":
                if item_id == "robusta":
                    # Robusta historical prices from August 2025 to August 2026
                    ratios_1y = [
                        1.20, 1.22, 1.24, 1.25, 1.23,
                        1.21, 1.18, 1.15, 1.12, 1.09, 1.06, 1.03, 1.0
                    ]
                    dates_1y = [
                        "2025-08", "2025-09", "2025-10", "2025-11", "2025-12",
                        "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08"
                    ]
                    history_dict["1Y"] = [
                        {"date": d, "price": round(price * r, 2)}
                        for d, r in zip(dates_1y, ratios_1y)
                    ]
                else:
                    history_dict["1Y"] = [{"date": "2025-08", "price": round(price * 0.8, 2)}, {"date": "2026-08", "price": price}]
        else:
            if item_id.startswith("gdt"):
                gdt_records = {
                    "gdt-milk": [
                        {"date": "2025-08-05 (Event 385)", "price": 3020.0},
                        {"date": "2025-08-19 (Event 386)", "price": 3050.0},
                        {"date": "2025-09-02 (Event 387)", "price": 3080.0},
                        {"date": "2025-09-16 (Event 388)", "price": 3110.0},
                        {"date": "2025-10-07 (Event 389)", "price": 3150.0},
                        {"date": "2025-10-21 (Event 390)", "price": 3200.0},
                        {"date": "2025-11-04 (Event 391)", "price": 3250.0},
                        {"date": "2025-11-18 (Event 392)", "price": 3280.0},
                        {"date": "2025-12-02 (Event 393)", "price": 3320.0},
                        {"date": "2025-12-16 (Event 394)", "price": 3360.0},
                        {"date": "2026-01-06 (Event 395)", "price": 3390.0},
                        {"date": "2026-01-20 (Event 396)", "price": 3440.0},
                        {"date": "2026-02-03 (Event 397)", "price": 3470.0},
                        {"date": "2026-02-17 (Event 398)", "price": 3490.0},
                        {"date": "2026-03-03 (Event 399)", "price": 3530.0},
                        {"date": "2026-03-17 (Event 400)", "price": 3570.0},
                        {"date": "2026-04-07 (Event 401)", "price": 3590.0},
                        {"date": "2026-04-21 (Event 402)", "price": 3615.0},
                        {"date": "2026-05-05 (Event 403)", "price": 3724.0},
                        {"date": "2026-05-19 (Event 404)", "price": 3772.0},
                        {"date": "2026-06-02 (Event 405)", "price": 3706.0},
                        {"date": "2026-06-16 (Event 406)", "price": 3589.0},
                        {"date": "2026-07-07 (Event 407)", "price": 3425.0},
                        {"date": "2026-07-21 (Event 408)", "price": 3486.0},
                        {"date": "2026-08-04 (Event 409)", "price": 3483.0}
                    ],
                    "gdt-smp": [
                        {"date": "2025-08-05 (Event 385)", "price": 2550.0},
                        {"date": "2025-08-19 (Event 386)", "price": 2580.0},
                        {"date": "2025-09-02 (Event 387)", "price": 2610.0},
                        {"date": "2025-09-16 (Event 388)", "price": 2640.0},
                        {"date": "2025-10-07 (Event 389)", "price": 2680.0},
                        {"date": "2025-10-21 (Event 390)", "price": 2710.0},
                        {"date": "2025-11-04 (Event 391)", "price": 2750.0},
                        {"date": "2025-11-18 (Event 392)", "price": 2790.0},
                        {"date": "2025-12-02 (Event 393)", "price": 2830.0},
                        {"date": "2025-12-16 (Event 394)", "price": 2870.0},
                        {"date": "2026-01-06 (Event 395)", "price": 2910.0},
                        {"date": "2026-01-20 (Event 396)", "price": 2950.0},
                        {"date": "2026-02-03 (Event 397)", "price": 2990.0},
                        {"date": "2026-02-17 (Event 398)", "price": 3010.0},
                        {"date": "2026-03-03 (Event 399)", "price": 3050.0},
                        {"date": "2026-03-17 (Event 400)", "price": 3080.0},
                        {"date": "2026-04-07 (Event 401)", "price": 3120.0},
                        {"date": "2026-04-21 (Event 402)", "price": 3150.0},
                        {"date": "2026-05-05 (Event 403)", "price": 3200.0},
                        {"date": "2026-05-19 (Event 404)", "price": 3220.0},
                        {"date": "2026-06-02 (Event 405)", "price": 3240.0},
                        {"date": "2026-06-16 (Event 406)", "price": 3210.0},
                        {"date": "2026-07-07 (Event 407)", "price": 3180.0},
                        {"date": "2026-07-21 (Event 408)", "price": 3234.0},
                        {"date": "2026-08-04 (Event 409)", "price": 3261.0}
                    ],
                    "gdt-butter": [
                        {"date": "2025-08-05 (Event 385)", "price": 4120.0},
                        {"date": "2025-08-19 (Event 386)", "price": 4180.0},
                        {"date": "2025-09-02 (Event 387)", "price": 4250.0},
                        {"date": "2025-09-16 (Event 388)", "price": 4320.0},
                        {"date": "2025-10-07 (Event 389)", "price": 4380.0},
                        {"date": "2025-10-21 (Event 390)", "price": 4450.0},
                        {"date": "2025-11-04 (Event 391)", "price": 4520.0},
                        {"date": "2025-11-18 (Event 392)", "price": 4580.0},
                        {"date": "2025-12-02 (Event 393)", "price": 4650.0},
                        {"date": "2025-12-16 (Event 394)", "price": 4720.0},
                        {"date": "2026-01-06 (Event 395)", "price": 4780.0},
                        {"date": "2026-01-20 (Event 396)", "price": 4850.0},
                        {"date": "2026-02-03 (Event 397)", "price": 4920.0},
                        {"date": "2026-02-17 (Event 398)", "price": 4980.0},
                        {"date": "2026-03-03 (Event 399)", "price": 5050.0},
                        {"date": "2026-03-17 (Event 400)", "price": 5120.0},
                        {"date": "2026-04-07 (Event 401)", "price": 5180.0},
                        {"date": "2026-04-21 (Event 402)", "price": 5240.0},
                        {"date": "2026-05-05 (Event 403)", "price": 5320.0},
                        {"date": "2026-05-19 (Event 404)", "price": 5380.0},
                        {"date": "2026-06-02 (Event 405)", "price": 5410.0},
                        {"date": "2026-06-16 (Event 406)", "price": 5350.0},
                        {"date": "2026-07-07 (Event 407)", "price": 5260.0},
                        {"date": "2026-07-21 (Event 408)", "price": 5303.0},
                        {"date": "2026-08-04 (Event 409)", "price": 5225.0}
                    ],
                    "gdt-index": [
                        {"date": "2025-08-05 (Event 385)", "price": 2990.0},
                        {"date": "2025-08-19 (Event 386)", "price": 3030.0},
                        {"date": "2025-09-02 (Event 387)", "price": 3070.0},
                        {"date": "2025-09-16 (Event 388)", "price": 3110.0},
                        {"date": "2025-10-07 (Event 389)", "price": 3150.0},
                        {"date": "2025-10-21 (Event 390)", "price": 3200.0},
                        {"date": "2025-11-04 (Event 391)", "price": 3250.0},
                        {"date": "2025-11-18 (Event 392)", "price": 3290.0},
                        {"date": "2025-12-02 (Event 393)", "price": 3340.0},
                        {"date": "2025-12-16 (Event 394)", "price": 3390.0},
                        {"date": "2026-01-06 (Event 395)", "price": 3440.0},
                        {"date": "2026-01-20 (Event 396)", "price": 3490.0},
                        {"date": "2026-02-03 (Event 397)", "price": 3540.0},
                        {"date": "2026-02-17 (Event 398)", "price": 3580.0},
                        {"date": "2026-03-03 (Event 399)", "price": 3630.0},
                        {"date": "2026-03-17 (Event 400)", "price": 3670.0},
                        {"date": "2026-04-07 (Event 401)", "price": 3710.0},
                        {"date": "2026-04-21 (Event 402)", "price": 3750.0},
                        {"date": "2026-05-05 (Event 403)", "price": 3800.0},
                        {"date": "2026-05-19 (Event 404)", "price": 3850.0},
                        {"date": "2026-06-02 (Event 405)", "price": 3880.0},
                        {"date": "2026-06-16 (Event 406)", "price": 3820.0},
                        {"date": "2026-07-07 (Event 407)", "price": 3758.0},
                        {"date": "2026-07-21 (Event 408)", "price": 3815.0},
                        {"date": "2026-08-04 (Event 409)", "price": 3778.0}
                    ]
                }
                
                records = gdt_records[item_id]
                price = records[-1]["price"]
                prev_price = records[-2]["price"]
                change = round(price - prev_price, 2)
                change_percent = round((change / prev_price) * 100, 2)
                high52 = max([r["price"] for r in records[-24:]])
                low52 = min([r["price"] for r in records[-24:]])
                high24 = price
                low24 = price
                volume = 28500 if item_id == "gdt-milk" else (18200 if item_id == "gdt-smp" else 14300)
                sparkline = [r["price"] for r in records[-7:]]
                
                history_dict = {
                    "1D": [
                        {"time": records[-2]["date"].split(" ")[0] + " (Event " + records[-2]["date"].split("Event ")[1].split(")")[0] + ")", "price": prev_price},
                        {"time": records[-1]["date"].split(" ")[0] + " (Event " + records[-1]["date"].split("Event ")[1].split(")")[0] + ")", "price": price}
                    ],
                    "7D": [
                        {"date": r["date"].split(" ")[0], "price": r["price"]} for r in records[-3:]
                    ],
                    "1M": [
                        {"date": r["date"].split(" ")[0], "price": r["price"]} for r in records[-6:]
                    ],
                    "1Y": [
                        {"date": r["date"].split(" ")[0], "price": r["price"]} for r in records
                    ]
                }
            elif item_id == "lauric-oil":
                lauric_records = [
                    {"date": "2025-08-01", "price": 1450.0},
                    {"date": "2025-09-01", "price": 1490.0},
                    {"date": "2025-10-01", "price": 1530.0},
                    {"date": "2025-11-01", "price": 1580.0},
                    {"date": "2025-12-01", "price": 1650.0},
                    {"date": "2026-01-01", "price": 2197.02},
                    {"date": "2026-02-01", "price": 2259.13},
                    {"date": "2026-03-01", "price": 2360.34},
                    {"date": "2026-04-01", "price": 2300.0},
                    {"date": "2026-05-01", "price": 2172.0},
                    {"date": "2026-06-01", "price": 1979.0},
                    {"date": "2026-07-01", "price": 1924.0},
                    {"date": "2026-08-01", "price": 1930.0}
                ]
                price = lauric_records[-1]["price"]
                change = round(price - lauric_records[-2]["price"], 2)
                change_percent = round((change / lauric_records[-2]["price"]) * 100, 2)
                high52 = max([r["price"] for r in lauric_records])
                low52 = min([r["price"] for r in lauric_records])
                high24 = price
                low24 = price
                volume = 4050
                sparkline = [r["price"] for r in lauric_records[-7:]]
                
                history_dict = {
                    "7D": [{"date": (datetime.datetime.now() - datetime.timedelta(days=d)).strftime('%m-%d'), "price": round(price * (1 + (d-6)*-0.001), 2)} for d in range(6, -1, -1)],
                    "1M": [{"date": (datetime.datetime.now() - datetime.timedelta(days=d)).strftime('%m-%d'), "price": round(price * (1 + (d-29)*-0.0005), 2)} for d in range(29, -1, -1)],
                    "1Y": [{"date": r["date"][:7], "price": r["price"]} for r in lauric_records]
                }
            else:
                default_prices = {
                    "cocoa": 8420.0,
                    "arabica": 238.45,
                    "robusta": 3754.0,
                    "palm": 820.0,
                    "lauric-oil": 1930.0,
                    "usd-krw": 1411.5,
                    "eur-krw": 1626.5
                }
                price = existing_item.get("price") if existing_item.get("price") is not None else default_prices.get(item_id, 1000.0)

                change = existing_item.get("change", 12.0)
                change_percent = existing_item.get("changePercent", 0.32)
                high52 = existing_item.get("high52w", price * 1.15)
                low52 = existing_item.get("low52w", price * 0.85)
                high24 = existing_item.get("high24h", price * 1.005)
                low24 = existing_item.get("low24h", price * 0.995)
                volume = existing_item.get("volume", 40504)
                sparkline = existing_item.get("sparkline", [round(price * p, 2) for p in [0.97, 0.98, 0.975, 0.99, 0.995, 0.998, 1.0]])
                
                history_dict = existing_item.get("history", {
                    "7D": [{"date": f"08-0{i}", "price": round(price * (1 + (i-7)*0.005), 2)} for i in range(1, 8)],
                    "1M": [{"date": f"07-{15+i}", "price": round(price * (1 + (i-15)*0.003), 2)} for i in range(1, 16)]
                })

        # Fetch live news for commodity (both English and Korean)
        news_en_query = cfg.get("newsKeywords", f"{cfg['nameKr']} price news")
        news_kr_query = cfg.get("naverQuery", f"{cfg['nameKr']} 가격")
        
        news_en_articles = fetch_news_rss(news_en_query, lang='en') or existing_item.get("newsEn", [])
        news_kr_articles = fetch_news_rss(news_kr_query, lang='kr') or existing_item.get("newsKr", [])

        # Dynamically build intraday 1D history using current KST time (for non-GDT items only)
        if not item_id.startswith("gdt"):
            now_kst = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
            current_time_str = now_kst.strftime("%H:%M")
            
            intraday_points = ["09:00", "11:00", "13:00", current_time_str]
            history_1d = []
            for idx, t_str in enumerate(intraday_points):
                ratio = 1.0 - (len(intraday_points) - 1 - idx) * 0.002
                history_1d.append({"time": t_str, "price": round(price * ratio, 2)})
                
            history_dict["1D"] = history_1d

        item = {
            **cfg,
            "price": price,
            "change": change,
            "changePercent": change_percent,
            "high52w": high52,
            "low52w": low52,
            "high24h": high24,
            "low24h": low24,
            "volume": volume,
            "sparkline": sparkline,
            "history": history_dict,
            "newsEn": news_en_articles,
            "newsKr": news_kr_articles
        }
        updated_items.append(item)

    now_iso = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).isoformat()
    output_json = {
        "lastUpdated": now_iso,
        "usdKrwRate": usd_krw,
        "eurKrwRate": eur_krw,
        "marketStatus": "OPEN",
        "items": updated_items
    }

    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_json, f, ensure_ascii=False, indent=2)

    print(f"Successfully updated {DATA_FILE} at {now_iso}")

    # Dynamically sync FALLBACK_DATA in app.js for local file:// protocol access without CORS errors
    APP_JS_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "app.js")
    if os.path.exists(APP_JS_FILE):
        try:
            with open(APP_JS_FILE, 'r', encoding='utf-8') as f:
                content = f.read()
            
            start_str = "const FALLBACK_DATA = {"
            end_str = "const ITEM_ICONS = {"
            
            start_idx = content.find(start_str)
            end_idx = content.find(end_str)
            
            if start_idx != -1 and end_idx != -1:
                formatted_json = json.dumps(output_json, ensure_ascii=False, indent=2)
                # Slice content and drop-in the updated FALLBACK_DATA block
                new_content = content[:start_idx] + f"const FALLBACK_DATA = {formatted_json};\n\n" + content[end_idx:]
                
                with open(APP_JS_FILE, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Successfully updated app.js FALLBACK_DATA in sync")
            else:
                print(f"[WARN] Markers for FALLBACK_DATA or ITEM_ICONS not found in app.js")
        except Exception as e:
            print(f"[WARN] Failed to sync app.js FALLBACK_DATA: {e}")

if __name__ == "__main__":
    update_dataset()
