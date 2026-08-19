/**
 * Commodity Pulse Tracker - Application Controller
 */

let appState = {
  data: null,
  currency: 'USD', // 'USD' or 'KRW'
  selectedItemId: 'cocoa',
  selectedRange: '7D',
  activeCategory: 'all',
  searchQuery: '',
  cardFilter: 'featured', // 'featured' (주요 품목), 'gainers' (상승), 'losers' (하락)
  newsLang: 'KR',
  chartInstance: null
};

// Fallback seed data in case file:// CORS restricts fetch
const FALLBACK_DATA = {
  "fetch_status": "success",
  "last_updated": "2026-08-19 16:46:47",
  "weekly_report": {
    "title": "[2026 Week 34 Report]",
    "week_number": 34,
    "weekly_price_title": "[W34 주요품목가격]",
    "date": "2026.08.19",
    "report_date": "2026.08.19, 16:46",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,310.52 (▼3.91%)",
    "weekly_price_list": [
      "코코아 : $5,924.00 (▲1.77%)",
      "로부스타 커피 : $3,739.00 (▼1.48%)",
      "GDT 지수 : $3,873.00 (▲1.52%)",
      "GDT 전지분유 : $3,591.00 (▲3.01%)",
      "GDT 버터 : $5,090.00 (▼4.02%)",
      "팜유 : $1,172.00 (▲1.03%)",
      "라우릭 오일 : $1,930.00 (0.00%)"
    ],
    "other_commodities": [
      "코코아 : $5,924.00 (▲1.77%)",
      "로부스타 커피 : $3,739.00 (▼1.48%)",
      "GDT 지수 : $3,873.00 (▲1.52%)",
      "GDT 전지분유 : $3,591.00 (▲3.01%)",
      "GDT 버터 : $5,090.00 (▼4.02%)",
      "팜유 : $1,172.00 (▲1.03%)",
      "라우릭 오일 : $1,930.00 (0.00%)"
    ],
    "fx_usd": "1,398.06원 (▼16.67원)",
    "fx_eur": "1,620.90원 (▼17.26원)",
    "news_category": "GDT 탈지분유",
    "news_title": "GDT 가격 수요 증가로 4% 상승하며 회복세"
  },
  "daily_briefing": {
    "title": "[2026 Week 34 Report]",
    "week_number": 34,
    "weekly_price_title": "[W34 주요품목가격]",
    "date": "2026.08.19",
    "report_date": "2026.08.19, 16:46",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,310.52 (▼3.91%)",
    "weekly_price_list": [
      "코코아 : $5,924.00 (▲1.77%)",
      "로부스타 커피 : $3,739.00 (▼1.48%)",
      "GDT 지수 : $3,873.00 (▲1.52%)",
      "GDT 전지분유 : $3,591.00 (▲3.01%)",
      "GDT 버터 : $5,090.00 (▼4.02%)",
      "팜유 : $1,172.00 (▲1.03%)",
      "라우릭 오일 : $1,930.00 (0.00%)"
    ],
    "other_commodities": [
      "코코아 : $5,924.00 (▲1.77%)",
      "로부스타 커피 : $3,739.00 (▼1.48%)",
      "GDT 지수 : $3,873.00 (▲1.52%)",
      "GDT 전지분유 : $3,591.00 (▲3.01%)",
      "GDT 버터 : $5,090.00 (▼4.02%)",
      "팜유 : $1,172.00 (▲1.03%)",
      "라우릭 오일 : $1,930.00 (0.00%)"
    ],
    "fx_usd": "1,398.06원 (▼16.67원)",
    "fx_eur": "1,620.90원 (▼17.26원)",
    "news_category": "GDT 탈지분유",
    "news_title": "GDT 가격 수요 증가로 4% 상승하며 회복세"
  },
  "lastUpdated": "2026-08-19T16:46:47.178767+09:00",
  "usdKrwRate": 1398.65,
  "eurKrwRate": 1620.9,
  "marketStatus": "OPEN",
  "items": [
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
      "naverQuery": "코코아 가격",
      "price": 5924.0,
      "change": -120.0,
      "changePercent": -1.99,
      "high52w": 8062.0,
      "low52w": 2798.0,
      "high24h": 6100.0,
      "low24h": 5884.0,
      "high7d": 6044.0,
      "low7d": 5543.0,
      "high1m": 6044.0,
      "low1m": 5100.0,
      "volume": 0,
      "sparkline": [
        5821.0,
        5543.0,
        5619.0,
        5648.0,
        5734.0,
        6044.0,
        5924.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5888.46
          },
          {
            "time": "11:00",
            "price": 5900.3
          },
          {
            "time": "13:00",
            "price": 5912.15
          },
          {
            "time": "16:46",
            "price": 5924.0
          }
        ],
        "7D": [
          {
            "date": "08-10",
            "price": 5821.0
          },
          {
            "date": "08-11",
            "price": 5543.0
          },
          {
            "date": "08-12",
            "price": 5619.0
          },
          {
            "date": "08-13",
            "price": 5648.0
          },
          {
            "date": "08-14",
            "price": 5734.0
          },
          {
            "date": "08-17",
            "price": 6044.0
          },
          {
            "date": "08-18",
            "price": 5924.0
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 5520.0
          },
          {
            "date": "07-21",
            "price": 5607.0
          },
          {
            "date": "07-22",
            "price": 5328.0
          },
          {
            "date": "07-23",
            "price": 5301.0
          },
          {
            "date": "07-24",
            "price": 5376.0
          },
          {
            "date": "07-27",
            "price": 5100.0
          },
          {
            "date": "07-28",
            "price": 5201.0
          },
          {
            "date": "07-29",
            "price": 5185.0
          },
          {
            "date": "07-30",
            "price": 5112.0
          },
          {
            "date": "07-31",
            "price": 5397.0
          },
          {
            "date": "08-03",
            "price": 5939.0
          },
          {
            "date": "08-04",
            "price": 5924.0
          },
          {
            "date": "08-05",
            "price": 5882.0
          },
          {
            "date": "08-06",
            "price": 5776.0
          },
          {
            "date": "08-07",
            "price": 5782.0
          },
          {
            "date": "08-10",
            "price": 5821.0
          },
          {
            "date": "08-11",
            "price": 5543.0
          },
          {
            "date": "08-12",
            "price": 5619.0
          },
          {
            "date": "08-13",
            "price": 5648.0
          },
          {
            "date": "08-14",
            "price": 5734.0
          },
          {
            "date": "08-17",
            "price": 6044.0
          },
          {
            "date": "08-18",
            "price": 5924.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 6749.0
          },
          {
            "date": "2025-10",
            "price": 6151.0
          },
          {
            "date": "2025-11",
            "price": 5404.0
          },
          {
            "date": "2025-12",
            "price": 6065.0
          },
          {
            "date": "2026-01",
            "price": 4165.0
          },
          {
            "date": "2026-04",
            "price": 3494.0
          },
          {
            "date": "2026-05",
            "price": 3923.0
          },
          {
            "date": "2026-06",
            "price": 5002.0
          },
          {
            "date": "2026-07",
            "price": 5397.0
          },
          {
            "date": "2026-08",
            "price": 6044.0
          },
          {
            "date": "2026-08",
            "price": 5924.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Cocoa Prices Fall on Exceptional Growing Conditions in West Africa - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOTUJ3bUpCc2lLMENtUEM0TzdEcXZvLVZjZlpUY2phM016aGowakpfNDZBWHJXaC1mOWh4ZC02ckdLMkdfeWc0a3B1R0JNdmt6QXI3d3R3bjJlT19RMWhOS3MweFNmQkRyLUVOT3pqUDlPdEZKbEhVd0pCNkVGcmFRVTFGdjFPRnpqa0plZFBMeXlOVVdOczVZamQ0Wko1NEtUTVBGQ1ptT0xlMktKMXhj?oc=5",
          "date": "08-19 03:24"
        },
        {
          "title": "Coffee, cocoa and sugar are jumping. Is El Niño the next big commodity catalyst? - Mitrade",
          "source": "Mitrade",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxORHBwTXgwNmUtSUoxZDhBTmNFWDhDNUE2ZmxESWVodzFXQ2UxT2VKaDlsYThaV1FkTm9qcFNncXFpLVhGdExmNFRWNmRGY0hLWl9GUHRlNzNlWmpoV0pHTHlVQ3RwY2tvMzh4aGNFbEphVWthcGNBN2pyeVZuOHAyUWtlTnprUzFZ?oc=5",
          "date": "08-19 12:08"
        },
        {
          "title": "Slumping cocoa price leaves West Africa’s farmers struggling to comply with EU’s anti-deforestation law - EUobserver",
          "source": "EUobserver",
          "link": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNd3dOSHVqcGlwcFRDYTQ0MURxd29NYWF6X0dmZVgyUk5rT2kyeDFvMFpMZGRwcElfbUlFY2RLaUE0OC1pc2xDVERxMUZpSkpxTkZnSkxrd0tmbVNjajQtOWs3emtIS2R1OVBiX2pNd3pXbzc0Mkk4dmZka05mNmp2SVk5dGQ2OWVpN0tCV2VQTFF5MGFqNTNjX0tjbS0tVF9SRlpXdVE3d0hhOFp1eHpjdWdNMEU4eVdhMF93U0RMQUp5NWpWR3ZqTC1YM2w?oc=5",
          "date": "08-18 02:10"
        },
        {
          "title": "Could a Super El Niño Send Cocoa, Coffee and Sugar Prices Higher? - Modern Diplomacy",
          "source": "Modern Diplomacy",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPZmE2MzhNMzJhZEJRQkd1aVdjNmlqMXdzN0NUeGZaUnFXZVlUYmhJY0lod3JpRTJialNsNUxfYjVwcklsUmJoYzlwdC1xTUI1aGlTRHRHUl8xQmFLUlRjaHltdFlQX3lyWnEyejk1NXRwT0hRR3JUazZXc1hCMzBuVkJUMkUxV24xbHBGdm1LdjZBWEpqYXV3XzFKQjZKb0EwMmY5NQ?oc=5",
          "date": "08-18 18:00"
        }
      ],
      "newsKr": [
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 8월18일에 2.13% 하락했습니다. 공급과 수요에 어떤 변화가 있었나요? - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNRnh0T0tvaS1DZ2JLUC16ejU2RVY1bEpNRG9JV3ZaZEhaNEZkVGxTby0yTndOTDVMMmpDN0dyNmhpOFVqNkZwU0NIcmxLbUV4em1vSHc0T3ZnVE5FTk1EWUJnZzZ6VGtheWxySHZVSzlkcWRoTm5Kdk02NjB3blBnSXdfNHJ5V3J2RjVIaXVCblIzN2c?oc=5",
          "date": "08-18 21:31"
        },
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 8월17일에 2.21% 상승한 이유는 무엇인가요? - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNRXZwUzFEZUFlZGhhekxLU0QwSjlCaVh2MzJ1U0hvZ1FKb1k1LXFwMThOV0hqM2F3dFZKZlo4VWZQeHpwSktsR0I3dG4yRy1nR0p0c3lhb2RpbjYxVUtobmRkZmQ2WnczaTJKNHhrVG1FbkNtX2I2S2ZrMld1VjNsWDJiSldBWnJRd04yZWVMc1lJZjQ?oc=5",
          "date": "08-17 20:40"
        },
        {
          "title": "유럽중앙은행은 지속적인 인플레이션 압력에 대해 경고했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxPaHpOaF9OT1FzWng5WkRTMFVUTzFxY1BRU1p6R2hYS01xQlBKa0ZhSnFWT2h3ZXRlUnR4c0toUG5RMTRHdjdTWDR3azM3SmoteGxPS1o1SkxRZEp3bGNTRlgyekNTdW05Z0ZQRkdsSDhRZmdzTFI5dWVuQlcwekVGSUhnWl9oS0NURkV1UU9pUW4?oc=5",
          "date": "08-19 12:23"
        },
        {
          "title": "혼조된 확신 속에서도 강한 장중 매수세에 코코아 소폭 하락 - Traders Union",
          "source": "Traders Union",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQdEVZQXVBQUYxb1lHLVBuQXI0bG95bkRfVDBZVzVmTnhteGpXVmFfdWtXZDNzbFNqaEJTdzZaYnh2Q1ZoTmM3aXNFRHZPRXNSR05Xc1hTYVVZTXNRdWRHRTU2SUpjekRJNW82NTRBVV83Tm05c1JvUC1Oc2toWjVwS0lacFJsSkNHNW1uR01CeFJQVHJHOEx4Nw?oc=5",
          "date": "08-19 00:10"
        }
      ]
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
      "currency": "USD",
      "unit": "USD / MT",
      "unitKr": "톤당 달러",
      "description": "브라질 가뭄 및 한파 우려와 글로벌 수프라 서플라이 체인 수급 동향에 민감하게 반응하는 프리미엄 원두",
      "newsKeywords": "Arabica coffee price market news",
      "naverQuery": "아라비카 커피 가격",
      "price": 7310.52,
      "change": -297.62,
      "changePercent": -3.91,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 7346.9,
      "low24h": 6945.66,
      "high7d": 7608.14,
      "low7d": 7310.52,
      "high1m": 7608.14,
      "low1m": 6821.09,
      "volume": 0,
      "sparkline": [
        7325.95,
        7402.01,
        7497.91,
        7343.59,
        7453.82,
        7608.14,
        7310.52
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 7266.66
          },
          {
            "time": "11:00",
            "price": 7281.28
          },
          {
            "time": "13:00",
            "price": 7295.9
          },
          {
            "time": "16:46",
            "price": 7310.52
          }
        ],
        "7D": [
          {
            "date": "08-10",
            "price": 7325.95
          },
          {
            "date": "08-11",
            "price": 7402.01
          },
          {
            "date": "08-12",
            "price": 7497.91
          },
          {
            "date": "08-13",
            "price": 7343.59
          },
          {
            "date": "08-14",
            "price": 7453.82
          },
          {
            "date": "08-17",
            "price": 7608.14
          },
          {
            "date": "08-18",
            "price": 7310.52
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 7372.25
          },
          {
            "date": "07-21",
            "price": 7318.24
          },
          {
            "date": "07-22",
            "price": 6980.93
          },
          {
            "date": "07-23",
            "price": 6821.09
          },
          {
            "date": "07-24",
            "price": 6918.1
          },
          {
            "date": "07-27",
            "price": 7155.09
          },
          {
            "date": "07-28",
            "price": 7482.48
          },
          {
            "date": "07-29",
            "price": 7182.65
          },
          {
            "date": "07-30",
            "price": 7122.02
          },
          {
            "date": "07-31",
            "price": 7321.54
          },
          {
            "date": "08-03",
            "price": 7043.76
          },
          {
            "date": "08-04",
            "price": 7145.17
          },
          {
            "date": "08-05",
            "price": 7206.9
          },
          {
            "date": "08-06",
            "price": 7091.16
          },
          {
            "date": "08-07",
            "price": 7397.6
          },
          {
            "date": "08-10",
            "price": 7325.95
          },
          {
            "date": "08-11",
            "price": 7402.01
          },
          {
            "date": "08-12",
            "price": 7497.91
          },
          {
            "date": "08-13",
            "price": 7343.59
          },
          {
            "date": "08-14",
            "price": 7453.82
          },
          {
            "date": "08-17",
            "price": 7608.14
          },
          {
            "date": "08-18",
            "price": 7310.52
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 8264.02
          },
          {
            "date": "2025-10",
            "price": 8643.21
          },
          {
            "date": "2025-11",
            "price": 9105.08
          },
          {
            "date": "2025-12",
            "price": 7688.61
          },
          {
            "date": "2026-01",
            "price": 7324.85
          },
          {
            "date": "2026-04",
            "price": 6633.7
          },
          {
            "date": "2026-05",
            "price": 5855.47
          },
          {
            "date": "2026-06",
            "price": 6860.78
          },
          {
            "date": "2026-07",
            "price": 7321.54
          },
          {
            "date": "2026-08",
            "price": 7608.14
          },
          {
            "date": "2026-08",
            "price": 7310.52
          }
        ]
      },
      "newsEn": [
        {
          "title": "Arabica Coffee Prices Surge on NYSE: Colombian Earthquake and Brazil Harvest Delays - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNRUpwZUFyMTAwS1ZNbTNjcGhPSW1ydFlsYmQ1aF9HQ18xeWpGTjIxSU4xSDhFcnhLTTdpM1RIRmZQWUJ1dm9lT0ZEcUg0SjJkb2o3aFdjQ21iWjJqNTYxdU1PaUZOdXNteGRwek1UOGdzQlpFMDg3QzFOaGtIVGxZN1dhSFA0bklMYXNScEtHZkN0OFFtcllnYXgyREZzZExKMjUzZEpHU09zSDdwVTBVbEZodUs4djlBOG5aSQ?oc=5",
          "date": "08-18 13:10"
        },
        {
          "title": "Agricultural commodity prices today, August 19, 2026: Coffee prices surge, positive sentiment returns; US 'de-escalates' and postpones 50% tariff on Canadian goods. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxOZW5mRlpadnhHaEFiak11NHFOUjVNRklTbENMRjB3RjQ0U2lwUjMyWjM2VF9FbjJ4MGNmR3RVQTY0eTkwYmFYUHJELVVYQ3BnUGdUaFdsUDY1eUxuVWswN2xjMXBtWms4N1hmNFVFVWRwMWNNaUx3MlNHQXFDSUgxVlV6UUR0SFRtZ1FELTNGdktpUmpqQUtqeXNWbTlzTV8zMEpIcm9uZURCRzZPTmdkeTc2akh0TFdsZ3pPM2tFWk1yanNhNDVLaGIxTG9MM2ExSVAtaERleXBOdjB2RXhOVHJQaFZoQQ?oc=5",
          "date": "08-19 15:06"
        },
        {
          "title": "Coffee Weekly Forecast 16/08: Record Brazil Harvest (Chart) - DailyForex",
          "source": "DailyForex",
          "link": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQY212ZVRnNFo3VUg1WGFxczZYWjlGOWY3Vkp4bHBOWHlXTEFlbWRKalJ5b0Q1akd3RmFJVkQxc05BU09VcDVqMjVhRkdSV3lZMS15R2psMmtQeU9SemhrRGt0Q3Jvb01TUWozZ2w0N0ZGUnJkNmZONjRsMnk4bENFaHNqNkt3X0ViLU1ycFUwYklXVlRTeXBMZVpGTjZaX3ZVV3JITkR2SQ?oc=5",
          "date": "08-16 21:50"
        },
        {
          "title": "Agricultural commodity prices today, August 18, 2026: Coffee prices unlikely to break through, exports from Brazil about to accelerate; Oil prices return to the $90 mark, US and Iran tighten their positions. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMigAJBVV95cUxOakhCR1hCS0o5Tnplbi13dVUtSGIyM3hldm9CWVpsNmZDZW1NV2xNODc3djIzQ0RGeW1mZV9Lajc4RW8zT20wa1loVzdVZklmLWJCTThYZUlkNm53X3BMZDV4VkxwNHEyN0pDX2piNWxRODRxbDJsUTZrZjBJN2NMenpsZktqX0R5WlhBVFE5WlB4MV9vczlmelpDLWFvRGltb0VBbFA3OS00NkNFdUt4NjE3eEdNbHR4a2VXYjRKZE5nVzkxcjhHT1VWYjRYSTM5dGZKZFJ0MnBLa0EtR0kyZnlkajduQ1VpeUhRWk9XeFJyRGItWlMtenFYUW1RZmQx?oc=5",
          "date": "08-18 14:34"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 19일) 커피 가격은 세계 시장의 강한 상승세에 힘입어 kg당 1,800 VND 급등했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPQUpjUF94QXJEdmRjZnVHR0o0SGdGU2hXYjdqZGU2R2twSE9jR3dUSjczUjdURXdOS3VHcFJYQzlCblBBTWhJRnhTVHhKMnBpVU41UHh5WUxiZlREM0txT2laZ1FqSmdGdmNDdEtjTjVlOWNNazBkNVphNnBDWk1QbkNmWUIzeHFXUXNLNVNrSVBySWZYYkE?oc=5",
          "date": "08-19 08:23"
        },
        {
          "title": "2026년 8월 19일 오늘 농산물 가격: 커피 가격 급등, 긍정적인 투자 심리 회복; 미국, 캐나다산 제품에 대한 50% 관세 부과를 '완화'하고 연기. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxQQUJraDhxVmw2S1ZIclBEUzc1a1lNNXlfUFkyUWlYSTNKWndZWE9QUGZJTS16MHgtOHJqWFk1em9SQWVNZkpYV1NxWmdEaERLVjNjMVJSYVhITXdIcE9LS1BkazlIU2l6VjUwQk5UZXdjZ2dMZ29GbEFnMllIRjFLWjNvblBnMmxlVlh5OXZYZHBKQjlvdjFvVFIxSEhVTExwRzYtR1psSXczNXBtTEg3SUluTml2NzlBZzR2dmhVVDZDTTFWR3JqYXI2eGhxeTg0b2JTeFMwRzh0eFBIRHNZV3k4MnF2dw?oc=5",
          "date": "08-19 15:06"
        },
        {
          "title": "오늘 8월 19일 커피 가격: kg당 1,500동 급등 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPSmlHQmpTSm5IaG1fLXg2WEo4ME5PT21jR0R1eEZaa2JwVzNxLW92NlBpTDh1VDNzcE93VEdRVk1GUjJEOF9QYnFLanQtOFFsaFp6TUstUC1ySGxweUtuaVRFa2wxZHZiRHFqNTBxdE1lRGJNU2Zuazg4RHFUZEpXQ1h4Qy1zNVlrY2FraUxhUTdjQQ?oc=5",
          "date": "08-19 15:30"
        },
        {
          "title": "2026년 8월 19일 현재 커피 가격: 아라비카 가격이 5.3% 상승하여 국내 가격이 kg당 10만 VND에 근접하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNVDU4SElFTjhlMVFCbkJQdTF3eW1nMHlhZXhlNEhPUXZlTnpvYjhtM0I4Tm9KSlMxVENPQl85Q0I5cUpPRlFxRDdlbVBaYWVOckwyM2dLcVJEZEppaWh5aElHNXFGakhKd3FhMzlCTFJyRVEwWDRUNEN1d2ZoZE1fNGl5b2doT2FpOW8zYjN5OGs5TUJoMXNQNGFaR01fTnZscnpwdk1uQUZWbTQ?oc=5",
          "date": "08-19 14:28"
        }
      ],
      "original_price_lb": 331.6
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
      "naverQuery": "로부스타 커피 가격",
      "price": 3739.0,
      "change": 95.0,
      "changePercent": 2.61,
      "high52w": 3919.0,
      "low52w": 3555.0,
      "high24h": 3745.0,
      "low24h": 3625.0,
      "high7d": 3795.0,
      "low7d": 3594.0,
      "high1m": 3884.0,
      "low1m": 3594.0,
      "volume": 12850,
      "sparkline": [
        3795.0,
        3777.0,
        3752.0,
        3644.0,
        3594.0,
        3644.0,
        3739.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-10",
            "price": 3795.0
          },
          {
            "date": "08-11",
            "price": 3777.0
          },
          {
            "date": "08-12",
            "price": 3752.0
          },
          {
            "date": "08-13",
            "price": 3644.0
          },
          {
            "date": "08-14",
            "price": 3594.0
          },
          {
            "date": "08-17",
            "price": 3644.0
          },
          {
            "date": "08-18",
            "price": 3739.0
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 3884.0
          },
          {
            "date": "07-21",
            "price": 3818.0
          },
          {
            "date": "07-22",
            "price": 3796.0
          },
          {
            "date": "07-23",
            "price": 3708.0
          },
          {
            "date": "07-24",
            "price": 3757.0
          },
          {
            "date": "07-27",
            "price": 3799.0
          },
          {
            "date": "07-28",
            "price": 3859.0
          },
          {
            "date": "07-29",
            "price": 3749.0
          },
          {
            "date": "07-30",
            "price": 3761.0
          },
          {
            "date": "07-31",
            "price": 3775.0
          },
          {
            "date": "08-03",
            "price": 3784.0
          },
          {
            "date": "08-04",
            "price": 3853.0
          },
          {
            "date": "08-05",
            "price": 3884.0
          },
          {
            "date": "08-06",
            "price": 3787.0
          },
          {
            "date": "08-07",
            "price": 3767.0
          },
          {
            "date": "08-10",
            "price": 3795.0
          },
          {
            "date": "08-11",
            "price": 3777.0
          },
          {
            "date": "08-12",
            "price": 3752.0
          },
          {
            "date": "08-13",
            "price": 3644.0
          },
          {
            "date": "08-14",
            "price": 3594.0
          },
          {
            "date": "08-17",
            "price": 3644.0
          },
          {
            "date": "08-18",
            "price": 3739.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3716.57
          },
          {
            "time": "11:00",
            "price": 3724.04
          },
          {
            "time": "13:00",
            "price": 3731.52
          },
          {
            "time": "16:46",
            "price": 3739.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 4465.2
          },
          {
            "date": "2025-09",
            "price": 4539.62
          },
          {
            "date": "2025-10",
            "price": 4614.04
          },
          {
            "date": "2025-11",
            "price": 4651.25
          },
          {
            "date": "2025-12",
            "price": 4576.83
          },
          {
            "date": "2026-01",
            "price": 4502.41
          },
          {
            "date": "2026-02",
            "price": 4390.78
          },
          {
            "date": "2026-03",
            "price": 4279.15
          },
          {
            "date": "2026-04",
            "price": 4167.52
          },
          {
            "date": "2026-05",
            "price": 4055.89
          },
          {
            "date": "2026-06",
            "price": 3944.26
          },
          {
            "date": "2026-07",
            "price": 3832.63
          },
          {
            "date": "2026-08",
            "price": 3721.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Coffee Prices Surge on Supply Fears - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQSmVmZXNVM0wyUXVFaUVtTjJuQmQ4RHpKZTVyNEJURHZKdUF2MWdLZE5MblZKY0ZPcFZxOXRDV2JYRWIzSERXOVpaZWdQWHFQN2tyVXZoRVlUZFNlYjJpZDMzSmdsLVh4WndiVzY5WFBWR1F0WGxIX19MZ1hpU1JzVjlndXVmZXhzZHY5NWg2UmtOc2dNdWFHTWNB?oc=5",
          "date": "08-19 00:45"
        },
        {
          "title": "Arabica Coffee Prices Surge on NYSE: Colombian Earthquake and Brazil Harvest Delays - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNRUpwZUFyMTAwS1ZNbTNjcGhPSW1ydFlsYmQ1aF9HQ18xeWpGTjIxSU4xSDhFcnhLTTdpM1RIRmZQWUJ1dm9lT0ZEcUg0SjJkb2o3aFdjQ21iWjJqNTYxdU1PaUZOdXNteGRwek1UOGdzQlpFMDg3QzFOaGtIVGxZN1dhSFA0bklMYXNScEtHZkN0OFFtcllnYXgyREZzZExKMjUzZEpHU09zSDdwVTBVbEZodUs4djlBOG5aSQ?oc=5",
          "date": "08-18 13:10"
        },
        {
          "title": "Agric. & Environment: Coffee farmers optimistic despite unst - NewVision.co.ug",
          "source": "NewVision.co.ug",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOYVpVLTB1TnQwdXIwdzFCSks5Z2p1NExNR1VBVVo2WDJ0Yk9qYlY5bHNXdk15TDllR01KN1hWUllRckU3SlRHbDVJdlFOanlTMGpyQTVGSU1TUTdSdERTc1VNQWdMM0pLX19xSTEyUk9ra0dzQjctNzZlRHR5YzZhbFEwRUtkNk5Mb05IMm1wU0VqN3VQR0duQmxpZjJlaGpXaklNdWRVWDFWTWl3M1phXw?oc=5",
          "date": "08-18 23:00"
        },
        {
          "title": "Agricultural commodity prices today, August 19, 2026: Coffee prices surge, positive sentiment returns; US 'de-escalates' and postpones 50% tariff on Canadian goods. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxOZW5mRlpadnhHaEFiak11NHFOUjVNRklTbENMRjB3RjQ0U2lwUjMyWjM2VF9FbjJ4MGNmR3RVQTY0eTkwYmFYUHJELVVYQ3BnUGdUaFdsUDY1eUxuVWswN2xjMXBtWms4N1hmNFVFVWRwMWNNaUx3MlNHQXFDSUgxVlV6UUR0SFRtZ1FELTNGdktpUmpqQUtqeXNWbTlzTV8zMEpIcm9uZURCRzZPTmdkeTc2akh0TFdsZ3pPM2tFWk1yanNhNDVLaGIxTG9MM2ExSVAtaERleXBOdjB2RXhOVHJQaFZoQQ?oc=5",
          "date": "08-19 15:06"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 19일) 커피 가격은 세계 시장의 강한 상승세에 힘입어 kg당 1,800 VND 급등했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPQUpjUF94QXJEdmRjZnVHR0o0SGdGU2hXYjdqZGU2R2twSE9jR3dUSjczUjdURXdOS3VHcFJYQzlCblBBTWhJRnhTVHhKMnBpVU41UHh5WUxiZlREM0txT2laZ1FqSmdGdmNDdEtjTjVlOWNNazBkNVphNnBDWk1QbkNmWUIzeHFXUXNLNVNrSVBySWZYYkE?oc=5",
          "date": "08-19 08:23"
        },
        {
          "title": "오늘 8월 19일 커피 가격: kg당 1,500동 급등 - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPSmlHQmpTSm5IaG1fLXg2WEo4ME5PT21jR0R1eEZaa2JwVzNxLW92NlBpTDh1VDNzcE93VEdRVk1GUjJEOF9QYnFLanQtOFFsaFp6TUstUC1ySGxweUtuaVRFa2wxZHZiRHFqNTBxdE1lRGJNU2Zuazg4RHFUZEpXQ1h4Qy1zNVlrY2FraUxhUTdjQQ?oc=5",
          "date": "08-19 15:30"
        },
        {
          "title": "커피(COFFEE) 종목이 8월18일에 2.06% 하락한 이유를 확인해 보세요 - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPY243dDRGakE4OS1XaWVZUGVoTmdHWnh3c1A0OUhWTDN6a1I0US1uM0U4WVE2UzViWkF5ZVRPYTFYbWx0YW44TlloZnBIMmhBdTRDQWpTTW5zeTdlZ21pSmxhSU5NWlU0ZDFhd1d3RXFRQ0VsSVU4NjBPaXpSLVFOMmdkcFVCZUt1WkFvQVJiUU94UQ?oc=5",
          "date": "08-18 17:30"
        },
        {
          "title": "오늘의 농업 뉴스(8월 19일): 커피 가격 급등, 후추 가격은 안정세 유지. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNeUNGSlVyVkZoaEFHajZ3SlNBcGZRc1M1TVMwTi1BRGxTbmdwTWpKMFdndnRVYW9rd1BWcG5IZTJyLWFqNHJacm52QzA4QlNXQ29DalktVllkNko5Y0ZZOVFzN3ZQVlZEcjQ2ZzViMWZxeXJDU0Q5MG1nczhNV1ZRSGxKTG5vMndsNV9meV9aakN4QmNialRoc3gtaHY?oc=5",
          "date": "08-19 10:52"
        }
      ]
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
      "unit": "USD / MT",
      "unitKr": "톤당 달러 (평균)",
      "description": "글로벌 유제품 경매 종합 가중평균 거래가격 및 지수 (GDT Event Weighted Average Price & Index)",
      "newsKeywords": "Global Dairy Trade auction index news",
      "naverQuery": "GDT 지수 유제품",
      "price": 3873.0,
      "change": 95.0,
      "changePercent": 2.3,
      "high52w": 4350.81,
      "low52w": 3407.56,
      "high24h": 3873.0,
      "low24h": 3873.0,
      "high7d": 3873.0,
      "low7d": 3778.0,
      "high1m": 3880.0,
      "low1m": 3758.0,
      "volume": 41054,
      "sparkline": [
        4066.22,
        3880.0,
        3820.0,
        3758.0,
        3815.0,
        3778.0,
        3873.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3778.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3873.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-21",
            "price": 3815.0
          },
          {
            "date": "2026-08-04",
            "price": 3778.0
          },
          {
            "date": "2026-08-18",
            "price": 3873.0
          }
        ],
        "1M": [
          {
            "date": "2026-06-02",
            "price": 3880.0
          },
          {
            "date": "2026-06-16",
            "price": 3820.0
          },
          {
            "date": "2026-07-07",
            "price": 3758.0
          },
          {
            "date": "2026-07-21",
            "price": 3815.0
          },
          {
            "date": "2026-08-04",
            "price": 3778.0
          },
          {
            "date": "2026-08-18",
            "price": 3873.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 4324.94
          },
          {
            "date": "2025-08-19",
            "price": 4350.81
          },
          {
            "date": "2025-09-02",
            "price": 4106.1
          },
          {
            "date": "2025-09-16",
            "price": 4085.62
          },
          {
            "date": "2025-10-07",
            "price": 3984.29
          },
          {
            "date": "2025-10-21",
            "price": 3891.58
          },
          {
            "date": "2025-11-04",
            "price": 3776.23
          },
          {
            "date": "2025-11-18",
            "price": 3721.26
          },
          {
            "date": "2025-12-02",
            "price": 3626.39
          },
          {
            "date": "2025-12-16",
            "price": 3407.56
          },
          {
            "date": "2026-01-06",
            "price": 3672.75
          },
          {
            "date": "2026-01-20",
            "price": 3718.02
          },
          {
            "date": "2026-02-03",
            "price": 3895.89
          },
          {
            "date": "2026-02-17",
            "price": 3995.07
          },
          {
            "date": "2026-03-03",
            "price": 4164.31
          },
          {
            "date": "2026-03-17",
            "price": 3998.3
          },
          {
            "date": "2026-04-07",
            "price": 3974.59
          },
          {
            "date": "2026-04-21",
            "price": 3951.95
          },
          {
            "date": "2026-05-05",
            "price": 4032.8
          },
          {
            "date": "2026-05-19",
            "price": 4066.22
          },
          {
            "date": "2026-06-02",
            "price": 3880.0
          },
          {
            "date": "2026-06-16",
            "price": 3820.0
          },
          {
            "date": "2026-07-07",
            "price": 3758.0
          },
          {
            "date": "2026-07-21",
            "price": 3815.0
          },
          {
            "date": "2026-08-04",
            "price": 3778.0
          },
          {
            "date": "2026-08-18",
            "price": 3873.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "GlobalDairyTrade raised its price index by 2.3% - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQaDBHOUtGT3AxTFg4eWkyT2NCSjk3ME40Tm9JWHBIazd0ZmtxRHF0SUlNR1FzSTBKSmdjcTlRM2p2Q3NqUkd6VkZCU2h1UENKbnJraEIwNXM5Z0RJRVRJOWhHNl9FT1AtSVNiMy1pR1lXQnJyQ3lkRk00TlZDVDdTRk9zNlFRTXJ1NnJWRVNnc0haUQ?oc=5",
          "date": "08-19 02:30"
        },
        {
          "title": "Global Dairy Trade | GlobalDairyTrade: Price Index Rises 2.3% in Auction 410 - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE02dXZ1aFZkVmJkdWF0dWV2N2FOTW9CSjFBY1VZMHZYa1NaSTk1LUJScGkwc0swM0JGdHZycWU5RTdXTTNUOFNEaEJuQjRrNEp6VHRJcFJKSENnT2JZdjNIR2JTNFNIV1BKOWZlc1ZR?oc=5",
          "date": "08-19 01:39"
        },
        {
          "title": "New Zealand Shares Rise; NZX Appoints CEO - Yahoo Finance Australia",
          "source": "Yahoo Finance Australia",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxQUXdESWxtOVRkX1ZKU1gzZVotYzFOTU1rMTVVYmlZZWtvRFdRSEQ0SHREVlRkcEJZbUlUYUpQb0o2SnVZb2ZGdDlyMW5ENU1xN2ViMU9rRTI0NTA3QVp3UGlScE9vc0Y0TGpkWnVWVmxuN01CU1RoalhmNVFtUnFWU1I2Z0trM2tx?oc=5",
          "date": "08-19 14:28"
        },
        {
          "title": "GDT index up 2.3% after latest trading event - Agriland",
          "source": "Agriland",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPRy13REV3eThpcklkMFNmd3pESFV1b0JHak16NWJveEZoQjlfQl9NYVZHbV81UUZoQ1cwa1owZ3YxUVF4RDlGTURUYTZSZDQ3ZDl1MlhrVVZ2YmJhUTVjOHhyZVlkVU9vcUhVelpvcHgzT2VzeTdtUTRjc190V2lLMzB2OHhZVGZv?oc=5",
          "date": "08-19 02:15"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        },
        {
          "title": "버터값 최고치…베이커리업계 직격탄 - hankyung.com",
          "source": "hankyung.com",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBzTXJKcDFiaXJnSUpFX1AxMGc0eEFuTTkwckVDR3lZRTJYQjNKQnFUWW91TGxwUFNkcXlMaE5DMm9meGpzbzZXX21JOUU0U1RkVG5Cd1FLeGNxQQ?oc=5",
          "date": "08-18 16:00"
        }
      ]
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
      "description": "글로벌 유제품 가격 벤치마크(뉴질랜드 Fonterra 중심 경매 지수). 격주 화요일 경매 데이터 자동 실시간 연동",
      "newsKeywords": "Global Dairy Trade Whole Milk Powder news",
      "naverQuery": "GDT 전지분유 가격",
      "price": 3591.0,
      "change": 108.0,
      "changePercent": 3.1,
      "high52w": 4036.0,
      "low52w": 3161.0,
      "high24h": 3591.0,
      "low24h": 3591.0,
      "high7d": 3591.0,
      "low7d": 3483.0,
      "high1m": 3706.0,
      "low1m": 3425.0,
      "volume": 28500,
      "sparkline": [
        3772.0,
        3706.0,
        3589.0,
        3425.0,
        3486.0,
        3483.0,
        3591.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3483.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3591.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-21",
            "price": 3486.0
          },
          {
            "date": "2026-08-04",
            "price": 3483.0
          },
          {
            "date": "2026-08-18",
            "price": 3591.0
          }
        ],
        "1M": [
          {
            "date": "2026-06-02",
            "price": 3706.0
          },
          {
            "date": "2026-06-16",
            "price": 3589.0
          },
          {
            "date": "2026-07-07",
            "price": 3425.0
          },
          {
            "date": "2026-07-21",
            "price": 3486.0
          },
          {
            "date": "2026-08-04",
            "price": 3483.0
          },
          {
            "date": "2026-08-18",
            "price": 3591.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 4012.0
          },
          {
            "date": "2025-08-19",
            "price": 4036.0
          },
          {
            "date": "2025-09-02",
            "price": 3809.0
          },
          {
            "date": "2025-09-16",
            "price": 3790.0
          },
          {
            "date": "2025-10-07",
            "price": 3696.0
          },
          {
            "date": "2025-10-21",
            "price": 3610.0
          },
          {
            "date": "2025-11-04",
            "price": 3503.0
          },
          {
            "date": "2025-11-18",
            "price": 3452.0
          },
          {
            "date": "2025-12-02",
            "price": 3364.0
          },
          {
            "date": "2025-12-16",
            "price": 3161.0
          },
          {
            "date": "2026-01-06",
            "price": 3407.0
          },
          {
            "date": "2026-01-20",
            "price": 3449.0
          },
          {
            "date": "2026-02-03",
            "price": 3614.0
          },
          {
            "date": "2026-02-17",
            "price": 3706.0
          },
          {
            "date": "2026-03-03",
            "price": 3863.0
          },
          {
            "date": "2026-03-17",
            "price": 3709.0
          },
          {
            "date": "2026-04-07",
            "price": 3687.0
          },
          {
            "date": "2026-04-21",
            "price": 3666.0
          },
          {
            "date": "2026-05-05",
            "price": 3741.0
          },
          {
            "date": "2026-05-19",
            "price": 3772.0
          },
          {
            "date": "2026-06-02",
            "price": 3706.0
          },
          {
            "date": "2026-06-16",
            "price": 3589.0
          },
          {
            "date": "2026-07-07",
            "price": 3425.0
          },
          {
            "date": "2026-07-21",
            "price": 3486.0
          },
          {
            "date": "2026-08-04",
            "price": 3483.0
          },
          {
            "date": "2026-08-18",
            "price": 3591.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Dairy prices rally at latest auction as El Niño looms - NZ Herald",
          "source": "NZ Herald",
          "link": "https://news.google.com/rss/articles/CBMi6AFBVV95cUxOd1FtTTQwZzR2TWpaTGxhaDRuU19fWUFPUGFMTTlKSm1wdFJkeTZEX0duT0JGVXROTGFJOG15Z3hJazRZYVlnQThLOGFZN3pLclVhel9JR3p1N3dSek9jeWVPMGxEbUdzV1NhVkxOakt0S0JGMk1QWWhjLWJWUl80dVV3ejk2YkpySmZQMnhsUV9WU2lQUmNCY0hpVnFmRjg2R2YyWV84VUpNelZLdG0tUHJTT2Z2UHctVVZYcFlGZXduN2N5ZnBHa0dmX3ZscFJnVmpxZzZVWmFjOFZoTTI5YnRKVi1lSDMz?oc=5",
          "date": "08-19 09:02"
        },
        {
          "title": "Milk powders boost Global Dairy Trade market - farmersweekly.co.nz",
          "source": "farmersweekly.co.nz",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNM1c2aF9lYS03YWJJR3p6d28tZnBPcTZCeW1UU2xlQUdqMUYwVjhfcmpjc2FfYjNxcGZQWWVLcjdBUm1OSHVCS0VDNDBQVnF5N0NDQ19fNm5wZzl1NkwtNW5jeXlQSWdIdXRpWmM5LWc4aE9XaWg0NndhWWRLUHNyWlhKZDgxSzVGWFNYOXBXMVBMZHkzZGJIcUJVdHdMR2ts?oc=5",
          "date": "08-19 07:55"
        },
        {
          "title": "Top 10 Dairy Suppliers in France - grocerytradenews.com",
          "source": "grocerytradenews.com",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE9UZXN6RzZuWjE4MFNFWnduUHZVMGJKQXcxdHRIS2FCMGgyRHVDWW9HNkh6SVhSUmN5WXo1blpiVC1nS2kySHRHZVZndGk2b2dYeHBrZy1fdFF3b0xveldzc2NwVEJDWXJEUGc?oc=5",
          "date": "08-18 23:39"
        },
        {
          "title": "Global dairy prices lift 2.3% - BusinessDesk | NZ",
          "source": "BusinessDesk | NZ",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxOUEhtb2UySTZ1VndmT1BXUVVES193Ri1YRnN2TTdkMXRNOXg2OXNoQ3lWX0loLWdZcFF4X3hLYmhvZm16LXhIR00yd2U2TXZlSllyMTZ1aHVCdllQTW9Yc2JGbVRoVmVZaE14Vzl5WDlMS2poUUlmU1VpeXpWZ3hWdGlDWQ?oc=5",
          "date": "08-19 05:10"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 가격 수요 증가로 4% 상승하며 회복세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1SQUQyQUdiTzN0RExRWTgwSG1PYjBfSnc4c0szTWk3SkhzUlVZeVpKdE1qNmVhbndHR0hpSDEybGRCN0tJQlVXZzdWUXZlb2Zhejc2Vm5WaEJ0TzZMWnhKZ2cwUlJfSEU5WFZLbQ?oc=5",
          "date": "09-09 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        }
      ]
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
      "naverQuery": "GDT 탈지분유 가격",
      "price": 3502.0,
      "change": 241.0,
      "changePercent": 7.39,
      "high52w": 3552.0,
      "low52w": 2431.0,
      "high24h": 3502.0,
      "low24h": 3502.0,
      "high7d": 3502.0,
      "low7d": 3234.0,
      "high1m": 3502.0,
      "low1m": 3135.0,
      "volume": 18200,
      "sparkline": [
        3552.0,
        3457.0,
        3368.0,
        3135.0,
        3234.0,
        3261.0,
        3502.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3261.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 3502.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          },
          {
            "date": "2026-08-18",
            "price": 3502.0
          }
        ],
        "1M": [
          {
            "date": "2026-06-02",
            "price": 3457.0
          },
          {
            "date": "2026-06-16",
            "price": 3368.0
          },
          {
            "date": "2026-07-07",
            "price": 3135.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          },
          {
            "date": "2026-08-18",
            "price": 3502.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 2805.0
          },
          {
            "date": "2025-08-19",
            "price": 2756.0
          },
          {
            "date": "2025-09-02",
            "price": 2620.0
          },
          {
            "date": "2025-09-16",
            "price": 2615.0
          },
          {
            "date": "2025-10-07",
            "price": 2599.0
          },
          {
            "date": "2025-10-21",
            "price": 2559.0
          },
          {
            "date": "2025-11-04",
            "price": 2559.0
          },
          {
            "date": "2025-11-18",
            "price": 2542.0
          },
          {
            "date": "2025-12-02",
            "price": 2498.0
          },
          {
            "date": "2025-12-16",
            "price": 2431.0
          },
          {
            "date": "2026-01-06",
            "price": 2564.0
          },
          {
            "date": "2026-01-20",
            "price": 2615.0
          },
          {
            "date": "2026-02-03",
            "price": 2874.0
          },
          {
            "date": "2026-02-17",
            "price": 2973.0
          },
          {
            "date": "2026-03-03",
            "price": 3243.0
          },
          {
            "date": "2026-03-17",
            "price": 3409.0
          },
          {
            "date": "2026-04-07",
            "price": 3381.0
          },
          {
            "date": "2026-04-21",
            "price": 3448.0
          },
          {
            "date": "2026-05-05",
            "price": 3547.0
          },
          {
            "date": "2026-05-19",
            "price": 3552.0
          },
          {
            "date": "2026-06-02",
            "price": 3457.0
          },
          {
            "date": "2026-06-16",
            "price": 3368.0
          },
          {
            "date": "2026-07-07",
            "price": 3135.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          },
          {
            "date": "2026-08-18",
            "price": 3502.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Global Dairy Trade: powders on the rise as butter continues to fall 18 August 2026 Free - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNR0FfcHNPNTJpV0lxWlhyb0JKNjN0MWZlN1ByWHJwNVk3NEZLdmx6dEYtVFNCM0tISVEtX3paV1FjeEloU0RYcVBaVGRfdGs0UDhRVDVNMjU2RFFkN25tVUhJdnU5NUUwLXZTYmczTnJwUW5GRV9nVkUzQUgyd2E4NUNMQ0FBYV9HcXNnLVg4akthTDhYbGNibXlMU3V1N3VETHcwY0sxSW5CRWZBVzg3dUhwVnhpa0FnTDJuTTVR?oc=5",
          "date": "08-19 01:59"
        },
        {
          "title": "Dairy prices rally at latest auction as El Niño looms - NZ Herald",
          "source": "NZ Herald",
          "link": "https://news.google.com/rss/articles/CBMi6AFBVV95cUxOd1FtTTQwZzR2TWpaTGxhaDRuU19fWUFPUGFMTTlKSm1wdFJkeTZEX0duT0JGVXROTGFJOG15Z3hJazRZYVlnQThLOGFZN3pLclVhel9JR3p1N3dSek9jeWVPMGxEbUdzV1NhVkxOakt0S0JGMk1QWWhjLWJWUl80dVV3ejk2YkpySmZQMnhsUV9WU2lQUmNCY0hpVnFmRjg2R2YyWV84VUpNelZLdG0tUHJTT2Z2UHctVVZYcFlGZXduN2N5ZnBHa0dmX3ZscFJnVmpxZzZVWmFjOFZoTTI5YnRKVi1lSDMz?oc=5",
          "date": "08-19 09:02"
        },
        {
          "title": "Milk powders boost Global Dairy Trade market - farmersweekly.co.nz",
          "source": "farmersweekly.co.nz",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNM1c2aF9lYS03YWJJR3p6d28tZnBPcTZCeW1UU2xlQUdqMUYwVjhfcmpjc2FfYjNxcGZQWWVLcjdBUm1OSHVCS0VDNDBQVnF5N0NDQ19fNm5wZzl1NkwtNW5jeXlQSWdIdXRpWmM5LWc4aE9XaWg0NndhWWRLUHNyWlhKZDgxSzVGWFNYOXBXMVBMZHkzZGJIcUJVdHdMR2ts?oc=5",
          "date": "08-19 07:55"
        },
        {
          "title": "GDT index up 2.3% after latest trading event - Agriland",
          "source": "Agriland",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPRy13REV3eThpcklkMFNmd3pESFV1b0JHak16NWJveEZoQjlfQl9NYVZHbV81UUZoQ1cwa1owZ3YxUVF4RDlGTURUYTZSZDQ3ZDl1MlhrVVZ2YmJhUTVjOHhyZVlkVU9vcUhVelpvcHgzT2VzeTdtUTRjc190V2lLMzB2OHhZVGZv?oc=5",
          "date": "08-19 02:15"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 가격 수요 증가로 4% 상승하며 회복세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1SQUQyQUdiTzN0RExRWTgwSG1PYjBfSnc4c0szTWk3SkhzUlVZeVpKdE1qNmVhbndHR0hpSDEybGRCN0tJQlVXZzdWUXZlb2Zhejc2Vm5WaEJ0TzZMWnhKZ2cwUlJfSEU5WFZLbQ?oc=5",
          "date": "09-09 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        }
      ]
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
      "naverQuery": "GDT 버터 가격",
      "price": 5090.0,
      "change": -135.0,
      "changePercent": -2.58,
      "high52w": 7214.0,
      "low52w": 5012.0,
      "high24h": 5090.0,
      "low24h": 5090.0,
      "high7d": 5303.0,
      "low7d": 5090.0,
      "high1m": 5734.0,
      "low1m": 5090.0,
      "volume": 14300,
      "sparkline": [
        5674.0,
        5734.0,
        5516.0,
        5336.0,
        5303.0,
        5225.0,
        5090.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-08-04 (Event 409)",
            "price": 5225.0
          },
          {
            "time": "2026-08-18 (Event 410)",
            "price": 5090.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          },
          {
            "date": "2026-08-18",
            "price": 5090.0
          }
        ],
        "1M": [
          {
            "date": "2026-06-02",
            "price": 5734.0
          },
          {
            "date": "2026-06-16",
            "price": 5516.0
          },
          {
            "date": "2026-07-07",
            "price": 5336.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          },
          {
            "date": "2026-08-18",
            "price": 5090.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 7214.0
          },
          {
            "date": "2025-08-19",
            "price": 7144.0
          },
          {
            "date": "2025-09-02",
            "price": 6969.0
          },
          {
            "date": "2025-09-16",
            "price": 6892.0
          },
          {
            "date": "2025-10-07",
            "price": 6712.0
          },
          {
            "date": "2025-10-21",
            "price": 6662.0
          },
          {
            "date": "2025-11-04",
            "price": 6371.0
          },
          {
            "date": "2025-11-18",
            "price": 5886.0
          },
          {
            "date": "2025-12-02",
            "price": 5169.0
          },
          {
            "date": "2025-12-16",
            "price": 5012.0
          },
          {
            "date": "2026-01-06",
            "price": 5206.0
          },
          {
            "date": "2026-01-20",
            "price": 5314.0
          },
          {
            "date": "2026-02-03",
            "price": 5773.0
          },
          {
            "date": "2026-02-17",
            "price": 6347.0
          },
          {
            "date": "2026-03-03",
            "price": 6728.0
          },
          {
            "date": "2026-03-17",
            "price": 6868.0
          },
          {
            "date": "2026-04-07",
            "price": 6181.0
          },
          {
            "date": "2026-04-21",
            "price": 5702.0
          },
          {
            "date": "2026-05-05",
            "price": 5525.0
          },
          {
            "date": "2026-05-19",
            "price": 5674.0
          },
          {
            "date": "2026-06-02",
            "price": 5734.0
          },
          {
            "date": "2026-06-16",
            "price": 5516.0
          },
          {
            "date": "2026-07-07",
            "price": 5336.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          },
          {
            "date": "2026-08-18",
            "price": 5090.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Dairy prices rally at latest auction as El Niño looms - NZ Herald",
          "source": "NZ Herald",
          "link": "https://news.google.com/rss/articles/CBMi6AFBVV95cUxOd1FtTTQwZzR2TWpaTGxhaDRuU19fWUFPUGFMTTlKSm1wdFJkeTZEX0duT0JGVXROTGFJOG15Z3hJazRZYVlnQThLOGFZN3pLclVhel9JR3p1N3dSek9jeWVPMGxEbUdzV1NhVkxOakt0S0JGMk1QWWhjLWJWUl80dVV3ejk2YkpySmZQMnhsUV9WU2lQUmNCY0hpVnFmRjg2R2YyWV84VUpNelZLdG0tUHJTT2Z2UHctVVZYcFlGZXduN2N5ZnBHa0dmX3ZscFJnVmpxZzZVWmFjOFZoTTI5YnRKVi1lSDMz?oc=5",
          "date": "08-19 09:02"
        },
        {
          "title": "Global Dairy Trade | GlobalDairyTrade: Price Index Rises 2.3% in Auction 410 - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE02dXZ1aFZkVmJkdWF0dWV2N2FOTW9CSjFBY1VZMHZYa1NaSTk1LUJScGkwc0swM0JGdHZycWU5RTdXTTNUOFNEaEJuQjRrNEp6VHRJcFJKSENnT2JZdjNIR2JTNFNIV1BKOWZlc1ZR?oc=5",
          "date": "08-19 01:39"
        },
        {
          "title": "GlobalDairyTrade raised its price index by 2.3% - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQMW5HbWZ0QzlHSHVXRWRnVEdkRjhac3laU3laMUR3MEZ4d1R6bHpNSGlOVDNlQjRmc1BaMHk2dnktU1FKejVjUUFaemk1WDRxcHZJQXJ1bGdGZFI2aS1mQU9rTFZXbzZSQzRJeGhxUlVzMGRTMEd5TE5TU0lFR1NMUmNPemc3dDM4VHBJOUViam5Iem0xMXJiSndUaw?oc=5",
          "date": "08-19 02:51"
        },
        {
          "title": "Top 10 Dairy Suppliers in France - grocerytradenews.com",
          "source": "grocerytradenews.com",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE9UZXN6RzZuWjE4MFNFWnduUHZVMGJKQXcxdHRIS2FCMGgyRHVDWW9HNkh6SVhSUmN5WXo1blpiVC1nS2kySHRHZVZndGk2b2dYeHBrZy1fdFF3b0xveldzc2NwVEJDWXJEUGc?oc=5",
          "date": "08-18 23:39"
        }
      ],
      "newsKr": [
        {
          "title": "버터값 최고치…베이커리업계 직격탄 - hankyung.com",
          "source": "hankyung.com",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBzTXJKcDFiaXJnSUpFX1AxMGc0eEFuTTkwckVDR3lZRTJYQjNKQnFUWW91TGxwUFNkcXlMaE5DMm9meGpzbzZXX21JOUU0U1RkVG5Cd1FLeGNxQQ?oc=5",
          "date": "08-18 16:00"
        },
        {
          "title": "GDT 가격 수요 증가로 4% 상승하며 회복세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1SQUQyQUdiTzN0RExRWTgwSG1PYjBfSnc4c0szTWk3SkhzUlVZeVpKdE1qNmVhbndHR0hpSDEybGRCN0tJQlVXZzdWUXZlb2Zhejc2Vm5WaEJ0TzZMWnhKZ2cwUlJfSEU5WFZLbQ?oc=5",
          "date": "09-09 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        },
        {
          "title": "GDT 유제품 가격 5회 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBkVkM2Y3BTbV9pMTJuOFViaTJQVmwxc0dDOFN1S2VxdEZPUHJhUmtrN3EwaFJCMVRFSjZYZjVWbFJ5VjRINmNCYVFvR3gtSlo5THZNUFBvQXdrb3lCVkxlV3RkdWREbWxzQTNxeQ?oc=5",
          "date": "05-19 16:00"
        }
      ]
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
      "naverQuery": "팜유 가격 시세",
      "price": 1172.0,
      "change": 7.5,
      "changePercent": 0.64,
      "high52w": 1193.5,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1172.0,
      "low7d": 1157.0,
      "high1m": 1172.0,
      "low1m": 1122.5,
      "volume": 10,
      "sparkline": [
        1160.0,
        1163.75,
        1157.0,
        1161.75,
        1162.0,
        1164.5,
        1172.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-10",
            "price": 1160.0
          },
          {
            "date": "08-11",
            "price": 1163.75
          },
          {
            "date": "08-12",
            "price": 1157.0
          },
          {
            "date": "08-13",
            "price": 1161.75
          },
          {
            "date": "08-14",
            "price": 1162.0
          },
          {
            "date": "08-17",
            "price": 1164.5
          },
          {
            "date": "08-18",
            "price": 1172.0
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 1125.25
          },
          {
            "date": "07-21",
            "price": 1122.5
          },
          {
            "date": "07-22",
            "price": 1122.75
          },
          {
            "date": "07-23",
            "price": 1130.0
          },
          {
            "date": "07-24",
            "price": 1130.25
          },
          {
            "date": "07-27",
            "price": 1128.25
          },
          {
            "date": "07-28",
            "price": 1127.0
          },
          {
            "date": "07-29",
            "price": 1127.5
          },
          {
            "date": "07-30",
            "price": 1128.0
          },
          {
            "date": "07-31",
            "price": 1127.5
          },
          {
            "date": "08-03",
            "price": 1136.5
          },
          {
            "date": "08-04",
            "price": 1150.0
          },
          {
            "date": "08-05",
            "price": 1153.5
          },
          {
            "date": "08-06",
            "price": 1151.25
          },
          {
            "date": "08-07",
            "price": 1150.0
          },
          {
            "date": "08-10",
            "price": 1160.0
          },
          {
            "date": "08-11",
            "price": 1163.75
          },
          {
            "date": "08-12",
            "price": 1157.0
          },
          {
            "date": "08-13",
            "price": 1161.75
          },
          {
            "date": "08-14",
            "price": 1162.0
          },
          {
            "date": "08-17",
            "price": 1164.5
          },
          {
            "date": "08-18",
            "price": 1172.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1164.97
          },
          {
            "time": "11:00",
            "price": 1167.31
          },
          {
            "time": "13:00",
            "price": 1169.66
          },
          {
            "time": "16:46",
            "price": 1172.0
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1051.25
          },
          {
            "date": "2025-10",
            "price": 1052.25
          },
          {
            "date": "2025-11",
            "price": 990.5
          },
          {
            "date": "2025-12",
            "price": 990.25
          },
          {
            "date": "2026-01",
            "price": 1021.0
          },
          {
            "date": "2026-02",
            "price": 1046.75
          },
          {
            "date": "2026-03",
            "price": 1138.0
          },
          {
            "date": "2026-04",
            "price": 1157.0
          },
          {
            "date": "2026-05",
            "price": 1144.5
          },
          {
            "date": "2026-06",
            "price": 1123.0
          },
          {
            "date": "2026-07",
            "price": 1127.5
          },
          {
            "date": "2026-08",
            "price": 1164.5
          }
        ]
      },
      "newsEn": [
        {
          "title": "Malaysian crude palm oil prices to stay above $1,133 per ton in September, MPOC says - marketscreener.com",
          "source": "marketscreener.com",
          "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxQUFNrdWxXRmZuWmxfLWZWYVJBalZxNHRuWHdFbTg0SllzZDZzRHp6WUZQenN6bFhna2hRc0kyaGsyWUdVTUJDam5KdXJRZExYOUpjMi1XWjZKcF9OMDdEYUtUMUZ6ZWkyM2thdUJIdjVQcHlVRXJuMUhfcHhBb0RXRGdZWEo4bTFMZ2hYTktMcTRiZTVaNnJ2SzFRaUU3Z2FfN0g3a1Q3cG1GYWhSanhhLV9VZi1yQ1pxV2VUSUxTLTRNUUFDZlFwWGJlSEN4NVo1?oc=5",
          "date": "08-19 10:20"
        },
        {
          "title": "CPO prices to stay firm above RM4,600 in September on tightening supply and geopolitical disruptions — MPOC - The Edge Malaysia",
          "source": "The Edge Malaysia",
          "link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTFAzRlprblR6Q2RpamdZQU56TWFCQm5rWHdQMGhaM253cFZNZ0o3NXZkMXdieXViU3NEbHFHMDhNVnRnVGdCeGFuR1RiNkY5N1Jvd2x3?oc=5",
          "date": "08-19 11:04"
        },
        {
          "title": "ICE canola weakens - The Western Producer",
          "source": "The Western Producer",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE1lMHY5YUhTeTNWV2xsREhBSDRhY29TYWZWbXBrWmRkWEo2ZVgzM0xvN1ZCbXhoRUJGTTk3dVluUl9UbkpNdFhJbHQtRks3ZWtyRXBOU1RGNkpiRW1RZnJYc01QVEZmeWlNeVE?oc=5",
          "date": "08-18 23:14"
        },
        {
          "title": "Malaysian Palm Oil Futures Rise 2% to MYR 4,820 on Demand Hopes - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPM2JNSHV5WGRrdFF3bzlBcnctMXlYeDFqbWVLWnR0cE9GNzAwblVZZ3ZnWVpncDQ3ZzZPS25OUHdyWldpRHdUS1c3RFRKNXhHbUQzRU10S2w2Z0pCNzJEWUM1ei1YTkNDaWUyS3V0a1VzUlhiS2thczh6ckxJRDVwZUN4aXV6YWY1?oc=5",
          "date": "08-17 19:11"
        }
      ],
      "newsKr": [
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE8zSnQ4UkszR1psQ0tpLVpfTmIzODYwaWx6UGlkbURQRWZBSDYxbnZwNjhZc2t0OHM0aVEwV1JGY29ZdGJoOHJvOUhTSEd2LWM0b3VHZzRTUExxOWpWSzlHLdIBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 14:13"
        },
        {
          "title": "해바라기유도 ‘껑충’…유지류 가격 초비상 [푸드360] - 헤럴드경제",
          "source": "헤럴드경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE14VjRvazRSVFdoc1RyclRjZWtudlozWm1ESDd4ay14amtHTkllclducHRFYXR5RlVEdVRCbDRZWjJvbExwUlJtbndlVFA0WGZzZk9Ic2V3?oc=5",
          "date": "08-10 11:52"
        },
        {
          "title": "세계식량가격지수 3개월 연속 오름세…4월 130.7포인트 - 식품음료신문",
          "source": "식품음료신문",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE1fbEljWDY1OFROSXRmNDlPS1RTb1JHWFliLUVNekpWM0J4aHk0TlM2RkprcV9aUUh4QjVkeFVUaVZucWxmZlBsSWZaSlg1SS12VlFzWkpsWnZGc1AtLVVkb0xMZjNxQ2JnYlNFS2NJZw?oc=5",
          "date": "05-11 16:00"
        },
        {
          "title": "국제 유지류ㆍ육류ㆍ곡물 가격 상승, 설탕ㆍ유제품은 내려 - 식품저널 foodnews",
          "source": "식품저널 foodnews",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE1zcXZBb2ozWEJiWmotWS1lWHVCQWE1VTZSaFpqdHVfVVpjUVpsNF9WNmdEcVgyenV0TG9uTU5vbFdpZFlSbFhLXzl4UVNPeFhCVVFWQVZ5anRsbDJYaHVkZUxFeThZampPdXJjTWxR?oc=5",
          "date": "05-11 16:00"
        }
      ]
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
      "naverQuery": "라우릭 오일 야자유 가격",
      "price": 1930.0,
      "change": 6.0,
      "changePercent": 0.31,
      "high52w": 2360.34,
      "low52w": 1450.0,
      "high24h": 1930.0,
      "low24h": 1930.0,
      "high7d": 1941.58,
      "low7d": 1930.0,
      "high1m": 1957.98,
      "low1m": 1930.0,
      "volume": 4050,
      "sparkline": [
        2259.13,
        2360.34,
        2300.0,
        2172.0,
        1979.0,
        1924.0,
        1930.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-13",
            "price": 1930.0
          },
          {
            "date": "08-14",
            "price": 1931.93
          },
          {
            "date": "08-15",
            "price": 1933.86
          },
          {
            "date": "08-16",
            "price": 1935.79
          },
          {
            "date": "08-17",
            "price": 1937.72
          },
          {
            "date": "08-18",
            "price": 1939.65
          },
          {
            "date": "08-19",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "07-21",
            "price": 1930.0
          },
          {
            "date": "07-22",
            "price": 1930.96
          },
          {
            "date": "07-23",
            "price": 1931.93
          },
          {
            "date": "07-24",
            "price": 1932.9
          },
          {
            "date": "07-25",
            "price": 1933.86
          },
          {
            "date": "07-26",
            "price": 1934.82
          },
          {
            "date": "07-27",
            "price": 1935.79
          },
          {
            "date": "07-28",
            "price": 1936.76
          },
          {
            "date": "07-29",
            "price": 1937.72
          },
          {
            "date": "07-30",
            "price": 1938.68
          },
          {
            "date": "07-31",
            "price": 1939.65
          },
          {
            "date": "08-01",
            "price": 1940.62
          },
          {
            "date": "08-02",
            "price": 1941.58
          },
          {
            "date": "08-03",
            "price": 1942.54
          },
          {
            "date": "08-04",
            "price": 1943.51
          },
          {
            "date": "08-05",
            "price": 1944.48
          },
          {
            "date": "08-06",
            "price": 1945.44
          },
          {
            "date": "08-07",
            "price": 1946.4
          },
          {
            "date": "08-08",
            "price": 1947.37
          },
          {
            "date": "08-09",
            "price": 1948.34
          },
          {
            "date": "08-10",
            "price": 1949.3
          },
          {
            "date": "08-11",
            "price": 1950.26
          },
          {
            "date": "08-12",
            "price": 1951.23
          },
          {
            "date": "08-13",
            "price": 1952.2
          },
          {
            "date": "08-14",
            "price": 1953.16
          },
          {
            "date": "08-15",
            "price": 1954.12
          },
          {
            "date": "08-16",
            "price": 1955.09
          },
          {
            "date": "08-17",
            "price": 1956.06
          },
          {
            "date": "08-18",
            "price": 1957.02
          },
          {
            "date": "08-19",
            "price": 1957.98
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1450.0
          },
          {
            "date": "2025-09",
            "price": 1490.0
          },
          {
            "date": "2025-10",
            "price": 1530.0
          },
          {
            "date": "2025-11",
            "price": 1580.0
          },
          {
            "date": "2025-12",
            "price": 1650.0
          },
          {
            "date": "2026-01",
            "price": 2197.02
          },
          {
            "date": "2026-02",
            "price": 2259.13
          },
          {
            "date": "2026-03",
            "price": 2360.34
          },
          {
            "date": "2026-04",
            "price": 2300.0
          },
          {
            "date": "2026-05",
            "price": 2172.0
          },
          {
            "date": "2026-06",
            "price": 1979.0
          },
          {
            "date": "2026-07",
            "price": 1924.0
          },
          {
            "date": "2026-08",
            "price": 1930.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1918.42
          },
          {
            "time": "11:00",
            "price": 1922.28
          },
          {
            "time": "13:00",
            "price": 1926.14
          },
          {
            "time": "16:46",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Switzerland Virgin Coconut Oil - Market Analysis, Forecast, Size, Trends and Insights - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOTDN1WmxSMEowT3FsRmlkUGVTcngwbkNHVFJVUWQ1VnNidVRtYXpzdWdURjZtLVZFYks3cmdiTWM4S2VqNDFnVEJRRDJVNDgzWFBmMUYzWDdKT2dCNUJzdnZhTUlnbXkwQjdYMG9KOU9uWWtvWGlsNUl0RnFMcjN3RkZuX0xNZE5RX3ROLXEwYnNqcDd4eUxqZUtPRFFsbHc3UHhkT3RzY1VvckJJWUk0Vw?oc=5",
          "date": "08-19 14:04"
        },
        {
          "title": "Clean Beauty Drives Growth in Vegetable Oils - Happi | Household And Personal Products Industry",
          "source": "Happi | Household And Personal Products Industry",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNdW1NcW9Bb1BEYXZsbERkaFpSeWt5V1JVVmF2dERFbDdIdUowZ1dlb0c3VU45Z3FXWVBDQS1aV3pVbmVreVYwMkJSZVFjWDZvdTBHY2NNT1Z1dHg0MlRwYUJ6WVF2czROQmM5S01icnlaTGtaeWwtbFFKUU14VXI2Y3pQTTg1Nk1obzlRam5XR0FWQWl2bW9vbEx3QUYtOGlBTTRXYVBYZlBsQ0lveHZUQw?oc=5",
          "date": "08-19 16:00"
        },
        {
          "title": "Vegetable Oils in Beauty and Personal Care Market Size, Share, Growth Drivers, Latest Trends, Leading Companies, and Forecast – 2031 - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMi_gFBVV95cUxQX3ZGS2RtcVhVa0tQMHFUcVhTdEktODRvdVJ6UWNrdlhQenkwY2F3SmdSNDMwVmRFN2hRUkVybXliQXI4U3FXVEh5OHB0Yml2ZzVGMnVobEJnMEM5NWY1anM3XzA0WVBKTXllR2RrSDVHVTR6UkhLR3A3ZWQyQm4ySDRTMWw5QWhTM2xvdlMzZWdPNWg3U2NGSU1oQnpqMkdWd2ItdlBxTFo1eFdobTBMUXdHbG1Jdkp4RWpmMndESWduM0h1MS1xbTFLdXFUbXM1djB2cUUyQU9BQjdKMVpFUnRrU1pVT1BtRTFWTFE1REhBQkptWjB0d3Y2MXJLdw?oc=5",
          "date": "08-18 03:40"
        },
        {
          "title": "India’s Sodium Coco Sulphate Prices Strengthen in July on Tight Inventories and Firm Demand - chemanalyst.com",
          "source": "chemanalyst.com",
          "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPRVc3NHZkeGppZ3RTUVRXRGU2Y1BORWdSaEVrdV9qQXd4Q1pia0VjbzVISFJPQXlNdWxySHBtN0QxRjR5YjBvWi10VkxKYWgtV1BBd3liS2taSVF0VDlqcDk1V1EtazhMUERyZVdWSi1NVjNoOFdNc0hadFdOaUxuaWplZEE0Z1NVZ3djRGNfTWZtQ1FMNDlhM1czU25tWXBQMmdmWXJ1SGlPcUl1WWZIRVpJUlBpbzNmMW9STHdR?oc=5",
          "date": "08-17 20:14"
        }
      ],
      "newsKr": [
        {
          "title": "DS단석, 글로벌 행사서 바이오디젤 공정 고도화 방향 제시 - 전기신문",
          "source": "전기신문",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9valNza2JQLW5XeHRlRWhaNUJ5bWh5QXpIaHlCbjNFbTRsdkkzc0plUkUzbjhRa2V6cklNbnB1aTZGdUpNUThNaTk4cllETEhzTjFPa3VGNlhHVTcyWXdmaXJJYzBnaV9FbmNwZtIBcEFVX3lxTE9zbVJLQURvVmN4Y1RqVXhUbTdXVlpKOHpBN1Q5S3hKQXhQRUFlZ1FWMU1GbXQ3ZndjY2hVNW5iSXA0cEFMeldMZlJWamVMZVY4NklvQmI0YmF0SzZHbkFlRGNReFNuY1ZSVk5mV0NDV3M?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 바이오원료 글로벌 판로 확대·협력방안 논의 - e-platform.net",
          "source": "e-platform.net",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTFBZN0J6ck9ITFA4dUh2SVl3cWd4QzZEUUlNMzlFYS1qWVFoQUhNblVFUG5ybVM2UGRfeVVlX2ctdkZ5aXVrQWFCVEwzZ3FZdm1nYy1jUlVfMHdFMEdJZC1WTVRBRGZWX0ExUHMxU9IBcEFVX3lxTE0tekNYcm1sZ1IzejBsc2MtRllZQ1BpbDBVWmg2M0Q3ME9VTFA2YUFtdnNVY2hTaG1oUGxyUTQ4a0JBTnRQZ2h3V3lmaXlqaDNkWHZYVXRIWFBXa1lzMXppYnBCbDZTWGZ5amc1Q0VCS3U?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 말레이시아 'POC 2026' 참가…해외 판로 확대 박차 - 전자신문",
          "source": "전자신문",
          "link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9TcVlCLW90bkJGSkxHZUstODJvUlQ5emIxNzVWRzl3c2Y2WWUzS3VXeFM5VktQcDhWSTdGZF92Nk42aDhXREs3YlVRZFp0Zw?oc=5",
          "date": "02-19 17:00"
        },
        {
          "title": "DS단석, 글로벌 바이오원료 조달 다변화 · 해외 판로 확대 주력 - todayenergy.kr",
          "source": "todayenergy.kr",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE8tSExIOXJ6ZjhGUmJKVVF6RW52U0pnUE5NVi1kMndNQ3hPdEtBS2xDaWRBS0FNemdFQUgweEREOE5jUTZ0dkhHNWpidGdnOXVWelNYTTFMU2gxa1ViVzhxZlI2cVN1U002UE1wSTdn?oc=5",
          "date": "02-19 17:00"
        }
      ]
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
      "naverQuery": "원달러 환율 전망",
      "price": 1398.06,
      "change": -16.67,
      "changePercent": -1.18,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1413.12,
      "low24h": 1395.78,
      "high7d": 1417.31,
      "low7d": 1398.06,
      "high1m": 1487.39,
      "low1m": 1398.06,
      "volume": 0,
      "sparkline": [
        1417.31,
        1412.18,
        1416.46,
        1416.85,
        1415.37,
        1414.73,
        1398.06
      ],
      "history": {
        "7D": [
          {
            "date": "08-11",
            "price": 1417.31
          },
          {
            "date": "08-12",
            "price": 1412.18
          },
          {
            "date": "08-13",
            "price": 1416.46
          },
          {
            "date": "08-14",
            "price": 1416.85
          },
          {
            "date": "08-17",
            "price": 1415.37
          },
          {
            "date": "08-18",
            "price": 1414.73
          },
          {
            "date": "08-19",
            "price": 1398.06
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 1487.39
          },
          {
            "date": "07-21",
            "price": 1475.01
          },
          {
            "date": "07-22",
            "price": 1479.72
          },
          {
            "date": "07-23",
            "price": 1475.63
          },
          {
            "date": "07-24",
            "price": 1474.04
          },
          {
            "date": "07-27",
            "price": 1458.01
          },
          {
            "date": "07-28",
            "price": 1464.44
          },
          {
            "date": "07-29",
            "price": 1453.16
          },
          {
            "date": "07-30",
            "price": 1442.28
          },
          {
            "date": "07-31",
            "price": 1420.6
          },
          {
            "date": "08-03",
            "price": 1435.7
          },
          {
            "date": "08-04",
            "price": 1428.5
          },
          {
            "date": "08-05",
            "price": 1428.43
          },
          {
            "date": "08-06",
            "price": 1421.16
          },
          {
            "date": "08-07",
            "price": 1422.3
          },
          {
            "date": "08-10",
            "price": 1407.0
          },
          {
            "date": "08-11",
            "price": 1417.31
          },
          {
            "date": "08-12",
            "price": 1412.18
          },
          {
            "date": "08-13",
            "price": 1416.46
          },
          {
            "date": "08-14",
            "price": 1416.85
          },
          {
            "date": "08-17",
            "price": 1415.37
          },
          {
            "date": "08-18",
            "price": 1414.73
          },
          {
            "date": "08-19",
            "price": 1398.06
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1389.67
          },
          {
            "time": "11:00",
            "price": 1392.47
          },
          {
            "time": "13:00",
            "price": 1395.26
          },
          {
            "time": "16:46",
            "price": 1398.06
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1399.33
          },
          {
            "date": "2025-10",
            "price": 1424.02
          },
          {
            "date": "2025-11",
            "price": 1466.13
          },
          {
            "date": "2025-12",
            "price": 1437.91
          },
          {
            "date": "2026-01",
            "price": 1449.7
          },
          {
            "date": "2026-02",
            "price": 1432.32
          },
          {
            "date": "2026-03",
            "price": 1516.13
          },
          {
            "date": "2026-04",
            "price": 1487.38
          },
          {
            "date": "2026-05",
            "price": 1505.96
          },
          {
            "date": "2026-06",
            "price": 1541.73
          },
          {
            "date": "2026-07",
            "price": 1420.6
          },
          {
            "date": "2026-08",
            "price": 1414.73
          },
          {
            "date": "2026-08",
            "price": 1398.06
          }
        ]
      },
      "newsEn": [
        {
          "title": "South Korean Won Hits Over 10-Month High - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPOWNJUFZaeWtiRmM1eXNSWEVGR3BXR3ZsRUdrWGp0cWJMMU80Yi1LQ3pFbUNTTDhaQ2NwOGNiWjRjSURIVF9ySzg1RERTdU5wRHdwYW5YNjZOU2RHVHBWc1BOQnJLLXQ0ZHhiVjZoMUpXVWtqV0hkTUtGMjJ1VXZmY0R1ZGEtcUwtQmNFTjdHQjhtUEtSd0E?oc=5",
          "date": "08-19 12:28"
        },
        {
          "title": "Asia FX rises as Treasury yields ease; S. Korean won hits 1-yr high - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNOFY4dFd1VHc1SnY5WHAzQmlvdG92NnVhV0JrNEFFWDhrUnZsQU4xQ3ZkZ0d5c2lFelU4dXAxZEs5QXlwY1RxVVNIYWJpQkoyWUFMdFNxVzlzd0ZqTExfUFZpakpkRnIwWTk1ZDlhSjNKUFVGM2lZY2pxN2lUWlBqYURtbkdQYmtOcExCb05rQXpITEIyVEJ2NHVhUzFCeEd3VmRrYXlyZ1hBZkgxVld0dXowcmw?oc=5",
          "date": "08-19 13:51"
        },
        {
          "title": "KRW/USD Exchange Rate Falls to the 1,300-Won Range Intraday for the First Time in 10 and a Half Months - 아시아경제",
          "source": "아시아경제",
          "link": "https://news.google.com/rss/articles/CBMiZEFVX3lxTE1KajdJWEJob0JkQmVsZ3ZLWjM2WEpyUFpWVmZickJBYk9GNXhQNUxEOC1PT0pvN0lNOVZsU0I3NEwxZnRKNXlNU0ZrR1FNZFZmWnVsMTc0UjE3TUROS0J1ZXhBVTc?oc=5",
          "date": "08-19 13:41"
        },
        {
          "title": "Korean Won Breaks Below 1,400 to Dollar for First Time in 10 Months - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNTFozMFZXcUdxV3FuX0NOb19lMHJjbTZjWDItTnJMRzFrWm8xOXhjS1lJVTBDRHl0Zi1DWEVuTkhuV2tCc04tdlpBVjlBa3VvMkVVUkhzM2JXQ05xLWxoQkZCdHJnbGRXaTdZbGRlSnB1M3hLVzRRSEFyV0ZkWHo4QzFBdWVqeGp0b185UkdfX1BBYnJpb1VnY0VNV1h4dDhBd293?oc=5",
          "date": "08-19 13:35"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 쏟아지는 악재들, 수급으로 버티는 원화 - kbthink.com",
          "source": "kbthink.com",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1NaGdtT1BrU1VrWkd6TWlydFpiNllIaWF5cFg3MW5faG5YWTZkSjI5amdOeHpjVThfYWlMZUJCWUh1NjNXZ0VfbUZzZFZWRzh3YnZ2R0g2enJiR1E5OW8yLQ?oc=5",
          "date": "08-19 07:58"
        },
        {
          "title": "원·달러 환율 10개월 반 만에 1300원대 … 美 금리인상 전망 후퇴·수출 네고 영향 - 뉴데일리",
          "source": "뉴데일리",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE1oRWhfZWJTdnpkLWo5T0hzZDNNbnNib0djOHJZUkp0enZjc1o5bi1aVG5BZjNiSk5QUDNGNTRTX2xxOHQ4UXBRbm8xOUlyeHhHcEtEODFLUmtXbmM3WnIxU25fYjNva1V3NFpuVERQamRXbTlOR3lpRzAyVdIBgAFBVV95cUxOUnNjenhwSmtHa2VnSEs3SHBBbmJfcUd6R2JySXNZV00xb0dLWmdnNWdGSFhITHdUVGtMemt1ektNNkN3MlVFTXJJcmdVNnVXRUx6aVJQYUxNTk9pZmcyRmprNVVYVlByMExSU0k1RVhJeE5HTTdnU3JZZU03MElmOQ?oc=5",
          "date": "08-19 13:15"
        },
        {
          "title": "반도체주 위험 회피가 환율 흔든다⋯\"1410원 중후반서 등락\" [환율전망] - etoday.co.kr",
          "source": "etoday.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5TNVp0Ym93SGVmZVdEOFdCUC1Fc0hyVk94UDJhV251ZlhUWFIzUHNkcUZ2VkdmbVhYY1Y0RG1WMmNOQTNiRGQ4ek16eWVZNHZrNHhTRg?oc=5",
          "date": "08-19 08:10"
        },
        {
          "title": "[8월 3주차] 환율(FX) 전망 - kbthink.com",
          "source": "kbthink.com",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE1mRWJSTEx2QUpLSG5wVmU4aTliMTdfZndoUDZKdl9RV1d4QzlQV1V1RF94REtmbFh5MXBsX2lZU3RPMEd2UkpoMUdrQThBb1VZRmtpM01DRk9TMzFuT1NhSzlfWXNOR09FNmNVcg?oc=5",
          "date": "08-19 16:37"
        }
      ]
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
      "naverQuery": "원유로 환율 전망",
      "price": 1620.9,
      "change": -17.26,
      "changePercent": -1.05,
      "high52w": 1807.42,
      "low52w": 1582.09,
      "high24h": 1634.5,
      "low24h": 1617.5,
      "high7d": 1638.16,
      "low7d": 1582.09,
      "high1m": 1700.58,
      "low1m": 1582.09,
      "volume": 0,
      "sparkline": [
        1635.36,
        1628.62,
        1632.86,
        1634.19,
        1582.09,
        1638.16,
        1620.9
      ],
      "history": {
        "7D": [
          {
            "date": "08-11",
            "price": 1635.36
          },
          {
            "date": "08-12",
            "price": 1628.62
          },
          {
            "date": "08-13",
            "price": 1632.86
          },
          {
            "date": "08-14",
            "price": 1634.19
          },
          {
            "date": "08-17",
            "price": 1582.09
          },
          {
            "date": "08-18",
            "price": 1638.16
          },
          {
            "date": "08-19",
            "price": 1620.9
          }
        ],
        "1M": [
          {
            "date": "07-20",
            "price": 1700.58
          },
          {
            "date": "07-21",
            "price": 1683.36
          },
          {
            "date": "07-22",
            "price": 1687.03
          },
          {
            "date": "07-23",
            "price": 1683.6
          },
          {
            "date": "07-24",
            "price": 1676.49
          },
          {
            "date": "07-27",
            "price": 1657.74
          },
          {
            "date": "07-28",
            "price": 1665.16
          },
          {
            "date": "07-29",
            "price": 1654.43
          },
          {
            "date": "07-30",
            "price": 1652.79
          },
          {
            "date": "07-31",
            "price": 1636.68
          },
          {
            "date": "08-03",
            "price": 1663.51
          },
          {
            "date": "08-04",
            "price": 1643.36
          },
          {
            "date": "08-05",
            "price": 1647.17
          },
          {
            "date": "08-06",
            "price": 1642.01
          },
          {
            "date": "08-07",
            "price": 1638.82
          },
          {
            "date": "08-10",
            "price": 1618.62
          },
          {
            "date": "08-11",
            "price": 1635.36
          },
          {
            "date": "08-12",
            "price": 1628.62
          },
          {
            "date": "08-13",
            "price": 1632.86
          },
          {
            "date": "08-14",
            "price": 1634.19
          },
          {
            "date": "08-17",
            "price": 1582.09
          },
          {
            "date": "08-18",
            "price": 1638.16
          },
          {
            "date": "08-19",
            "price": 1620.9
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1611.17
          },
          {
            "time": "11:00",
            "price": 1614.42
          },
          {
            "time": "13:00",
            "price": 1617.66
          },
          {
            "time": "16:46",
            "price": 1620.9
          }
        ],
        "1Y": [
          {
            "date": "2025-09",
            "price": 1640.49
          },
          {
            "date": "2025-10",
            "price": 1647.04
          },
          {
            "date": "2025-11",
            "price": 1700.53
          },
          {
            "date": "2025-12",
            "price": 1688.99
          },
          {
            "date": "2026-01",
            "price": 1718.01
          },
          {
            "date": "2026-02",
            "price": 1689.54
          },
          {
            "date": "2026-03",
            "price": 1736.26
          },
          {
            "date": "2026-04",
            "price": 1736.6
          },
          {
            "date": "2026-05",
            "price": 1755.9
          },
          {
            "date": "2026-06",
            "price": 1760.27
          },
          {
            "date": "2026-07",
            "price": 1636.68
          },
          {
            "date": "2026-08",
            "price": 1638.16
          },
          {
            "date": "2026-08",
            "price": 1620.9
          }
        ]
      },
      "newsEn": [
        {
          "title": "CBA currency exchange rates (19.08.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTFB0ZTVSMWE0R2VlZmtwOVlkdUxmeGJxU3Z3bEdtR3FQeVdFMm5vV3hkZU1hSklrY0ZsemhDaTVkZVM5clBLcnp2SS02T25HbDJQVHhhRTlaZGFibjBNSDBRaTFxNnpRUW9ETXYtRk1MT1FmUjdxSHlvQ3NBQdIBe0FVX3lxTFB0ZTVSMWE0R2VlZmtwOVlkdUxmeGJxU3Z3bEdtR3FQeVdFMm5vV3hkZU1hSklrY0ZsemhDaTVkZVM5clBLcnp2SS02T25HbDJQVHhhRTlaZGFibjBNSDBRaTFxNnpRUW9ETXYtRk1MT1FmUjdxSHlvQ3NBQQ?oc=5",
          "date": "08-19 15:00"
        },
        {
          "title": "Azerbaijani currency to world currency rates for August 19 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFAtUkFRZ3A5RVRWbDExQk9zQy1WeWdxM1IyY0VWazdPUVNsSkVzSHJaVW1LRXlDWG9hdUdJT1QxMTBzNHdxdk1zRTZ6SUdyWmw4Y21XZg?oc=5",
          "date": "08-19 14:34"
        },
        {
          "title": "Nepal Rastra Bank Sets Foreign Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxNa050Q1p0ckpGRmFqSjRYX0N5dm9RdUZ2RnphVVQ5ZjJTcFNXX2JhdlFrYVVfUFppRlc5d2J0YXdoQXdFU3lRRzAzYW84SHE1Tks2UVZTOEtvUElfTC1BZ2IwX3JEMjNSZ2w4MmppVXhVMTRJSFVMTVpPUjJrNFhtQ0ZlMXV6OUlTc2Jqaw?oc=5",
          "date": "08-19 09:30"
        },
        {
          "title": "Nepal Rastra Bank Sets Foreign Exchange Rates - Ratopati",
          "source": "Ratopati",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNeGplZ2N1ZW9Fd2pkSmRRVGhLS2lCdmdlUWh0YW1jbEVLREE2dEw2VUgyUUlGekZycnlkR1dfNmJrRk1uYXhJRzhoM0tWQ1BmNkRUendTUnJLZVBXdlA2b1N2UzJ3OFhQdTN6NFJCLTNSTmdXcmdmOGZFTUVvSFhZTUVONWNJeEh5cG9iZlVFdVV1WXh5SS1zRQ?oc=5",
          "date": "08-18 08:39"
        }
      ],
      "newsKr": [
        {
          "title": "KDI \"올해 성장률 전망치 3.2%, 0.7%p↑…체감경기 확산은 미진\"(종합) - 연합뉴스",
          "source": "연합뉴스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE9NblFiajVSYWhjRjRWZDJVSTVDWC1ZZUJ5WjFGcnRMMEhqZ05BMy14X1JtUnQtRkNzMVF4TklDelg5enA1a2tucXhsQ21pdWpTV24zdmtQWFpEYUtMZFlCT9IBYEFVX3lxTE9NblFiajVSYWhjRjRWZDJVSTVDWC1ZZUJ5WjFGcnRMMEhqZ05BMy14X1JtUnQtRkNzMVF4TklDelg5enA1a2tucXhsQ21pdWpTV24zdmtQWFpEYUtMZFlCTw?oc=5",
          "date": "08-19 14:32"
        },
        {
          "title": "원·달러 환율 10개월 반 만에 1300원대 … 美 금리인상 전망 후퇴·수출 네고 영향 - 뉴데일리",
          "source": "뉴데일리",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE1oRWhfZWJTdnpkLWo5T0hzZDNNbnNib0djOHJZUkp0enZjc1o5bi1aVG5BZjNiSk5QUDNGNTRTX2xxOHQ4UXBRbm8xOUlyeHhHcEtEODFLUmtXbmM3WnIxU25fYjNva1V3NFpuVERQamRXbTlOR3lpRzAyVdIBgAFBVV95cUxOUnNjenhwSmtHa2VnSEs3SHBBbmJfcUd6R2JySXNZV00xb0dLWmdnNWdGSFhITHdUVGtMemt1ektNNkN3MlVFTXJJcmdVNnVXRUx6aVJQYUxNTk9pZmcyRmprNVVYVlByMExSU0k1RVhJeE5HTTdnU3JZZU03MElmOQ?oc=5",
          "date": "08-19 13:15"
        },
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "08-18 10:05"
        },
        {
          "title": "KDI, 올해 성장률 전망치 3.2%로↑…경상흑자 3천억달러 전망 - 금융소비자뉴스",
          "source": "금융소비자뉴스",
          "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE0xTWhtTUVkQnZ6SkMzZ3lQalNEUUItb3NSdFJEYTZTaHEzeFJ2aVZMbXc3YWxpVHRubnZ0VjVXS3g5MlAxalRHaWQ5enJiek5ubkp5UThQVnFucHp4ek40MmpzTXdGdjdYanc?oc=5",
          "date": "08-19 15:33"
        }
      ]
    }
  ]
};

const ITEM_ICONS = {
  'cocoa': '🍫',
  'arabica': '☕',
  'robusta': '🫘',
  'gdt-milk': '🥛',
  'gdt-smp': '🍼',
  'gdt-butter': '🧈',
  'gdt-index': '🐄',
  'palm': '🌴',
  'lauric-oil': '🫙',
  'usd-krw': '💵',
  'eur-krw': '💶'
};

let autoRefreshTimer = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setupEventListeners();
  renderApp();
  startSilentAutoRefresh();
});

async function loadData() {
  try {
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`./data/commodities.json${cacheBuster}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (response.ok) {
      appState.data = await response.json();
    } else {
      throw new Error('Network response not ok');
    }
  } catch (err) {
    console.warn('Using fallback commodity dataset:', err);
    if (!appState.data) {
      appState.data = JSON.parse(JSON.stringify(FALLBACK_DATA));
    }
  }
  
  // ALWAYS fetch real-time live forex rates regardless of file:// protocol or network state
  await fetchLiveForex();
}

async function fetchLiveForex() {
  if (!appState.data) return;
  
  let fetched = false;

  // Primary live exchange rate API
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.KRW) {
        const krw = data.rates.KRW;
        const eur = data.rates.EUR ? (krw / data.rates.EUR) : 1630.4;
        applyForexRates(krw, eur);
        fetched = true;
      }
    }
  } catch (e) {
    console.warn('Primary forex API failed:', e);
  }

  // Backup live exchange rate API
  if (!fetched) {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && data.rates.KRW) {
          const krw = data.rates.KRW;
          const eur = data.rates.EUR ? (krw / data.rates.EUR) : 1630.4;
          applyForexRates(krw, eur);
          fetched = true;
        }
      }
    } catch (e) {
      console.warn('Fallback forex API failed:', e);
    }
  }
}

function applyForexRates(usdKrw, eurKrw) {
  if (!appState.data) return;
  
  appState.data.usdKrwRate = parseFloat(usdKrw.toFixed(2));
  appState.data.eurKrwRate = parseFloat(eurKrw.toFixed(2));
  appState.data.lastForexUpdated = new Date().toISOString();
  
  // Sync live rate to items array (USD/KRW and EUR/KRW items in the table)
  if (appState.data.items) {
    const usdItem = appState.data.items.find(i => i.id === 'usd-krw');
    if (usdItem) {
      const prevPrice = usdItem.price;
      usdItem.price = appState.data.usdKrwRate;
      if (prevPrice && prevPrice !== usdItem.price) {
        usdItem.change = parseFloat((usdItem.price - prevPrice).toFixed(2));
        usdItem.changePercent = parseFloat(((usdItem.change / prevPrice) * 100).toFixed(2));
      }
    }
    const eurItem = appState.data.items.find(i => i.id === 'eur-krw');
    if (eurItem) {
      const prevPrice = eurItem.price;
      eurItem.price = appState.data.eurKrwRate;
      if (prevPrice && prevPrice !== eurItem.price) {
        eurItem.change = parseFloat((eurItem.price - prevPrice).toFixed(2));
        eurItem.changePercent = parseFloat(((eurItem.change / prevPrice) * 100).toFixed(2));
      }
    }
  }
}

function startSilentAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  // Silently reload data and live forex every 60 seconds in the background
  autoRefreshTimer = setInterval(async () => {
    await loadData();
    renderApp();
  }, 60000);
}

function setupEventListeners() {
  // Time Range Switcher
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.selectedRange = e.target.dataset.range;
      renderMainChart();
    });
  });

  // Category Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.activeCategory = e.target.dataset.category;
      renderTable();
    });
  });

  // Card Filter Tabs (주요 품목, 상승, 하락)
  document.querySelectorAll('.card-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.card-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.cardFilter = e.target.dataset.cardFilter;
      renderHighlightCards();
    });
  });

  // News Modal Close
  const newsModal = document.getElementById('newsModal');
  const closeNewsModalBtn = document.getElementById('closeNewsModal');
  if (closeNewsModalBtn) {
    closeNewsModalBtn.addEventListener('click', () => {
      newsModal.classList.remove('open');
    });
  }
  if (newsModal) {
    newsModal.addEventListener('click', (e) => {
      if (e.target === newsModal) newsModal.classList.remove('open');
    });
  }

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value.toLowerCase().trim();
      renderTable();
    });
  }

  // Guide Modal
  const guideModal = document.getElementById('guideModal');
  const closeGuideModal = document.getElementById('closeGuideModal');

  if (closeGuideModal && guideModal) {
    closeGuideModal.addEventListener('click', () => {
      guideModal.classList.remove('open');
    });
  }
  if (guideModal) {
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) guideModal.classList.remove('open');
    });
  }

  // Ticker Controls
  const btnPrev = document.getElementById('btnTickerPrev');
  const btnNext = document.getElementById('btnTickerNext');
  const tickerBanner = document.getElementById('newsTickerBanner');

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => rotateTicker(-1));
    btnNext.addEventListener('click', () => rotateTicker(1));
  }

  if (tickerBanner) {
    tickerBanner.addEventListener('mouseenter', () => {
      if (appState.tickerTimer) clearInterval(appState.tickerTimer);
    });
    tickerBanner.addEventListener('mouseleave', () => {
      startTickerInterval();
    });
  }

  // Detail Modal Close
  const detailModal = document.getElementById('detailModal');
  document.getElementById('closeDetailModal').addEventListener('click', () => {
    detailModal.classList.remove('open');
  });
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.classList.remove('open');
  });

  // Pulse Cow Interaction (일일 시황 리포트 Market Daily & 클립보드 복사)
  const cowBtn = document.getElementById('cowIconBtn');
  const cowBubble = document.getElementById('cowSpeechBubble');
  const cowWrap = document.getElementById('cowTriggerWrap');

  if (cowBtn && cowBubble) {
    cowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = cowBubble.classList.contains('show');
      
      // Trigger subtle wiggle animation on SVG icon
      cowBtn.classList.remove('wiggle');
      void cowBtn.offsetWidth; // trigger reflow
      cowBtn.classList.add('wiggle');

      if (isShowing) {
        cowBubble.classList.remove('show');
      } else {
        renderPulseCowPopup();
        cowBubble.classList.add('show');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (cowWrap && !cowWrap.contains(e.target)) {
        cowBubble.classList.remove('show');
      }
    });

    // Prevent clicks inside popup from bubbling to document
    cowBubble.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

function getWeeklyReportData() {
  if (appState.data && (appState.data.weekly_report || appState.data.daily_briefing)) {
    return appState.data.weekly_report || appState.data.daily_briefing;
  }

  // Fallback calculation from items if weekly_report object isn't present (exclude forex)
  const items = (appState.data && appState.data.items) ? appState.data.items : [];
  const commodityItems = items.filter(i => i.category !== 'forex' && !['usd-krw', 'eur-krw'].includes(i.id));
  const sorted = [...commodityItems].sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0));
  const gainer = sorted[0];
  const loser = sorted[sorted.length - 1];
  
  // Fixed priority order for remaining commodities: 1) Cocoa/Coffee -> 2) Dairy -> 3) Oils
  const FIXED_ORDER = {
    'cocoa': 1,
    'arabica': 2,
    'robusta': 3,
    'gdt-index': 10,
    'gdt-milk': 11,
    'gdt-smp': 12,
    'gdt-butter': 13,
    'palm': 20,
    'lauric-oil': 21
  };
  const otherItemsRaw = commodityItems.filter(it => it.id !== (gainer && gainer.id) && it.id !== (loser && loser.id));
  const others = otherItemsRaw.sort((a, b) => (FIXED_ORDER[a.id] || 99) - (FIXED_ORDER[b.id] || 99));

  const formatDaily = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    const pctVal = it.changePercent || 0;
    const sign = pctVal > 0 ? '▲' : (pctVal < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(pctVal).toFixed(2)}%)`;
  };

  const formatWeekly = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    
    const history7d = it.history && it.history['7D'] ? it.history['7D'] : [];
    const sparkline = it.sparkline || [];
    let startP = null;
    if (history7d.length >= 2) startP = history7d[0].price;
    else if (sparkline.length >= 2) startP = sparkline[0];
    
    let wPct = it.changePercent || 0;
    if (startP && startP > 0) {
      wPct = ((it.price - startP) / startP) * 100;
    }
    const sign = wPct > 0 ? '▲' : (wPct < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(wPct).toFixed(2)}%)`;
  };

  const now = new Date();
  const year = now.getFullYear();
  
  // Calculate ISO week number
  const target = new Date(now.valueOf());
  const dayNr = (now.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);

  const dateStr = `${year}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const reportDateStr = `${dateStr}, ${hours}:${minutes}`;

  const usdItem = items.find(i => i.id === 'usd-krw');
  const eurItem = items.find(i => i.id === 'eur-krw');
  const usdPrice = usdItem ? usdItem.price : (appState.data ? appState.data.usdKrwRate : 1400.48);
  const usdChg = usdItem ? usdItem.change : 0;
  const eurPrice = eurItem ? eurItem.price : (appState.data ? appState.data.eurKrwRate : 1621.4);
  const eurChg = eurItem ? eurItem.change : 0;

  const usdSign = usdChg > 0 ? '▲' : (usdChg < 0 ? '▼' : '');
  const eurSign = eurChg > 0 ? '▲' : (eurChg < 0 ? '▼' : '');

  return {
    title: `[${year} Week ${weekNumber} Report]`,
    week_number: weekNumber,
    weekly_price_title: `[W${weekNumber} 주요품목가격]`,
    date: dateStr,
    report_date: reportDateStr,
    top_gainer: formatDaily(gainer),
    top_loser: formatDaily(loser),
    weekly_price_list: others.map(it => formatWeekly(it)),
    fx_usd: `${usdPrice.toLocaleString('ko-KR')}원 (${usdSign}${Math.abs(usdChg).toLocaleString('ko-KR')}원)`,
    fx_eur: `${eurPrice.toLocaleString('ko-KR')}원 (${eurSign}${Math.abs(eurChg).toLocaleString('ko-KR')}원)`,
    news_category: gainer ? gainer.nameKr.split('(')[0].trim() : '원자재',
    news_title: '글로벌 원자재 공급망 및 주요 품목 시세 동향'
  };
}

function renderPulseCowPopup() {
  const bubble = document.getElementById('cowSpeechBubble');
  if (!bubble) return;

  const b = getWeeklyReportData();
  const now = new Date();
  const weekNum = b.week_number || 34;
  const currentYear = now.getFullYear();
  const reportTitle = b.title || `[${currentYear} Week ${weekNum} Report]`;
  const weeklyPriceTitle = b.weekly_price_title || `[W${weekNum} 주요품목가격]`;
  
  const priceLines = b.weekly_price_list || b.other_commodities || [];
  const listArray = Array.isArray(priceLines) ? priceLines : String(priceLines).split('\n').filter(Boolean);
  const weeklyPriceHtml = listArray.map(line => `<div class="pulse-cow-other-line">${line}</div>`).join('');

  const dateStr = b.date || `${currentYear}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const reportDateStr = b.report_date || `${dateStr}, ${hours}:${minutes}`;

  bubble.innerHTML = `
    <div class="pulse-cow-header">
      <div class="pulse-cow-title">${reportTitle}</div>
      <button class="pulse-cow-close" id="closePulseCowBtn" title="닫기" type="button">&times;</button>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">[일일 원자재 동향]</div>
      <div class="pulse-cow-item gainer">
        <span>당일 급등 : ${b.top_gainer}</span>
      </div>
      <div class="pulse-cow-item loser">
        <span>당일 급락 : ${b.top_loser}</span>
      </div>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">${weeklyPriceTitle}</div>
      <div class="pulse-cow-other-list">
        ${weeklyPriceHtml}
      </div>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">[일일 환율]</div>
      <div class="pulse-cow-item">
        <span>USD/KRW : ${b.fx_usd}</span>
      </div>
      <div class="pulse-cow-item">
        <span>EUR/KRW : ${b.fx_eur}</span>
      </div>
    </div>

    <div class="pulse-cow-section" style="margin-bottom:0;">
      <div class="pulse-cow-section-title">[주요 "${b.news_category}" 뉴스]</div>
      <div class="pulse-cow-news">${b.news_title}</div>
    </div>

    <div style="font-size: 10px; color: #888; margin-top: 10px; text-align: left; padding-left: 2px;">
      Report Date: ${reportDateStr}
    </div>

    <div class="pulse-cow-footer">
      <button class="copy-report-btn" id="copyReportBtn" type="button">Copy</button>
    </div>
  `;

  // Close button inside popup
  const closeBtn = document.getElementById('closePulseCowBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bubble.classList.remove('show');
    });
  }

  // Copy button
  const copyBtn = document.getElementById('copyReportBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const plainText = `${reportTitle}

[일일 원자재 동향]
당일 급등 : ${b.top_gainer}
당일 급락 : ${b.top_loser}

${weeklyPriceTitle}
${listArray.join('\n')}

[일일 환율]
USD/KRW : ${b.fx_usd}
EUR/KRW : ${b.fx_eur}

[주요 "${b.news_category}" 뉴스]
${b.news_title}

Report Date: ${reportDateStr}`;

      copyReportToClipboard(copyBtn, plainText);
    });
  }
}

function copyReportToClipboard(btn, text) {
  const onSuccess = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(onSuccess)
      .catch(() => fallbackClipboardCopy(text, onSuccess));
  } else {
    fallbackClipboardCopy(text, onSuccess);
  }
}

function fallbackClipboardCopy(text, onSuccess) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful && onSuccess) onSuccess();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textarea);
}

function setCurrency(curr) {
  appState.currency = curr;
  renderApp();
}

function getFormattedKstTimestamp() {
  let updatedDate = new Date();
  if (appState.data && appState.data.last_updated) {
    const parsed = new Date(appState.data.last_updated.replace(' ', 'T') + '+09:00');
    if (!isNaN(parsed.getTime())) updatedDate = parsed;
    else updatedDate = new Date(appState.data.lastUpdated || Date.now());
  } else if (appState.data && appState.data.lastUpdated) {
    updatedDate = new Date(appState.data.lastUpdated);
  }
  const year = updatedDate.getFullYear();
  const month = String(updatedDate.getMonth() + 1).padStart(2, '0');
  const day = String(updatedDate.getDate()).padStart(2, '0');
  const hours = String(updatedDate.getHours()).padStart(2, '0');
  const minutes = String(updatedDate.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes} KST`;
}

let toastTimer = null;

function showStatusToast(message, isError = false) {
  let toast = document.getElementById('statusToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'statusToast';
    toast.className = 'status-toast';
    document.body.appendChild(toast);
  }
  
  toast.className = `status-toast ${isError ? 'error' : 'success'} show`;
  toast.innerHTML = isError 
    ? `<span>🔴 ${message}</span>` 
    : `<span>🟢 ${message}</span>`;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function renderSystemStatus() {
  const indicator = document.getElementById('systemStatusIndicator');
  if (!indicator) return;

  const status = (appState.data && appState.data.fetch_status) || 'success';
  const isSuccess = status === 'success';
  const timeStr = getFormattedKstTimestamp();

  indicator.className = `system-status-indicator ${isSuccess ? 'success' : 'error'}`;
  indicator.setAttribute('title', isSuccess ? `Last Updated: ${timeStr} (클릭하여 확인)` : `Last Updated: ${timeStr} / 데이터 수집 오류 (클릭하여 확인)`);
  indicator.setAttribute('aria-label', isSuccess ? `Last Updated: ${timeStr}` : `Last Updated: ${timeStr} / 데이터 수집 오류`);

  indicator.onclick = (e) => {
    e.stopPropagation();
    if (isSuccess) {
      showStatusToast(`Last Updated: ${timeStr}`);
    } else {
      showStatusToast(`Last Updated: ${timeStr} / 데이터 수집 오류`, true);
    }
  };
}

function renderApp() {
  renderSystemStatus();
  renderHeaderStatus();
  renderHighlightCards();
  renderMainChart();
  renderTable();
  initNewsTicker();
}

function initNewsTicker() {
  if (!appState.data || !appState.data.items) return;

  // Build combined news pool across all commodities
  const pool = [];
  appState.data.items.forEach(item => {
    const icon = ITEM_ICONS[item.id] || '📦';
    const shortName = item.nameKr.split(' ')[0];

    // Add Korean news first, then English news
    const krList = item.newsKr || item.news || [];
    const enList = item.newsEn || [];

    krList.forEach(art => {
      pool.push({
        icon,
        name: shortName,
        title: art.title,
        source: art.source,
        link: art.link,
        itemId: item.id
      });
    });

    enList.forEach(art => {
      pool.push({
        icon,
        name: shortName,
        title: art.title,
        source: art.source,
        link: art.link,
        itemId: item.id
      });
    });
  });

  if (pool.length === 0) return;

  appState.tickerItems = pool;
  appState.tickerIndex = 0;
  
  displayTickerItem();
  startTickerInterval();
}

function displayTickerItem() {
  if (!appState.tickerItems || appState.tickerItems.length === 0) return;

  const item = appState.tickerItems[appState.tickerIndex];
  const linkEl = document.getElementById('tickerLink');
  if (!linkEl) return;

  // Clean trailing source name suffix from RSS title (e.g. " - 한국경제", " - Reuters")
  let cleanTitle = item.title;
  const lastDashIdx = Math.max(cleanTitle.lastIndexOf(' - '), cleanTitle.lastIndexOf(' – '));
  if (lastDashIdx > 10) {
    cleanTitle = cleanTitle.substring(0, lastDashIdx);
  }

  // Fade out slightly then change content
  linkEl.style.opacity = '0';
  linkEl.style.transform = 'translateY(-4px)';

  setTimeout(() => {
    linkEl.innerHTML = `<span style="color:#60A5FA; font-weight:700;">${item.icon} ${item.name}:</span> ${cleanTitle} <span style="font-size:11.5px; color:#94A3B8; margin-left:6px; font-weight:400;">- ${item.source}</span>`;
    linkEl.href = item.link;
    linkEl.target = '_blank';
    linkEl.onclick = null; // Direct link opening in new tab as requested
    linkEl.style.opacity = '1';
    linkEl.style.transform = 'translateY(0)';
  }, 150);
}

function rotateTicker(direction = 1) {
  if (!appState.tickerItems || appState.tickerItems.length === 0) return;
  appState.tickerIndex = (appState.tickerIndex + direction + appState.tickerItems.length) % appState.tickerItems.length;
  displayTickerItem();
}

function startTickerInterval() {
  if (appState.tickerTimer) clearInterval(appState.tickerTimer);
  appState.tickerTimer = setInterval(() => {
    rotateTicker(1);
  }, 5000); // 5 seconds interval as requested
}

function renderHeaderStatus() {
  if (!appState.data) return;
  const usdRate = appState.data.usdKrwRate ? `₩${appState.data.usdKrwRate.toLocaleString('ko-KR')}` : '-';
  const eurRate = appState.data.eurKrwRate ? `₩${appState.data.eurKrwRate.toLocaleString('ko-KR')}` : '-';
  const textEl = document.getElementById('lastUpdatedText');
  if (textEl) {
    textEl.textContent = `USD/KRW ${usdRate} · EUR/KRW ${eurRate}`;
  }

  const timeStr = getFormattedKstTimestamp();
  const timeEl = document.getElementById('lastUpdatedTime');
  if (timeEl) {
    timeEl.textContent = `Update : ${timeStr}`;
  }

  const badge = document.getElementById('lastUpdatedBadge');
  if (badge) {
    badge.setAttribute('title', `마지막 업데이트: ${timeStr}`);
    badge.setAttribute('aria-label', `마지막 업데이트: ${timeStr}`);
  }
}

function formatPrice(val, originalCurrency) {
  if (!val) return '-';
  const rate = appState.data ? appState.data.usdKrwRate : 1411.5;

  if (appState.currency === 'KRW') {
    let krwVal = val * rate;
    if (originalCurrency === 'US Cent') {
      krwVal = (val / 100) * rate; // cent -> dollar -> krw
    }
    return '₩' + Math.round(krwVal).toLocaleString('ko-KR');
  }

  // USD mode
  if (originalCurrency === 'US Cent') {
    return val.toFixed(2) + ' ¢';
  }
  return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderHighlightCards() {
  const container = document.getElementById('highlightCards');
  if (!container || !appState.data || !appState.data.items) return;
  container.innerHTML = '';

  let items = [];
  const filter = appState.cardFilter || 'featured';

  if (filter === 'gainers') {
    // Only items with positive change (> 0), sorted descending, max 4
    items = appState.data.items
      .filter(item => item.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 4);
  } else if (filter === 'losers') {
    // Only items with negative change (< 0), sorted ascending (biggest drop first), max 4
    items = appState.data.items
      .filter(item => item.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 4);
  } else {
    // Featured key 4 commodities (코코아, 아라비카, 로부스타, GDT 지수)
    const featuredIds = ['cocoa', 'arabica', 'robusta', 'gdt-index'];
    items = featuredIds.map(id => appState.data.items.find(i => i.id === id)).filter(Boolean);
    if (items.length < 4) {
      items = appState.data.items.slice(0, 4);
    }
  }

  items.forEach(item => {
    const isGain = item.change >= 0;
    const badgeClass = isGain ? 'badge-gain' : 'badge-loss';
    const sign = isGain ? '+' : '';
    const icon = ITEM_ICONS[item.id] || '📦';
    const isActive = item.id === appState.selectedItemId;

    const card = document.createElement('div');
    card.className = `metric-card ${isActive ? 'active-card' : ''}`;
    card.dataset.id = item.id;

    // Remove ( ) and English text within parentheses for clean Korean-only title in highlight cards
    const cleanKrName = item.nameKr.replace(/\s*\([^)]*\)/g, '').trim();
    const shortKrName = cleanKrName.split(' ')[0];

    // Compute 1W (7D) or 1M High & Low (GDT items use 1M as exception)
    const isGdt = item.id.startsWith('gdt') || item.category === 'dairy';
    let rangeLabel = '1W';
    let rangeHigh = item.price;
    let rangeLow = item.price;

    if (isGdt) {
      rangeLabel = '1M';
      const prices1m = (item.history && item.history['1M'] && item.history['1M'].length > 0)
        ? item.history['1M'].map(p => p.price)
        : (item.sparkline || [item.price]);
      rangeHigh = item.high1m || (prices1m.length ? Math.max(...prices1m) : item.price);
      rangeLow = item.low1m || (prices1m.length ? Math.min(...prices1m) : item.price);
    } else {
      rangeLabel = '1W';
      const prices7d = (item.history && item.history['7D'] && item.history['7D'].length > 0)
        ? item.history['7D'].map(p => p.price)
        : (item.sparkline || [item.price]);
      rangeHigh = item.high7d || (prices7d.length ? Math.max(...prices7d) : item.price);
      rangeLow = item.low7d || (prices7d.length ? Math.min(...prices7d) : item.price);
    }

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon-title">
          <span class="card-icon">${icon}</span>
          <div>
            <div class="card-title-kr">
              <span class="title-desktop">${cleanKrName}</span>
              <span class="title-mobile">${shortKrName}</span>
            </div>
            <div class="card-title-en">${item.symbol}</div>
          </div>
        </div>
        <span class="badge-change ${badgeClass}">
          <span class="badge-full">${sign}${item.changePercent.toFixed(2)}%</span>
          <span class="badge-mobile-trend">${isGain ? '▲ 상승' : '▼ 하락'}</span>
        </span>
      </div>
      <div class="card-value" style="display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
        <span>${formatPrice(item.price, item.currency)}</span>
        ${item.original_price_lb ? `<span style="font-size:12px; font-weight:500; color:#94A3B8; letter-spacing:0;">(${item.original_price_lb.toFixed(2)} ¢/lb)</span>` : ''}
      </div>
      <div class="card-subtext">
        <span>${item.unitKr}</span>
        <span class="card-range-1w">${rangeLabel}: <span class="range-val-high">${formatPrice(rangeHigh, item.currency)}</span> / <span class="range-val-low">${formatPrice(rangeLow, item.currency)}</span></span>
      </div>
      <canvas class="card-sparkline" id="spark_${item.id}"></canvas>
    `;

    card.addEventListener('click', () => {
      appState.selectedItemId = item.id;
      updateActiveCardHighlight();
      renderMainChart();
    });

    container.appendChild(card);
    
    // Draw mini sparkline
    setTimeout(() => drawMiniSparkline(`spark_${item.id}`, item.sparkline, isGain), 50);
  });
}

function updateActiveCardHighlight() {
  document.querySelectorAll('.metric-card').forEach(c => {
    if (c.dataset.id === appState.selectedItemId) {
      c.classList.add('active-card');
    } else {
      c.classList.remove('active-card');
    }
  });
}

function drawMiniSparkline(canvasId, dataPoints, isGain) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !dataPoints) return;
  const ctx = canvas.getContext('2d');
  
  // Set width/height
  const w = canvas.clientWidth || 240;
  const h = canvas.clientHeight || 40;
  canvas.width = w;
  canvas.height = h;

  ctx.clearRect(0, 0, w, h);
  
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = (max - min) || 1;

  ctx.beginPath();
  ctx.strokeStyle = isGain ? '#10B981' : '#F43F5E';
  ctx.lineWidth = 2.5;

  dataPoints.forEach((val, idx) => {
    const x = (idx / (dataPoints.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - 8) - 4;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

function renderMainChart() {
  const selectedItem = appState.data.items.find(i => i.id === appState.selectedItemId) || appState.data.items[0];
  const icon = ITEM_ICONS[selectedItem.id] || '📈';

  // Update header text with clickable exchange link
  const exUrl = selectedItem.exchangeUrl || (selectedItem.exchange.includes('Global Dairy Trade') ? 'https://www.globaldairytrade.info/en/product-results/' : 'https://finance.yahoo.com');
  const exLink = `<a href="${exUrl}" target="_blank" style="color:#60A5FA; font-weight:600; text-decoration:underline;">${selectedItem.exchange} ↗</a>`;

  const origCentSub = selectedItem.original_price_lb
    ? `<span style="color:#94A3B8; font-size:12px; font-weight:500; margin-left:6px;">· 벤치마크 원본: (${selectedItem.original_price_lb.toFixed(2)} ¢/lb)</span>`
    : '';

  document.getElementById('chartTitle').textContent = `${icon} ${selectedItem.nameKr}`;
  document.getElementById('chartSubtitle').innerHTML = `${exLink} · ${selectedItem.unitKr} (${selectedItem.symbol}) ${origCentSub}`;

  const historyData = selectedItem.history[appState.selectedRange] || selectedItem.history['7D'];
  const labels = historyData.map(d => d.date || d.time);
  const rawPrices = historyData.map(d => d.price);

  // Convert prices based on currency selection
  const rate = appState.data.usdKrwRate;
  const prices = rawPrices.map(p => {
    if (appState.currency === 'KRW') {
      return selectedItem.currency === 'US Cent' ? Math.round((p / 100) * rate) : Math.round(p * rate);
    }
    return p;
  });

  const ctx = document.getElementById('mainChart').getContext('2d');

  if (appState.chartInstance) {
    appState.chartInstance.destroy();
  }

  const isGain = selectedItem.change >= 0;
  const lineColor = isGain ? '#10B981' : '#3B82F6';
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, isGain ? 'rgba(16, 185, 129, 0.25)' : 'rgba(59, 130, 246, 0.25)');
  gradient.addColorStop(1, 'rgba(10, 14, 23, 0.0)');

  appState.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${selectedItem.nameKr} (${appState.currency})`,
        data: prices,
        borderColor: lineColor,
        borderWidth: 3,
        pointBackgroundColor: lineColor,
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: true,
        backgroundColor: gradient,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111726',
          titleColor: '#F8FAFC',
          bodyColor: '#38BDF8',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              const rawVal = rawPrices[context.dataIndex];
              const mainPrice = formatPrice(rawVal, selectedItem.currency);
              if (selectedItem.id === 'arabica') {
                const centVal = (rawVal / 22.0462).toFixed(2);
                return [mainPrice, `(${centVal} ¢/lb)`];
              }
              return mainPrice;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748B', font: { family: 'Inter', size: 12 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748B',
            font: { family: 'Inter', size: 12 },
            callback: function(val) {
              return appState.currency === 'KRW' ? '₩' + val.toLocaleString() : val;
            }
          }
        }
      }
    }
  });
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  let filtered = appState.data.items.filter(item => {
    const matchCat = appState.activeCategory === 'all' || item.category === appState.activeCategory;
    const matchQuery = !appState.searchQuery || 
      item.nameKr.toLowerCase().includes(appState.searchQuery) ||
      item.nameEn.toLowerCase().includes(appState.searchQuery) ||
      item.symbol.toLowerCase().includes(appState.searchQuery);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748B; padding:32px;">검색 결과가 없습니다.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const isGain = item.change >= 0;
    const badgeClass = isGain ? 'badge-gain' : 'badge-loss';
    const sign = isGain ? '+' : '';
    const icon = ITEM_ICONS[item.id] || '📦';

    // 1M High & Low calculation for table
    const prices1m = (item.history && item.history['1M'] && item.history['1M'].length > 0)
      ? item.history['1M'].map(p => p.price)
      : (item.history && item.history['7D'] ? item.history['7D'].map(p => p.price) : [item.price]);
    const high1m = item.high1m || (prices1m.length ? Math.max(...prices1m) : item.price);
    const low1m = item.low1m || (prices1m.length ? Math.min(...prices1m) : item.price);

    // 52 week bar calculation
    const range = item.high52w - item.low52w || 1;
    const pct = Math.max(0, Math.min(100, ((item.price - item.low52w) / range) * 100));

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="cell-item">
          <div class="cell-icon">${icon}</div>
          <div>
            <div class="cell-name-kr">${item.nameKr}</div>
            <div class="cell-symbol">${item.symbol} · ${item.exchange}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="cell-price">${formatPrice(item.price, item.currency)}</div>
        <div class="cell-unit">${item.unitKr} ${item.original_price_lb ? `<span style="color:#94A3B8; font-size:10.5px;">(${item.original_price_lb.toFixed(2)} ¢/lb)</span>` : ''}</div>
      </td>
      <td>
        <span class="badge-change ${badgeClass}">
          ${sign}${item.changePercent.toFixed(2)}%
        </span>
      </td>
      <td>
        <div style="font-size:13px; font-weight:600; color:#E2E8F0;">${formatPrice(high1m, item.currency)}</div>
        <div style="font-size:12px; color:#64748B;">저가 ${formatPrice(low1m, item.currency)}</div>
      </td>
      <td>
        <div class="range-bar-container">
          <div class="range-labels">
            <span>${formatPrice(item.low52w, item.currency)}</span>
            <span>${formatPrice(item.high52w, item.currency)}</span>
          </div>
          <div class="range-track">
            <div class="range-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      </td>
      <td>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn-primary" style="padding:6px 10px; font-size:12px;" onclick="openDetailModal('${item.id}')">상세분석</button>
          <button class="btn-primary" style="padding:6px 10px; font-size:12px; background:linear-gradient(135deg, #059669 0%, #047857 100%); box-shadow:none;" onclick="openNews('${item.id}')">📰 관련 뉴스</button>
        </div>
      </td>
    `;

    tr.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        appState.selectedItemId = item.id;
        updateActiveCardHighlight();
        renderMainChart();
        window.scrollTo({ top: 180, behavior: 'smooth' });
      }
    });

    tbody.appendChild(tr);
  });
}

function openNews(itemId, langPreference) {
  const item = appState.data.items.find(i => i.id === itemId);
  if (!item) return;

  const currentLang = langPreference || appState.newsLang || 'KR';
  appState.newsLang = currentLang;

  const icon = ITEM_ICONS[item.id] || '📦';
  document.getElementById('newsModalTitle').textContent = `📰 ${icon} ${item.nameKr} 관련 실시간 뉴스`;

  const articlesList = (currentLang === 'KR') ? (item.newsKr || item.news || []) : (item.newsEn || item.news || []);

  const articlesHtml = (articlesList && articlesList.length > 0) ? articlesList.map(art => `
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); padding:16px; border-radius:12px; margin-bottom:12px; transition:all 0.2s ease;">
      <a href="${art.link}" target="_blank" style="font-size:15px; font-weight:700; color:#3B82F6; text-decoration:none; line-height:1.5; display:block; margin-bottom:8px;">
        ${art.title}
      </a>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#94A3B8;">
        <span style="background:${currentLang === 'KR' ? 'rgba(3,207,93,0.15)' : 'rgba(59,130,246,0.15)'}; color:${currentLang === 'KR' ? '#34D399' : '#60A5FA'}; padding:3px 10px; border-radius:4px; font-weight:600;">
          ${art.source}
        </span>
        <span>${art.date || ''}</span>
      </div>
    </div>
  `).join('') : `<p style="color:#94A3B8; font-size:14px; padding:16px;">수집된 최신 뉴스를 불러오는 중입니다...</p>`;

  const cleanTerm = item.nameKr.split(' ')[0];
  const naverSearchTerm = item.naverQuery || (cleanTerm + ' 가격');
  const naverNewsUrl = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(naverSearchTerm)}`;
  const targetedUrl = `https://www.google.com/search?q=${encodeURIComponent('"' + cleanTerm + '" futures price (site:reuters.com OR site:bloomberg.com OR site:ft.com OR site:wsj.com)')}&tbm=nws`;
  const bbcTargetUrl = `https://www.google.com/search?q=${encodeURIComponent('"' + cleanTerm + '" price site:bbc.co.uk')}&tbm=nws`;

  document.getElementById('newsModalBody').innerHTML = `
    <!-- Language Toggle Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:10px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); margin-bottom:18px;">
      <span style="font-size:13px; font-weight:600; color:#E2E8F0;">
        선택된 언어: ${currentLang === 'KR' ? '국내 주요 언론 뉴스 (네이버 수집 3개)' : '해외 외신 뉴스 (Reuters/WSJ 수집 3개)'}
      </span>
      <div class="currency-toggle" style="background:rgba(255,255,255,0.06); padding:3px; border-radius:999px;">
        <button class="currency-btn ${currentLang === 'KR' ? 'active' : ''}" onclick="switchNewsLang('${item.id}', 'KR')">KR (국내 뉴스)</button>
        <button class="currency-btn ${currentLang === 'EN' ? 'active' : ''}" onclick="switchNewsLang('${item.id}', 'EN')">EN (외신 뉴스)</button>
      </div>
    </div>

    <!-- Articles Container -->
    <div style="margin-bottom:20px;">
      ${articlesHtml}
    </div>

    <!-- External Search Links -->
    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:18px;">
      <h4 style="font-size:14px; font-weight:700; color:#F8FAFC; margin-bottom:12px;">🔍 뉴스 원문 더보기</h4>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a href="${naverNewsUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:#03CF5D; color:#FFF; font-weight:700; box-shadow:0 4px 14px rgba(3,207,93,0.3);">
          네이버 뉴스 검색 ('${naverSearchTerm}')
        </a>
        <a href="${targetedUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:linear-gradient(135deg, #059669 0%, #047857 100%);">
          Reuters / Bloomberg 외신 검색
        </a>
        <a href="${bbcTargetUrl}" target="_blank" class="btn-primary" style="text-decoration:none; padding:9px 16px; font-size:13px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);">
          BBC News 검색
        </a>
      </div>
    </div>
  `;

  document.getElementById('newsModal').classList.add('open');
}

function switchNewsLang(itemId, lang) {
  openNews(itemId, lang);
}

function openDetailModal(itemId) {
  const item = appState.data.items.find(i => i.id === itemId);
  if (!item) return;

  const icon = ITEM_ICONS[item.id] || '📦';
  document.getElementById('detailTitle').textContent = `${icon} ${item.nameKr} 상세 동향`;
  
  const isGain = item.change >= 0;
  const sign = isGain ? '+' : '';
  const exchangeUrl = item.exchangeUrl || 'https://finance.yahoo.com';
  const exchangeName = item.exchange || '공식 거래소';

  // Compute 7D (or 1M for dairy) history points
  const isGdt = item.id.startsWith('gdt') || item.category === 'dairy';
  const rangeKey = isGdt ? '1M' : '7D';
  const rangeLabel = isGdt ? '최근 1개월' : '최근 7일';
  
  const historyData = (item.history && item.history[rangeKey] && item.history[rangeKey].length > 0)
    ? item.history[rangeKey]
    : ((item.history && item.history['7D'] && item.history['7D'].length > 0)
        ? item.history['7D']
        : (item.sparkline ? item.sparkline.map((p, idx) => ({ date: `D-${idx}`, price: p })) : [{ date: '현재', price: item.price }]));
        
  const prices = historyData.map(h => h.price);
  const rangeHigh = prices.length ? Math.max(...prices) : item.price;
  const rangeLow = prices.length ? Math.min(...prices) : item.price;

  document.getElementById('detailBody').innerHTML = `
    <!-- Top Price Summary Box -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; margin-bottom:18px;">
      <div>
        <div style="font-size:13px; color:#94A3B8;">현재 시세</div>
        <div style="font-size:32px; font-family:'Outfit'; font-weight:800; color:#FFF;">${formatPrice(item.price, item.currency)}</div>
        <div style="font-size:13px; color:#64748B;">단위: ${item.unitKr} (${item.unit})</div>
      </div>
      <div style="text-align:right;">
        <span class="badge-change ${isGain ? 'badge-gain' : 'badge-loss'}" style="font-size:16px; padding:6px 14px;">
          ${sign}${item.changePercent.toFixed(2)}%
        </span>
        <div style="font-size:12px; color:#94A3B8; margin-top:8px;">거래소: ${item.exchange}</div>
      </div>
    </div>

    <!-- Mini Trend Chart Section -->
    <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:12px; border:1px solid rgba(255,255,255,0.06); margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:13px; font-weight:700; color:#E2E8F0;">📈 ${rangeLabel} 시세 추이</span>
        <span style="font-size:12px; color:#94A3B8;">
          최고 <span style="color:#10B981; font-weight:600;">${formatPrice(rangeHigh, item.currency)}</span> / 최저 <span style="color:#F43F5E; font-weight:600;">${formatPrice(rangeLow, item.currency)}</span>
        </span>
      </div>
      <div style="height:120px; width:100%; position:relative;">
        <canvas id="detailMiniChart"></canvas>
      </div>
    </div>

    <!-- Overview Text -->
    <h4 style="font-size:15px; font-weight:700; margin-bottom:6px; color:#F8FAFC;">품목 개요</h4>
    <p style="font-size:13.5px; color:#94A3B8; line-height:1.6; margin-bottom:18px;">${item.description}</p>

    <!-- 52-Week High/Low Grid -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
      <div style="background:rgba(0,0,0,0.3); padding:14px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px; color:#64748B;">52주 최고가</div>
        <div style="font-size:17px; font-weight:700; color:#F8FAFC; margin-top:4px;">${formatPrice(item.high52w, item.currency)}</div>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:14px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px; color:#64748B;">52주 최저가</div>
        <div style="font-size:17px; font-weight:700; color:#F8FAFC; margin-top:4px;">${formatPrice(item.low52w, item.currency)}</div>
      </div>
    </div>

    <!-- Official Source Button -->
    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:16px;">
      <a href="${exchangeUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:flex; align-items:center; justify-content:center; gap:8px; text-decoration:none; width:100%; padding:12px 18px; font-size:14px; font-weight:700; background:linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); border-radius:10px; box-shadow:0 4px 14px rgba(37,99,235,0.35); box-sizing:border-box;">
        🔗 공식 데이터 출처 바로가기 (${exchangeName})
      </a>
    </div>
  `;

  document.getElementById('detailModal').classList.add('open');

  // Render Mini Chart
  setTimeout(() => {
    const canvas = document.getElementById('detailMiniChart');
    if (canvas) {
      if (window.detailMiniChartInstance) {
        window.detailMiniChartInstance.destroy();
      }
      const ctx = canvas.getContext('2d');
      const strokeColor = isGain ? '#10B981' : '#F43F5E';
      const grad = ctx.createLinearGradient(0, 0, 0, 120);
      grad.addColorStop(0, isGain ? 'rgba(16, 185, 129, 0.28)' : 'rgba(244, 63, 94, 0.28)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      window.detailMiniChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: historyData.map(h => h.date || h.time || ''),
          datasets: [{
            data: prices,
            borderColor: strokeColor,
            borderWidth: 2.2,
            backgroundColor: grad,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: strokeColor,
            pointHoverRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              titleColor: '#E2E8F0',
              bodyColor: '#FFFFFF',
              padding: 8,
              callbacks: {
                label: (c) => ` 시세: ${formatPrice(c.raw, item.currency)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#64748B', font: { size: 11 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: {
                color: '#64748B',
                font: { size: 10 },
                callback: (v) => formatPrice(v, item.currency)
              }
            }
          }
        }
      });
    }
  }, 40);
}
