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
  "fetch_status": "error",
  "last_updated": "2026-08-20 14:23:30",
  "weekly_report": {
    "title": "[2026 Week 34 Report]",
    "week_number": 34,
    "week_date_range": "2026.08.17 ~ 2026.08.21",
    "weekly_price_title": "[W34 주요품목가격]",
    "date": "2026.08.20",
    "report_date": "2026.08.20, 14:23",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,234.46 (▼9.70%)",
    "weekly_price_list": [
      "코코아 : $5,934.00 (▲3.83%)",
      "아라비카 커피 : $7,234.46 (▲3.85%)",
      "로부스타 커피 : $3,728.00 (▼3.98%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,173.50 (▲0.39%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,934.00 (▲3.83%)",
      "아라비카 커피 : $7,234.46 (▲3.85%)",
      "로부스타 커피 : $3,728.00 (▼3.98%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,173.50 (▲0.39%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,393.48원 (▼20.10원)",
    "fx_eur": "1,626.00원 (▼8.92원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 가격 수요 증가로 4% 상승하며 회복세"
  },
  "daily_briefing": {
    "title": "[2026 Week 34 Report]",
    "week_number": 34,
    "week_date_range": "2026.08.17 ~ 2026.08.21",
    "weekly_price_title": "[W34 주요품목가격]",
    "date": "2026.08.20",
    "report_date": "2026.08.20, 14:23",
    "top_gainer": "GDT 탈지분유 : $3,502.00 (▲7.39%)",
    "top_loser": "아라비카 커피 : $7,234.46 (▼9.70%)",
    "weekly_price_list": [
      "코코아 : $5,934.00 (▲3.83%)",
      "아라비카 커피 : $7,234.46 (▲3.85%)",
      "로부스타 커피 : $3,728.00 (▼3.98%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,173.50 (▲0.39%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "other_commodities": [
      "코코아 : $5,934.00 (▲3.83%)",
      "아라비카 커피 : $7,234.46 (▲3.85%)",
      "로부스타 커피 : $3,728.00 (▼3.98%)",
      "GDT 지수 : $3,873.00 (▲2.51%)",
      "GDT 전지분유 : $3,591.00 (▲3.10%)",
      "GDT 탈지분유 : $3,502.00 (▲7.39%)",
      "GDT 버터 : $5,090.00 (▼2.58%)",
      "팜유 : $1,173.50 (▲0.39%)",
      "라우릭 오일 : $1,930.00 (▲0.35%)"
    ],
    "fx_usd": "1,393.48원 (▼20.10원)",
    "fx_eur": "1,626.00원 (▼8.92원)",
    "news_category": "오늘의 주요 헤드라인",
    "news_title": "GDT 가격 수요 증가로 4% 상승하며 회복세"
  },
  "lastUpdated": "2026-08-20T14:23:30.682662+09:00",
  "usdKrwRate": 1393.48,
  "eurKrwRate": 1626.0,
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
      "guide": {
        "definition": "코트디부아르·가나 등 서아프리카산 카카오두 기준, 미국 ICE 거래소 선물 가격",
        "correlation": "글로벌 가공사·제과업체의 원료 매입 단가 기준\n선물 급등 시 6개월~1년 시차를 두고 수입 현물가 및 제품가에 직접 반영",
        "factors": [
          "서아프리카 가뭄 및 병충해(CSSVD) 발생 여부",
          "코트디부아르·가나 정부의 수매가(LID) 정책",
          "글로벌 가공업체 분쇄량(Grindings) 지표 및 완제품 소비 수요"
        ]
      },
      "price": 5934.0,
      "change": 29.0,
      "changePercent": 0.49,
      "high52w": 7935.0,
      "low52w": 2798.0,
      "high24h": 6119.0,
      "low24h": 5829.0,
      "high7d": 6044.0,
      "low7d": 5543.0,
      "high1m": 6044.0,
      "low1m": 5100.0,
      "volume": 0,
      "sparkline": [
        5543.0,
        5619.0,
        5648.0,
        5734.0,
        6044.0,
        5905.0,
        5934.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5898.4
          },
          {
            "time": "11:00",
            "price": 5910.26
          },
          {
            "time": "13:00",
            "price": 5922.13
          },
          {
            "time": "14:23",
            "price": 5934.0
          }
        ],
        "7D": [
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
            "price": 5905.0
          },
          {
            "date": "08-19",
            "price": 5934.0
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
            "price": 5905.0
          },
          {
            "date": "08-19",
            "price": 5934.0
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
            "price": 5905.0
          },
          {
            "date": "2026-08",
            "price": 5934.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Dollar Weakness Lifts Cocoa Prices - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPTjN4Y2gwYkNGTUo1R2x6V19CbE1ZQ1pJSXpwaG0xMm00Y3QxanBRb1JGcVFGSlhOWVpzZVBObWNVem5iMzVkMUJoOFg2bmozRGlPYzh2WHdjS01zUmg1dTFjMFgwaEF5VzFqeWdCSVJ1cTVYUDdSa1lHc19uQm9rNnRUeFU?oc=5",
          "date": "08-20 03:23"
        },
        {
          "title": "US Cocoa Futures (COCOA-F) Surges on Aug 19: Key Factors to Watch - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOdDl6SGtqcXJlVEpBdEVWbkdkLWNSU1VWekFkRXExcV9GU08yNk9vZ0hnR0I0LWk1UzJqRWdYcGY4b09UZDdEdVFNQUJnUEJZdXd6SVozS2RrNHhTRldwajhLajZfWmtMSmxkamIxOWRZS3c4YmxsYWtkMVAwR0dVd1NFbFFvVE1tZW9wM0VvVQ?oc=5",
          "date": "08-19 20:05"
        },
        {
          "title": "Slumping cocoa price leaves West Africa’s farmers struggling to comply with EU’s anti-deforestation law - EUobserver",
          "source": "EUobserver",
          "link": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNd3dOSHVqcGlwcFRDYTQ0MURxd29NYWF6X0dmZVgyUk5rT2kyeDFvMFpMZGRwcElfbUlFY2RLaUE0OC1pc2xDVERxMUZpSkpxTkZnSkxrd0tmbVNjajQtOWs3emtIS2R1OVBiX2pNd3pXbzc0Mkk4dmZka05mNmp2SVk5dGQ2OWVpN0tCV2VQTFF5MGFqNTNjX0tjbS0tVF9SRlpXdVE3d0hhOFp1eHpjdWdNMEU4eVdhMF93U0RMQUp5NWpWR3ZqTC1YM2w?oc=5",
          "date": "08-18 02:10"
        },
        {
          "title": "Cocoa gains 1% and tests the $6,000 area 🔼 How are funds positioned? - XTB.com",
          "source": "XTB.com",
          "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPeG1wN1ZGS0p1ckNKVklya29aaFlJVGZCbWlxeDdNd0xRbkRTUVMwWkVhTnFwVmtpWk83dVI1cmlyV1VnQ3hYbldxSTViNnFSZHM2LVBQbGhHOEw3VnlzcEt6OTRGTDVFS2xacUNzRmZDVjZlTm53VjViSVIzNVZCVGo0R3VIbDZMTlNSRjlpU29PcEpsLUl2VUloenljaVNDSDBWMUxUVkJCOExSZ0kyZU80TW1HaEJWY041bTZn?oc=5",
          "date": "08-17 22:37"
        }
      ],
      "newsKr": [
        {
          "title": "미국 코코아 선물(COCOA-F) 종목이 8월19일에 2.26% 상승했습니다. 시장이 가격을 다시 책정하고 있나요? - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPLWxSdWdrNU1WbG1hYnYzUk13eEZ6dFMtQmNhUGdEWmM4YmxQUmZhRFJ1VzR4VGNXbEUxWGxuNW5iVnp3RGx6S1FnR0hURWZhMjdxbE5XbXN3ZXpRc1NkTTRBYVVXczA3clFiZ292eTZhNS1TSG5FdUQ2X3JyVW9feUE5SHJCbWRVRGk5RVJmYmJoTk0?oc=5",
          "date": "08-19 11:05"
        },
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
          "title": "윌케르 비스퀴비, 2026년 2분기 엇갈린 실적 발표에도 주가 상승 - Investing.com 한국어",
          "source": "Investing.com 한국어",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTFBOb21heG92UmluMFlKSlNUQ3Z4Vmp6NE84bmNSSHprU1FXLUZJa084dmZCdDdqMGlxaVkxaFFxX01TM2hwU0s4MG9mRjlLU08yR0tzVGxZQ2hIWGZZUG9ncXhERDY3S2RkREM0NlpKVQ?oc=5",
          "date": "08-19 23:43"
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
      "guide": {
        "definition": "브라질·콜롬비아 등 고지대 생산 스페셜티·원두커피용 품종, 미국 ICE 거래소 선물 가격",
        "correlation": "국제 원두 거래의 핵심 벤치마크\n수입 현물가는 선물 가격에 산지 프리미엄(Diff) 합산하여 결정",
        "factors": [
          "브라질 개화기 가뭄 및 결빙(서리) 피해",
          "브라질 헤알화 환율 변동에 따른 농가 출하량 조절",
          "유럽 삼림벌채방지법(EUDR) 등 글로벌 규제 이슈"
        ]
      },
      "price": 7234.46,
      "change": -777.13,
      "changePercent": -9.7,
      "high52w": 9655.13,
      "low52w": 5350.61,
      "high24h": 7432.88,
      "low24h": 7125.33,
      "high7d": 8011.59,
      "low7d": 7234.46,
      "high1m": 8011.59,
      "low1m": 6821.09,
      "volume": 0,
      "sparkline": [
        7402.01,
        7497.91,
        7343.59,
        7453.82,
        7608.14,
        8011.59,
        7234.46
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 7191.05
          },
          {
            "time": "11:00",
            "price": 7205.52
          },
          {
            "time": "13:00",
            "price": 7219.99
          },
          {
            "time": "14:23",
            "price": 7234.46
          }
        ],
        "7D": [
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
            "price": 8011.59
          },
          {
            "date": "08-19",
            "price": 7234.46
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
            "price": 8011.59
          },
          {
            "date": "08-19",
            "price": 7234.46
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
            "price": 8011.59
          },
          {
            "date": "2026-08",
            "price": 7234.46
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
          "title": "Agricultural commodity prices today, August 18, 2026: Coffee prices unlikely to break through, exports from Brazil about to accelerate; Oil prices return to the $90 mark, US and Iran tighten their positions. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMigAJBVV95cUxOakhCR1hCS0o5Tnplbi13dVUtSGIyM3hldm9CWVpsNmZDZW1NV2xNODc3djIzQ0RGeW1mZV9Lajc4RW8zT20wa1loVzdVZklmLWJCTThYZUlkNm53X3BMZDV4VkxwNHEyN0pDX2piNWxRODRxbDJsUTZrZjBJN2NMenpsZktqX0R5WlhBVFE5WlB4MV9vczlmelpDLWFvRGltb0VBbFA3OS00NkNFdUt4NjE3eEdNbHR4a2VXYjRKZE5nVzkxcjhHT1VWYjRYSTM5dGZKZFJ0MnBLa0EtR0kyZnlkajduQ1VpeUhRWk9XeFJyRGItWlMtenFYUW1RZmQx?oc=5",
          "date": "08-18 14:34"
        },
        {
          "title": "Agricultural commodity prices today, August 19, 2026: Coffee prices surge, positive sentiment returns; US 'de-escalates' and postpones 50% tariff on Canadian goods. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxOZW5mRlpadnhHaEFiak11NHFOUjVNRklTbENMRjB3RjQ0U2lwUjMyWjM2VF9FbjJ4MGNmR3RVQTY0eTkwYmFYUHJELVVYQ3BnUGdUaFdsUDY1eUxuVWswN2xjMXBtWms4N1hmNFVFVWRwMWNNaUx3MlNHQXFDSUgxVlV6UUR0SFRtZ1FELTNGdktpUmpqQUtqeXNWbTlzTV8zMEpIcm9uZURCRzZPTmdkeTc2akh0TFdsZ3pPM2tFWk1yanNhNDVLaGIxTG9MM2ExSVAtaERleXBOdjB2RXhOVHJQaFZoQQ?oc=5",
          "date": "08-19 15:06"
        },
        {
          "title": "Coffee Price Retreat as Brazil’s Coffee Harvest Accelerates - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQVENkV3ZYdU0xWXFOcW1SallUbFd6U3p2YWZFYkRlS0wyaWppR2VvY1Y4azhYQ0V2WGVxMkw3a3ZwQVVtbEVvYUZPWkhPZ2VoSE1DNUlncFJkYXlDRlNKNVVTajhhcVJDZm1PWExNOU9QS0lkMDRXSjBHYzd0SDVrSUJ2TDVnUWNRWUF6NnZJamVzYzFHZDhNZE4tXy1QVFpXc01rQQ?oc=5",
          "date": "08-20 00:52"
        }
      ],
      "newsKr": [
        {
          "title": "8월 19일 농산물 가격: 커피 가격은 계속 상승하고, 생돈 가격은 급락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNWlhOaDZCbGpGTTJUcVhwZEtHUTRob3JpZHU1Y0ZDaTlqQkNvT2lSNWRsc1RuSkFySWdCamJtczZVSzdjam5hanlUbVlSaUowQjlodTY1aWowbW5rdy1hMFBobUkzRGpOOXpBaWl5NmN5U053NTRLSjlHLTZmZmRCZGRUTnhiRUtkY0E?oc=5",
          "date": "08-20 12:14"
        },
        {
          "title": "오늘의 농업 뉴스(8월 20일): 커피 가격이 계속 상승하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMihwFBVV95cUxNNHNUS3V5cng4NjFKSHpRQVBscmpSdDJuRXhjV1J5bFJLc2pKMjNrdEx0aGVtSkhJOHlvS29VWUtvaXhuSWdYZU8tX3hkb1BZdkZ5Z2RFUHFnQnJpNDJTcVdBZWpHdGtTVHQxekhoOHMzT3JrTFhXNGxkUDdtX0FPejFldERpT2s?oc=5",
          "date": "08-20 11:02"
        },
        {
          "title": "오늘(8월 20일) 커피 가격: 브라질의 수확이 본격화됨에 따라 하락세로 전환하고 있습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOUG5VWkhtdnFxem9zb1FOY2dITFcxWU9xZzVoSWwtQ1k4MmFEeW1xRlNRVnNCQ1RJS3NXUm92eEFOQW5rejM2VEZnTWhFUzd2V1Vua3QxZFJsR2NnZ01OcmRDNmRJNkpNRFU1TURTdkVnTnJicUlLVHVFeHYxVHlNTEVvMkJ5MzFrWHNzUWZ3V3lfcERsdldvaA?oc=5",
          "date": "08-20 09:18"
        },
        {
          "title": "오늘(8월 20일) 커피 가격은 kg당 10만 VND에 육박하고 있는 반면, 국제 가격은 예상치 못하게 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQZi00RW13NjlfUkpSQjBNcHd5WEVoN2lRZFlPV0lsSkRhUnlrZnVKZHVnTzNDTXVrQmVwUXdJVWlsQzVEcEFERDBhdlhXS2FDMm44THllSzk4UDdPUTY4S0pYN1l5ZE4yTTFqaF9oQUxpS0N2dEFkZTVDb2dQWXUzY2pVdkw2WnNtcElQUGtXemNjNWs4SjhWNzhB?oc=5",
          "date": "08-20 12:39"
        }
      ],
      "original_price_lb": 328.15
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
      "guide": {
        "definition": "베트남·인도네시아 등 저지대 생산 인스턴트·에스프레소용 품종, 런던 ICE Europe 선물 가격",
        "correlation": "글로벌 인스턴트 커피 및 캔커피 제조사의 원가 기준\n직관성 확보를 위해 아라비카(¢/lb)와 달리 톤당 달러($/MT)로 환산 표기\n아라비카 가격 급등 시 대체재 수요 증가로 연동성 강화",
        "factors": [
          "최대 생산국 베트남 기후(가뭄 및 우기 강우량)",
          "산지 농가의 재고 비축 및 출하 속도",
          "수에즈 운하 등 주요 해상 항로 물류 차질"
        ]
      },
      "price": 3728.0,
      "change": -11.0,
      "changePercent": -0.29,
      "high52w": 3919.0,
      "low52w": 3555.0,
      "high24h": 3766.0,
      "low24h": 3672.0,
      "high7d": 3777.0,
      "low7d": 3594.0,
      "high1m": 3884.0,
      "low1m": 3594.0,
      "volume": 12850,
      "sparkline": [
        3777.0,
        3752.0,
        3644.0,
        3594.0,
        3644.0,
        3739.0,
        3728.0
      ],
      "history": {
        "7D": [
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
          },
          {
            "date": "08-19",
            "price": 3728.0
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
          },
          {
            "date": "08-19",
            "price": 3728.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3705.63
          },
          {
            "time": "11:00",
            "price": 3713.09
          },
          {
            "time": "13:00",
            "price": 3720.54
          },
          {
            "time": "14:23",
            "price": 3728.0
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
          "title": "Brazil Coffee Harvest Pressures Weigh on Coffee Prices - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPWVl5QTU4WTVpMHV6aEhYa0xnRTlES3hTck9fVG02OVJTSVZ3ZkNDenRIU1dwWHYtcF9yX3drZnJWRnV5WXM3eWR0dVhFdWlUY3dFNVJJVl9STE02OVFnVXg1WnhMUFdaNm50T3Zuc0hWVWJIX1RrZUY2S2hld1NXRmdvOGVhbi1oaXlhejdocEhDMUl0YUtxMzlmQkEzYmJZeWgyUXVQSWVOSmt4SDR4NGJ2MA?oc=5",
          "date": "08-20 03:22"
        },
        {
          "title": "Agric. & Environment: Coffee farmers optimistic despite unst - NewVision.co.ug",
          "source": "NewVision.co.ug",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOYVpVLTB1TnQwdXIwdzFCSks5Z2p1NExNR1VBVVo2WDJ0Yk9qYlY5bHNXdk15TDllR01KN1hWUllRckU3SlRHbDVJdlFOanlTMGpyQTVGSU1TUTdSdERTc1VNQWdMM0pLX19xSTEyUk9ra0dzQjctNzZlRHR5YzZhbFEwRUtkNk5Mb05IMm1wU0VqN3VQR0duQmxpZjJlaGpXaklNdWRVWDFWTWl3M1phXw?oc=5",
          "date": "08-20 03:00"
        },
        {
          "title": "Agricultural commodity prices today, August 19, 2026: Coffee prices surge, positive sentiment returns; US 'de-escalates' and postpones 50% tariff on Canadian goods. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMi5gFBVV95cUxOZW5mRlpadnhHaEFiak11NHFOUjVNRklTbENMRjB3RjQ0U2lwUjMyWjM2VF9FbjJ4MGNmR3RVQTY0eTkwYmFYUHJELVVYQ3BnUGdUaFdsUDY1eUxuVWswN2xjMXBtWms4N1hmNFVFVWRwMWNNaUx3MlNHQXFDSUgxVlV6UUR0SFRtZ1FELTNGdktpUmpqQUtqeXNWbTlzTV8zMEpIcm9uZURCRzZPTmdkeTc2akh0TFdsZ3pPM2tFWk1yanNhNDVLaGIxTG9MM2ExSVAtaERleXBOdjB2RXhOVHJQaFZoQQ?oc=5",
          "date": "08-19 15:06"
        },
        {
          "title": "Coffee Price Retreat as Brazil’s Coffee Harvest Accelerates - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQVENkV3ZYdU0xWXFOcW1SallUbFd6U3p2YWZFYkRlS0wyaWppR2VvY1Y4azhYQ0V2WGVxMkw3a3ZwQVVtbEVvYUZPWkhPZ2VoSE1DNUlncFJkYXlDRlNKNVVTajhhcVJDZm1PWExNOU9QS0lkMDRXSjBHYzd0SDVrSUJ2TDVnUWNRWUF6NnZJamVzYzFHZDhNZE4tXy1QVFpXc01rQQ?oc=5",
          "date": "08-20 00:52"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 20일) 커피 가격은 kg당 10만 VND에 육박하고 있는 반면, 국제 가격은 예상치 못하게 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQZi00RW13NjlfUkpSQjBNcHd5WEVoN2lRZFlPV0lsSkRhUnlrZnVKZHVnTzNDTXVrQmVwUXdJVWlsQzVEcEFERDBhdlhXS2FDMm44THllSzk4UDdPUTY4S0pYN1l5ZE4yTTFqaF9oQUxpS0N2dEFkZTVDb2dQWXUzY2pVdkw2WnNtcElQUGtXemNjNWs4SjhWNzhB?oc=5",
          "date": "08-20 12:39"
        },
        {
          "title": "8월 19일 농산물 가격: 커피 가격은 계속 상승하고, 생돈 가격은 급락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNWlhOaDZCbGpGTTJUcVhwZEtHUTRob3JpZHU1Y0ZDaTlqQkNvT2lSNWRsc1RuSkFySWdCamJtczZVSzdjam5hanlUbVlSaUowQjlodTY1aWowbW5rdy1hMFBobUkzRGpOOXpBaWl5NmN5U053NTRLSjlHLTZmZmRCZGRUTnhiRUtkY0E?oc=5",
          "date": "08-20 12:14"
        },
        {
          "title": "커피(COFFEE) 종목이 8월18일에 2.06% 하락한 이유를 확인해 보세요 - TradingKey",
          "source": "TradingKey",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPY243dDRGakE4OS1XaWVZUGVoTmdHWnh3c1A0OUhWTDN6a1I0US1uM0U4WVE2UzViWkF5ZVRPYTFYbWx0YW44TlloZnBIMmhBdTRDQWpTTW5zeTdlZ21pSmxhSU5NWlU0ZDFhd1d3RXFRQ0VsSVU4NjBPaXpSLVFOMmdkcFVCZUt1WkFvQVJiUU94UQ?oc=5",
          "date": "08-18 17:30"
        },
        {
          "title": "오늘 8월 19일 커피 가격: kg당 1,500동 급등 - ko.laodong.vn",
          "source": "ko.laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPSmlHQmpTSm5IaG1fLXg2WEo4ME5PT21jR0R1eEZaa2JwVzNxLW92NlBpTDh1VDNzcE93VEdRVk1GUjJEOF9QYnFLanQtOFFsaFp6TUstUC1ySGxweUtuaVRFa2wxZHZiRHFqNTBxdE1lRGJNU2Zuazg4RHFUZEpXQ1h4Qy1zNVlrY2FraUxhUTdjQQ?oc=5",
          "date": "08-19 15:30"
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
      "guide": {
        "definition": "뉴질랜드 폰테라(Fonterra) 중심 글로벌 유제품 경매 플랫폼(GDT) 전 품목 가중평균 지표",
        "correlation": "전 세계 유제품 실거래가의 기준 방향성 결정\n2주 단위 경매 체결 결과가 각국 수입 계약 단가에 즉각 반영",
        "factors": [
          "중국 내수 원유 재고 수준 및 수입 수요",
          "뉴질랜드·EU 주요 산지의 산유량 증감",
          "국제 유가 변동에 따른 글로벌 해상 운임"
        ]
      },
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
          "title": "Powders Drive GDT Index To Strongest Single-Event Lift Since March Amid Climate Concerns - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNEs2VXJqUmFjRnpITUw4TXpMRG1oVnVNTDJkblZmRk9FLVdLOFMwVVNEeWNBcndCb2txdHdvbE1mQURTckR0M0hKMnRDam5ZTFNJUzdmUkNkOWQ0OEZIWHRxOGxUSFZESFRiWE5mRFdMTUFWM2htc2tPcE9oTDB0ZkpLZTNUMGhOS1J0eDJMb1BlaWJUWWlxNHBKX2hqRW5YMzZ1d1E1Wm9XR0NKUjJEN2pLdkdCZw?oc=5",
          "date": "08-20 06:14"
        },
        {
          "title": "July 2026 Dairy Market Review: UK Milk Deliveries Fall, Global Production Rises - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOSFBGQWxvdG9vSEctNldPbDZyVm1JbWNmNWxySXFmWEVKQVVZVFN2LWt3cEZzUWYzXzVleHJhZlZRUlJfM0I1LTVYYUJTYjY1TDBaNjNIS2RyXzNrMDNFRk0tVXU1WWVuVGtSeVhQQklpMTg4WS1rckJMZENBVzItZS1VWTIyaU5MWmtYeExNdUNyLTVYdFE?oc=5",
          "date": "08-20 02:52"
        },
        {
          "title": "Dairy Trends: strong demand drives biggest GDT rise since March 19 August 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRTZkZFRKenNJaTB6VnVlMVJpdWgtUlE1b243Sm54eWRiV283dE9STlVCQWlubXd5eGZveEw3b3VpdWZvT01Pc3EyV1RiTXdtdnVKbUJTSmtwM0FDYWhTVEhDcTFfVUpfMmNTaGlpelRIeHZRWWdLOHhKZ2wxdWdnbGdfb2pfT0pDcDFFRy01TS1BQzFtMkdNbVc5TklYUGdNUVA5NU02Y3J4RFoydVNiYVNYbWRuVW03?oc=5",
          "date": "08-20 07:15"
        },
        {
          "title": "Global Dairy Trade | GlobalDairyTrade: Price Index Rises 2.3% in Auction 410 - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE02dXZ1aFZkVmJkdWF0dWV2N2FOTW9CSjFBY1VZMHZYa1NaSTk1LUJScGkwc0swM0JGdHZycWU5RTdXTTNUOFNEaEJuQjRrNEp6VHRJcFJKSENnT2JZdjNIR2JTNFNIV1BKOWZlc1ZR?oc=5",
          "date": "08-19 01:39"
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
          "title": "버터값 최고치…베이커리업계 직격탄 - 한국경제",
          "source": "한국경제",
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
      "guide": {
        "definition": "원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격",
        "correlation": "제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영",
        "factors": [
          "중국의 전지분유 수입 재개 및 수입량 추이",
          "뉴질랜드 목초지 기후 조건 및 원유 공급량",
          "글로벌 유제품 소비 트렌드"
        ]
      },
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
          "title": "Powders Drive GDT Index To Strongest Single-Event Lift Since March Amid Climate Concerns - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNEs2VXJqUmFjRnpITUw4TXpMRG1oVnVNTDJkblZmRk9FLVdLOFMwVVNEeWNBcndCb2txdHdvbE1mQURTckR0M0hKMnRDam5ZTFNJUzdmUkNkOWQ0OEZIWHRxOGxUSFZESFRiWE5mRFdMTUFWM2htc2tPcE9oTDB0ZkpLZTNUMGhOS1J0eDJMb1BlaWJUWWlxNHBKX2hqRW5YMzZ1d1E1Wm9XR0NKUjJEN2pLdkdCZw?oc=5",
          "date": "08-20 06:14"
        },
        {
          "title": "Fertilizer prices are expected to remain above pre-Iran war levels through 2028 - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOWWh5SWhHUzlMd3JncGlaUFY2eXVzUV9tZklwcmtqU0l0U0NqTUhVT21mZk9qeURCRXVJUEZVS3d6TEc5UjltOFF3YXl3NUNGbkVia084SVpWQl9HZlZVeVZPbkNXX05QX0h1ckJCaGVPc1lkdGE0c2JNM3YxMlJlRl9fbnZNMEV5UXBmY2VHMWRVT19OeE9XeVNNNW9VQ2taVFRjYnpmNEsyZ0FMZDhwaHljM2RTRDBNQ2huTHdTVGN4S2ZPdXJoVVAzUVcxdWRKcFZoRk5jUWxFV2FiZHc?oc=5",
          "date": "08-20 04:34"
        },
        {
          "title": "Dairy Trends: strong demand drives biggest GDT rise since March 19 August 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRTZkZFRKenNJaTB6VnVlMVJpdWgtUlE1b243Sm54eWRiV283dE9STlVCQWlubXd5eGZveEw3b3VpdWZvT01Pc3EyV1RiTXdtdnVKbUJTSmtwM0FDYWhTVEhDcTFfVUpfMmNTaGlpelRIeHZRWWdLOHhKZ2wxdWdnbGdfb2pfT0pDcDFFRy01TS1BQzFtMkdNbVc5TklYUGdNUVA5NU02Y3J4RFoydVNiYVNYbWRuVW03?oc=5",
          "date": "08-20 07:15"
        },
        {
          "title": "Dairy prices rally at latest auction as El Niño looms - NZ Herald",
          "source": "NZ Herald",
          "link": "https://news.google.com/rss/articles/CBMi6AFBVV95cUxOd1FtTTQwZzR2TWpaTGxhaDRuU19fWUFPUGFMTTlKSm1wdFJkeTZEX0duT0JGVXROTGFJOG15Z3hJazRZYVlnQThLOGFZN3pLclVhel9JR3p1N3dSek9jeWVPMGxEbUdzV1NhVkxOakt0S0JGMk1QWWhjLWJWUl80dVV3ejk2YkpySmZQMnhsUV9WU2lQUmNCY0hpVnFmRjg2R2YyWV84VUpNelZLdG0tUHJTT2Z2UHctVVZYcFlGZXduN2N5ZnBHa0dmX3ZscFJnVmpxZzZVWmFjOFZoTTI5YnRKVi1lSDMz?oc=5",
          "date": "08-19 09:02"
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
      "guide": {
        "definition": "원유에서 지방을 분리 제거 후 건조한 분말인 탈지분유 - GDT 경매 거래 가격",
        "correlation": "음료, 제과, 빙과류 제조 원가 지표\n버터 부산물로 버터 생산량과 밀접하게 연동",
        "factors": [
          "유럽 및 오세아니아 유가공 공장 가동률",
          "버터박(Buttermilk) 가공 비율 및 유청 단백질 수요",
          "식물성 대체 단백질 시장 가격 동향"
        ]
      },
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
          "title": "Dairy Trends: strong demand drives biggest GDT rise since March 19 August 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRTZkZFRKenNJaTB6VnVlMVJpdWgtUlE1b243Sm54eWRiV283dE9STlVCQWlubXd5eGZveEw3b3VpdWZvT01Pc3EyV1RiTXdtdnVKbUJTSmtwM0FDYWhTVEhDcTFfVUpfMmNTaGlpelRIeHZRWWdLOHhKZ2wxdWdnbGdfb2pfT0pDcDFFRy01TS1BQzFtMkdNbVc5TklYUGdNUVA5NU02Y3J4RFoydVNiYVNYbWRuVW03?oc=5",
          "date": "08-20 07:15"
        },
        {
          "title": "Powders Drive GDT Index To Strongest Single-Event Lift Since March Amid Climate Concerns - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNEs2VXJqUmFjRnpITUw4TXpMRG1oVnVNTDJkblZmRk9FLVdLOFMwVVNEeWNBcndCb2txdHdvbE1mQURTckR0M0hKMnRDam5ZTFNJUzdmUkNkOWQ0OEZIWHRxOGxUSFZESFRiWE5mRFdMTUFWM2htc2tPcE9oTDB0ZkpLZTNUMGhOS1J0eDJMb1BlaWJUWWlxNHBKX2hqRW5YMzZ1d1E1Wm9XR0NKUjJEN2pLdkdCZw?oc=5",
          "date": "08-20 06:14"
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
      "guide": {
        "definition": "유지방 80% 이상 유제품인 버터 - GDT 경매 거래 가격",
        "correlation": "베이커리·유가공 업체의 직수입 단가 벤치마크\n유지방 수급 불균형 시 단기 변동폭 확대",
        "factors": [
          "베이커리 성수기(연말 및 명절) 수요 집중",
          "계절별 원유 내 유지방(Fat) 함유율 변화",
          "식물성 대체 유지(팜유, 마가린 등)와의 가격차"
        ]
      },
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
          "title": "Nonfat dry milk jumps higher while butter slides in Wednesday CME dairy trade - Brownfield Ag News",
          "source": "Brownfield Ag News",
          "link": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNckRHbHF2bmJrbE5GZ1dkNVJyTjRHSTF0akhTTHBtV3FoR0hXTEdHSEJiNFF0RkwtaGdONEV0V0hkOElTTEFyZ3FjYTJ4cDRaNThILXBqY3gyaFJrRFdEdFZRVWF2NngzQ2RHa1FIc3JDb2hoenlycHd1WGlpOWpmdmtpS1RheFN5V19uSmtobFY2YlByR0RJeEwxX2M2ZEY4QlZSX2FZVG1YcVdCZXB6c0V5OG1xRWQ2U2tnMXpLWm4?oc=5",
          "date": "08-20 03:08"
        },
        {
          "title": "Powders Drive GDT Index To Strongest Single-Event Lift Since March Amid Climate Concerns - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNEs2VXJqUmFjRnpITUw4TXpMRG1oVnVNTDJkblZmRk9FLVdLOFMwVVNEeWNBcndCb2txdHdvbE1mQURTckR0M0hKMnRDam5ZTFNJUzdmUkNkOWQ0OEZIWHRxOGxUSFZESFRiWE5mRFdMTUFWM2htc2tPcE9oTDB0ZkpLZTNUMGhOS1J0eDJMb1BlaWJUWWlxNHBKX2hqRW5YMzZ1d1E1Wm9XR0NKUjJEN2pLdkdCZw?oc=5",
          "date": "08-20 06:14"
        },
        {
          "title": "Fertilizer prices are expected to remain above pre-Iran war levels through 2028 - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOWWh5SWhHUzlMd3JncGlaUFY2eXVzUV9tZklwcmtqU0l0U0NqTUhVT21mZk9qeURCRXVJUEZVS3d6TEc5UjltOFF3YXl3NUNGbkVia084SVpWQl9HZlZVeVZPbkNXX05QX0h1ckJCaGVPc1lkdGE0c2JNM3YxMlJlRl9fbnZNMEV5UXBmY2VHMWRVT19OeE9XeVNNNW9VQ2taVFRjYnpmNEsyZ0FMZDhwaHljM2RTRDBNQ2huTHdTVGN4S2ZPdXJoVVAzUVcxdWRKcFZoRk5jUWxFV2FiZHc?oc=5",
          "date": "08-20 04:34"
        },
        {
          "title": "Dairy Trends: strong demand drives biggest GDT rise since March 19 August 2026 Premium - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRTZkZFRKenNJaTB6VnVlMVJpdWgtUlE1b243Sm54eWRiV283dE9STlVCQWlubXd5eGZveEw3b3VpdWZvT01Pc3EyV1RiTXdtdnVKbUJTSmtwM0FDYWhTVEhDcTFfVUpfMmNTaGlpelRIeHZRWWdLOHhKZ2wxdWdnbGdfb2pfT0pDcDFFRy01TS1BQzFtMkdNbVc5TklYUGdNUVA5NU02Y3J4RFoydVNiYVNYbWRuVW03?oc=5",
          "date": "08-20 07:15"
        }
      ],
      "newsKr": [
        {
          "title": "버터값 최고치…베이커리업계 직격탄 - 한국경제",
          "source": "한국경제",
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
      "guide": {
        "definition": "인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격",
        "correlation": "가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동",
        "factors": [
          "인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제",
          "동남아 엘니뇨 가뭄에 따른 수확량 감소",
          "대체 식물성 유지인 대두유(Soybean Oil) 가격 추이"
        ]
      },
      "price": 1173.5,
      "change": 1.5,
      "changePercent": 0.13,
      "high52w": 1193.5,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "high7d": 1173.5,
      "low7d": 1157.0,
      "high1m": 1173.5,
      "low1m": 1122.5,
      "volume": 10,
      "sparkline": [
        1163.75,
        1157.0,
        1161.75,
        1162.0,
        1164.5,
        1172.0,
        1173.5
      ],
      "history": {
        "7D": [
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
          },
          {
            "date": "08-19",
            "price": 1173.5
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
          },
          {
            "date": "08-19",
            "price": 1173.5
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1166.46
          },
          {
            "time": "11:00",
            "price": 1168.81
          },
          {
            "time": "13:00",
            "price": 1171.15
          },
          {
            "time": "14:23",
            "price": 1173.5
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
            "price": 1172.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Palm Oil Prices Seen Holding Above RM4,600 as Supply Tightens, Genting Posts Profit Dip - finance.biggo.com",
          "source": "finance.biggo.com",
          "link": "https://news.google.com/rss/articles/CBMidkFVX3lxTE5tLUFSYV9Na2Z2dFp2SGFrVHFtQ3FNdE5GcnNLQnVVN3Z1bzFGeFlkb0xaMW0zRmFuRHdFSGNtU0w3NGsxdVpsTlBuQ01EUjJoRTJfb0pQaEktNDdLbUJtM2ZKdGdHdUEtNkNXbUw3NTN2NkVaSEE?oc=5",
          "date": "08-20 08:25"
        },
        {
          "title": "MPOC expects CPO prices to hold firm amid tight supply - The Star",
          "source": "The Star",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNME9RTFk0b2w5UG1ia3ZidldJNXpKMHVNRDEwNTE5UTkxLU9lN0tsUjJfam16WkdrcE13WG55UGVSZWhiVVJMb1hzek9rWGtBYnRLVXlWQXpHNkhKNXFiejZUQzVMbTR2VkdUWE85bHBuRWhYNUlBZzIzbEIxZTBsbzE1YjhqMmlwT21IeUN2Y3VmTF9xbWprV0RqdHdHWFY0ZVdGX0o0T052ZzVzSHhENS1pdnJWQQ?oc=5",
          "date": "08-20 08:04"
        },
        {
          "title": "Malaysian crude palm oil prices to stay above $1,133 per ton in September, MPOC says - marketscreener.com",
          "source": "marketscreener.com",
          "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxQUFNrdWxXRmZuWmxfLWZWYVJBalZxNHRuWHdFbTg0SllzZDZzRHp6WUZQenN6bFhna2hRc0kyaGsyWUdVTUJDam5KdXJRZExYOUpjMi1XWjZKcF9OMDdEYUtUMUZ6ZWkyM2thdUJIdjVQcHlVRXJuMUhfcHhBb0RXRGdZWEo4bTFMZ2hYTktMcTRiZTVaNnJ2SzFRaUU3Z2FfN0g3a1Q3cG1GYWhSanhhLV9VZi1yQ1pxV2VUSUxTLTRNUUFDZlFwWGJlSEN4NVo1?oc=5",
          "date": "08-19 10:20"
        },
        {
          "title": "CPO Prices To Remain Above RM4,600 In September On Tightening Supply, Geopolitical Disruptions -- MPOC - bernama.com",
          "source": "bernama.com",
          "link": "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBrczVTVC1JVldTSVpSdmJPVG1JZFNMSXpZclpRd05GZDJoMUt3TDlkQ29pbGVFYUdwdFFIX3dvOTRHemhZYklvLS04NTJsclJjWXJkaVF6cFo3OGFySnRIMHF1RlJKZw?oc=5",
          "date": "08-20 00:12"
        }
      ],
      "newsKr": [
        {
          "title": "밀가루·팜유에 용기까지 뛰었다…식품업계, 가격 인상 '궁여지책' - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMieEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1nc9IBeEFVX3lxTE9ETGFmQXdoenB4TWdidnpVX1pSQmtEd2EzTzdSU0Vydnp3Uy04eG1iWTRaOWtSVEhEU3BHT1M5czRLT2Jab2QwTDNVM2p0dWpDUnVQV3FLQmZtMGJ4eGZxV1Z2WFJpOFRlYjR2bTFUdjlqYlhkTy1ncw?oc=5",
          "date": "08-19 14:25"
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
      "guide": {
        "definition": "팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가",
        "correlation": "선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표",
        "factors": [
          "필리핀·인도네시아 코코넛 수확량 및 태풍 피해",
          "초콜릿 코팅용 대용유지(CBR/CBS) 수요",
          "화장품·계면활성제 등 비식품 화학 산업 수요"
        ]
      },
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
            "date": "08-14",
            "price": 1930.0
          },
          {
            "date": "08-15",
            "price": 1931.93
          },
          {
            "date": "08-16",
            "price": 1933.86
          },
          {
            "date": "08-17",
            "price": 1935.79
          },
          {
            "date": "08-18",
            "price": 1937.72
          },
          {
            "date": "08-19",
            "price": 1939.65
          },
          {
            "date": "08-20",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "07-22",
            "price": 1930.0
          },
          {
            "date": "07-23",
            "price": 1930.96
          },
          {
            "date": "07-24",
            "price": 1931.93
          },
          {
            "date": "07-25",
            "price": 1932.9
          },
          {
            "date": "07-26",
            "price": 1933.86
          },
          {
            "date": "07-27",
            "price": 1934.82
          },
          {
            "date": "07-28",
            "price": 1935.79
          },
          {
            "date": "07-29",
            "price": 1936.76
          },
          {
            "date": "07-30",
            "price": 1937.72
          },
          {
            "date": "07-31",
            "price": 1938.68
          },
          {
            "date": "08-01",
            "price": 1939.65
          },
          {
            "date": "08-02",
            "price": 1940.62
          },
          {
            "date": "08-03",
            "price": 1941.58
          },
          {
            "date": "08-04",
            "price": 1942.54
          },
          {
            "date": "08-05",
            "price": 1943.51
          },
          {
            "date": "08-06",
            "price": 1944.48
          },
          {
            "date": "08-07",
            "price": 1945.44
          },
          {
            "date": "08-08",
            "price": 1946.4
          },
          {
            "date": "08-09",
            "price": 1947.37
          },
          {
            "date": "08-10",
            "price": 1948.34
          },
          {
            "date": "08-11",
            "price": 1949.3
          },
          {
            "date": "08-12",
            "price": 1950.26
          },
          {
            "date": "08-13",
            "price": 1951.23
          },
          {
            "date": "08-14",
            "price": 1952.2
          },
          {
            "date": "08-15",
            "price": 1953.16
          },
          {
            "date": "08-16",
            "price": 1954.12
          },
          {
            "date": "08-17",
            "price": 1955.09
          },
          {
            "date": "08-18",
            "price": 1956.06
          },
          {
            "date": "08-19",
            "price": 1957.02
          },
          {
            "date": "08-20",
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
            "time": "14:23",
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
          "title": "Vegetable Oils in Beauty and Personal Care Market Size, Share, Growth Drivers, Latest Trends, Leading Companies, and Forecast – 2031 - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMi_gFBVV95cUxQX3ZGS2RtcVhVa0tQMHFUcVhTdEktODRvdVJ6UWNrdlhQenkwY2F3SmdSNDMwVmRFN2hRUkVybXliQXI4U3FXVEh5OHB0Yml2ZzVGMnVobEJnMEM5NWY1anM3XzA0WVBKTXllR2RrSDVHVTR6UkhLR3A3ZWQyQm4ySDRTMWw5QWhTM2xvdlMzZWdPNWg3U2NGSU1oQnpqMkdWd2ItdlBxTFo1eFdobTBMUXdHbG1Jdkp4RWpmMndESWduM0h1MS1xbTFLdXFUbXM1djB2cUUyQU9BQjdKMVpFUnRrU1pVT1BtRTFWTFE1REhBQkptWjB0d3Y2MXJLdw?oc=5",
          "date": "08-18 03:40"
        },
        {
          "title": "Clean Beauty Drives Growth in Vegetable Oils - Happi | Household And Personal Products Industry",
          "source": "Happi | Household And Personal Products Industry",
          "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNdW1NcW9Bb1BEYXZsbERkaFpSeWt5V1JVVmF2dERFbDdIdUowZ1dlb0c3VU45Z3FXWVBDQS1aV3pVbmVreVYwMkJSZVFjWDZvdTBHY2NNT1Z1dHg0MlRwYUJ6WVF2czROQmM5S01icnlaTGtaeWwtbFFKUU14VXI2Y3pQTTg1Nk1obzlRam5XR0FWQWl2bW9vbEx3QUYtOGlBTTRXYVBYZlBsQ0lveHZUQw?oc=5",
          "date": "08-19 16:00"
        },
        {
          "title": "India’s Sodium Coco Sulphate Prices Strengthen in July on Tight Inventories and Firm Demand - ChemAnalyst",
          "source": "ChemAnalyst",
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
      "guide": {
        "definition": "서울 외환시장 기준 미국 달러 대비 대한민국 원화 교환 비율",
        "correlation": "외환 선물/NDF 시장 흐름이 현물 환율에 실시간 반영\n달러 결제 수입 원자재의 원화 환산 매입 원가 최종 결정",
        "factors": [
          "미국 연방준비제도(Fed) 기준금리 정책 방향",
          "국내 수출입 무역수지 및 외국인 자본 유출입",
          "지정학적 리스크에 따른 글로벌 안전자산 선호 심리"
        ]
      },
      "price": 1393.48,
      "change": -20.1,
      "changePercent": -1.42,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1395.08,
      "low24h": 1384.07,
      "high7d": 1416.85,
      "low7d": 1393.48,
      "high1m": 1487.39,
      "low1m": 1393.48,
      "volume": 0,
      "sparkline": [
        1412.18,
        1416.46,
        1416.85,
        1415.37,
        1414.73,
        1413.58,
        1393.48
      ],
      "history": {
        "7D": [
          {
            "date": "08-11",
            "price": 1412.18
          },
          {
            "date": "08-12",
            "price": 1416.46
          },
          {
            "date": "08-13",
            "price": 1416.85
          },
          {
            "date": "08-16",
            "price": 1415.37
          },
          {
            "date": "08-17",
            "price": 1414.73
          },
          {
            "date": "08-18",
            "price": 1413.58
          },
          {
            "date": "08-20",
            "price": 1393.48
          }
        ],
        "1M": [
          {
            "date": "07-19",
            "price": 1487.39
          },
          {
            "date": "07-20",
            "price": 1475.01
          },
          {
            "date": "07-21",
            "price": 1479.72
          },
          {
            "date": "07-22",
            "price": 1475.63
          },
          {
            "date": "07-23",
            "price": 1474.04
          },
          {
            "date": "07-26",
            "price": 1458.01
          },
          {
            "date": "07-27",
            "price": 1464.44
          },
          {
            "date": "07-28",
            "price": 1453.16
          },
          {
            "date": "07-29",
            "price": 1442.28
          },
          {
            "date": "07-30",
            "price": 1420.6
          },
          {
            "date": "08-02",
            "price": 1435.7
          },
          {
            "date": "08-03",
            "price": 1428.5
          },
          {
            "date": "08-04",
            "price": 1428.43
          },
          {
            "date": "08-05",
            "price": 1421.16
          },
          {
            "date": "08-06",
            "price": 1422.3
          },
          {
            "date": "08-09",
            "price": 1407.0
          },
          {
            "date": "08-10",
            "price": 1417.31
          },
          {
            "date": "08-11",
            "price": 1412.18
          },
          {
            "date": "08-12",
            "price": 1416.46
          },
          {
            "date": "08-13",
            "price": 1416.85
          },
          {
            "date": "08-16",
            "price": 1415.37
          },
          {
            "date": "08-17",
            "price": 1414.73
          },
          {
            "date": "08-18",
            "price": 1413.58
          },
          {
            "date": "08-20",
            "price": 1393.48
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1385.12
          },
          {
            "time": "11:00",
            "price": 1387.91
          },
          {
            "time": "13:00",
            "price": 1390.69
          },
          {
            "time": "14:23",
            "price": 1393.48
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1399.33
          },
          {
            "date": "2025-09",
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
            "date": "2026-03",
            "price": 1487.38
          },
          {
            "date": "2026-04",
            "price": 1505.96
          },
          {
            "date": "2026-05",
            "price": 1541.73
          },
          {
            "date": "2026-06",
            "price": 1420.6
          },
          {
            "date": "2026-07",
            "price": 1413.58
          },
          {
            "date": "2026-08",
            "price": 1393.48
          }
        ]
      },
      "newsEn": [
        {
          "title": "USD-KRW Exchange Rate Drops to 1,300s for First Time in 11 Months...Can It Stabilize? - 아시아경제",
          "source": "아시아경제",
          "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPSEpiajdhUmZJSUotenJzcWFkejVVZEg1bHRaQUtVemh4Z3g5V3JTY1NkX1pBX3JDQk03aEYzMmxlZ2swMEM0Zl82NlMxbmIzbmpNYnF1ZTExSW9UTXdnandkeVN6aUUxWndIME01WG03NXpnNVdOREJNaW1xQS1fZWRFQ25XZ3NTQXVqVW9PQQ?oc=5",
          "date": "08-20 11:25"
        },
        {
          "title": "Dollar hits three-month low as Treasury buybacks sink yields; Fed flags inflation - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNOFY4dFd1VHc1SnY5WHAzQmlvdG92NnVhV0JrNEFFWDhrUnZsQU4xQ3ZkZ0d5c2lFelU4dXAxZEs5QXlwY1RxVVNIYWJpQkoyWUFMdFNxVzlzd0ZqTExfUFZpakpkRnIwWTk1ZDlhSjNKUFVGM2lZY2pxN2lUWlBqYURtbkdQYmtOcExCb05rQXpITEIyVEJ2NHVhUzFCeEd3VmRrYXlyZ1hBZkgxVld0dXowcmw?oc=5",
          "date": "08-20 05:44"
        },
        {
          "title": "South Korean Won Hits Over 10-Month High - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPOWNJUFZaeWtiRmM1eXNSWEVGR3BXR3ZsRUdrWGp0cWJMMU80Yi1LQ3pFbUNTTDhaQ2NwOGNiWjRjSURIVF9ySzg1RERTdU5wRHdwYW5YNjZOU2RHVHBWc1BOQnJLLXQ0ZHhiVjZoMUpXVWtqV0hkTUtGMjJ1VXZmY0R1ZGEtcUwtQmNFTjdHQjhtUEtSd0E?oc=5",
          "date": "08-19 12:28"
        },
        {
          "title": "Won and yen: 2 currencies, 2 very different problems - Nikkei Asia",
          "source": "Nikkei Asia",
          "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPMkdFNDZTUWlfSDNleFlMcTVaX3pGWHY4aHdiYmV0RmVCNDEwOEY2dkFpd3RsMXkyWDdNeF9aWTJuMDBzYno5QXJyUFJOajdnaE9MM3lueFoySWNTUXVzSzFKN1dHdW1HVlZSQnh3M3l5M1VGclF5MU9udGZWQlIxTGxUYWYza2hGQ1E?oc=5",
          "date": "08-18 05:05"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 역내 수출 네고와 미 달러 약세에 환율 급락 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1sX3VTbEtLNU1wSFFvc3ZhSWFEcWlJaG5GcVE3ZXRsN2pVUHJ2M2NXLVU4UGJYclM5dHpkVTQzUUZVZnpSVlhiUGk3ZTdnOGJSY2hBY2RBVEFVQmFSR3l4SA?oc=5",
          "date": "08-20 10:57"
        },
        {
          "title": "한투증권, 하반기 원/달러 평균 환율 1,420원 전망…50원 내려 - 연합뉴스",
          "source": "연합뉴스",
          "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE85c0k0clF0aFdXT3FITlFNeGwwNjU4bzJUWkY3c2lzNjZDVm5kTHkzN20xbmhDMGExRnBfWDd1VFdJSjZNc2FGbXFwRjBSY0tEVHVoN0NqR0diNEXSAWBBVV95cUxPaXA2Tkl1N3dZMUIyOUdTNXVHcmVFaWdIZDZWeS04UU5zdWZ2WFpJYWFNYzB2Ym5TT2RJVFNHbm80SDBQX0NVd2E4ZWlUN2ZvNWN6dlBrSndYOUhIeElvTm8?oc=5",
          "date": "08-20 08:13"
        },
        {
          "title": "한투證, 하반기 달러-원 전망 50원 낮춰…연말 레인지 1,340~1,520원 - 연합인포맥스",
          "source": "연합인포맥스",
          "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTE9BMHMzWl9BX1czSWkzWmdNTS03NmdPUUJUa3VUbFAxVklYSWRyZnJ0aXRWOHIyaWdMS1hNb3VOMWdsbHIxN1o4UG5MR1ZmNTlhdkxJN3dINjE1T2o1RUJxQnFlQ0FZTUdkd3ZPSFJ5cmVGd2Vr0gF0QVVfeXFMT0EwczNaX0FfVzNJaTNaZ01NLTc2Z09RQlRrdVRsUDFWSVhJZHJmcnRpdFY4cjJpZ0xLWE1vdU4xZ2xscjE3WjhQbkxHVmY1OWF2TEk3d0g2MTVPajVFQnFCcWVDQVlNR2R3dk9IUnlyZUZ3ZWs?oc=5",
          "date": "08-20 10:57"
        },
        {
          "title": "\"환율 더 떨어진다\" 한투, 하반기 달러·원 전망 1470→1420원 - v.daum.net",
          "source": "v.daum.net",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE9nQ09zYlNQcVNqOXYzQnJncUdCYzZJRjA5Vm56N1hvc0RnZnFMalNhRHdfaC1ZS2ZyUENYTXExVFpYVUFBOW1ZMU96RXdJYUxjUV90cQ?oc=5",
          "date": "08-20 08:15"
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
      "guide": {
        "definition": "유럽연합 유로화 대비 대한민국 원화 교환 비율",
        "correlation": "글로벌 외환시장(EUR/USD)과 서울 외환시장(USD/KRW) 교차 환율(Cross Rate)로 산출\n유럽산 유제품, 완제품 초콜릿, 가공설비 수입 시 직접 원가 연동",
        "factors": [
          "유럽중앙은행(ECB) 통화 정책 및 금리차",
          "유로존 주요국 경제 성장률 지표",
          "달러화 강세/약세에 따른 EUR/USD 역방향 변동"
        ]
      },
      "price": 1626.0,
      "change": -8.92,
      "changePercent": -0.55,
      "high52w": 1807.42,
      "low52w": 1582.09,
      "high24h": 1628.4,
      "low24h": 1616.4,
      "high7d": 1638.16,
      "low7d": 1582.09,
      "high1m": 1700.58,
      "low1m": 1582.09,
      "volume": 0,
      "sparkline": [
        1628.62,
        1632.86,
        1634.19,
        1582.09,
        1638.16,
        1634.92,
        1626.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-11",
            "price": 1628.62
          },
          {
            "date": "08-12",
            "price": 1632.86
          },
          {
            "date": "08-13",
            "price": 1634.19
          },
          {
            "date": "08-16",
            "price": 1582.09
          },
          {
            "date": "08-17",
            "price": 1638.16
          },
          {
            "date": "08-18",
            "price": 1634.92
          },
          {
            "date": "08-20",
            "price": 1626.0
          }
        ],
        "1M": [
          {
            "date": "07-19",
            "price": 1700.58
          },
          {
            "date": "07-20",
            "price": 1683.36
          },
          {
            "date": "07-21",
            "price": 1687.03
          },
          {
            "date": "07-22",
            "price": 1683.6
          },
          {
            "date": "07-23",
            "price": 1676.49
          },
          {
            "date": "07-26",
            "price": 1657.74
          },
          {
            "date": "07-27",
            "price": 1665.16
          },
          {
            "date": "07-28",
            "price": 1654.43
          },
          {
            "date": "07-29",
            "price": 1652.79
          },
          {
            "date": "07-30",
            "price": 1636.68
          },
          {
            "date": "08-02",
            "price": 1663.51
          },
          {
            "date": "08-03",
            "price": 1643.36
          },
          {
            "date": "08-04",
            "price": 1647.17
          },
          {
            "date": "08-05",
            "price": 1642.01
          },
          {
            "date": "08-06",
            "price": 1638.82
          },
          {
            "date": "08-09",
            "price": 1618.62
          },
          {
            "date": "08-10",
            "price": 1635.36
          },
          {
            "date": "08-11",
            "price": 1628.62
          },
          {
            "date": "08-12",
            "price": 1632.86
          },
          {
            "date": "08-13",
            "price": 1634.19
          },
          {
            "date": "08-16",
            "price": 1582.09
          },
          {
            "date": "08-17",
            "price": 1638.16
          },
          {
            "date": "08-18",
            "price": 1634.92
          },
          {
            "date": "08-20",
            "price": 1626.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1616.24
          },
          {
            "time": "11:00",
            "price": 1619.5
          },
          {
            "time": "13:00",
            "price": 1622.75
          },
          {
            "time": "14:23",
            "price": 1626.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1640.49
          },
          {
            "date": "2025-09",
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
            "date": "2026-03",
            "price": 1736.6
          },
          {
            "date": "2026-04",
            "price": 1755.9
          },
          {
            "date": "2026-05",
            "price": 1760.27
          },
          {
            "date": "2026-06",
            "price": 1636.68
          },
          {
            "date": "2026-07",
            "price": 1634.92
          },
          {
            "date": "2026-08",
            "price": 1626.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Dollar hits three-month low as Treasury buybacks sink yields; Fed flags inflation - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNOFY4dFd1VHc1SnY5WHAzQmlvdG92NnVhV0JrNEFFWDhrUnZsQU4xQ3ZkZ0d5c2lFelU4dXAxZEs5QXlwY1RxVVNIYWJpQkoyWUFMdFNxVzlzd0ZqTExfUFZpakpkRnIwWTk1ZDlhSjNKUFVGM2lZY2pxN2lUWlBqYURtbkdQYmtOcExCb05rQXpITEIyVEJ2NHVhUzFCeEd3VmRrYXlyZ1hBZkgxVld0dXowcmw?oc=5",
          "date": "08-20 05:44"
        },
        {
          "title": "Euro and pound probe multi-month highs while Yen hovers near 160 zone - Investing.com UK",
          "source": "Investing.com UK",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPdnNjWTJNRTdvM2pRUUNkMjQ2aXBkNm03anFpc2dZME9JWUktUFhwWnNlTG1TT0xSMy1zYlh1Q1hNLTExLUEzUjNwY281OWpDN3NNWVk2YVd4X3c0c1g4SUsyUFJhSkxBalNvclhZd2NxYnR1VGJMV05OdEdqSC1jY0hNLUlzUzNiTW9FX2dNUkEzSHBwV3Z1TE1UUFF6Sjh6VnlqeWIzT3hNLXNmQTI5UkhpOA?oc=5",
          "date": "08-19 13:50"
        },
        {
          "title": "Azerbaijani currency to world currency rates for August 19 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFAtUkFRZ3A5RVRWbDExQk9zQy1WeWdxM1IyY0VWazdPUVNsSkVzSHJaVW1LRXlDWG9hdUdJT1QxMTBzNHdxdk1zRTZ6SUdyWmw4Y21XZg?oc=5",
          "date": "08-19 14:34"
        },
        {
          "title": "CBA currency exchange rates (19.08.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTFB0ZTVSMWE0R2VlZmtwOVlkdUxmeGJxU3Z3bEdtR3FQeVdFMm5vV3hkZU1hSklrY0ZsemhDaTVkZVM5clBLcnp2SS02T25HbDJQVHhhRTlaZGFibjBNSDBRaTFxNnpRUW9ETXYtRk1MT1FmUjdxSHlvQ3NBQdIBe0FVX3lxTFB0ZTVSMWE0R2VlZmtwOVlkdUxmeGJxU3Z3bEdtR3FQeVdFMm5vV3hkZU1hSklrY0ZsemhDaTVkZVM5clBLcnp2SS02T25HbDJQVHhhRTlaZGFibjBNSDBRaTFxNnpRUW9ETXYtRk1MT1FmUjdxSHlvQ3NBQQ?oc=5",
          "date": "08-19 15:00"
        }
      ],
      "newsKr": [
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "08-19 20:33"
        },
        {
          "title": "[포커스] 최근 환율 하락 원인과 향후 전망 - CEONEWS",
          "source": "CEONEWS",
          "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE5yRmpmNWdLZG9NeGVPZUhEc2lsdjNkek5ydS1UUWV6RUg1UkdlUmJxa3J0SkVoZGdTZEZLeWFhMFR4ZWsxWFBjaFVDN0NzUlpUM0xYVzBtZWFXWnctVmY0?oc=5",
          "date": "08-20 12:54"
        },
        {
          "title": "원·달러, 11개월 만에 1300원대 '뚝'…증권가가 꼽은 수혜주는 - 뉴시스",
          "source": "뉴시스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE9zUkc2dHRqUUVTbm9RUG9XdUkyZUYtTTF3NzNLRm1DdHJ5OG4zYUdtZ3dfWG1KeGpqRFNyVWtJR3JTQy1qMmtHeWZvM3hnQ3lieFRQZDFURDBsQURMa2VRUdIBeEFVX3lxTE03b0F3WVhvdWxQQzE4bjFaMVF1Yld0cGtuM21DSWtHRUwwdzJSa2xGd0M3cTQtWUx2UmhDWnBoVjEzQndTRnJvdmFEeG5jWEQ2dS10djUzWnc3YlNRcDQxTWNPaUh1QVU4OHFoVUhhckx3bkIwa3EweQ?oc=5",
          "date": "08-20 11:18"
        },
        {
          "title": "달러 환율 하락 | 어느새 1,300원대를 앞두고 있어요 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiZkFVX3lxTE9VTmMwNFJsSlk3SlFBTW80MmtMdnRDaVpQQzJabG5iYUlUcWgxYzJMcXpzeGhBdkgxQ0dZRk5qYWJmTVZ0VDFOLU41cjFrcFBXYk95VDFhZXYyQm13Z3FWV3J6YnpFdw?oc=5",
          "date": "08-18 08:00"
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
  
  // Fixed priority order for all 9 commodities: 1) Cocoa/Coffee -> 2) Dairy -> 3) Oils
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
  // Include ALL commodities in the weekly price list (no exclusion)
  const allCommodities = [...commodityItems].sort((a, b) => (FIXED_ORDER[a.id] || 99) - (FIXED_ORDER[b.id] || 99));

  const formatDaily = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    const pctVal = it.changePercent || 0;
    const sign = pctVal > 0 ? '▲' : (pctVal < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(pctVal).toFixed(2)}%)`;
  };

  const now = new Date();
  const dayNr = (now.getDay() + 6) % 7;
  const curMonday = new Date(now);
  curMonday.setDate(now.getDate() - dayNr);
  const prevMonday = new Date(curMonday);
  prevMonday.setDate(curMonday.getDate() - 7);

  const formatMD = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const formatYMD = (d) => `${d.getFullYear()}-${formatMD(d)}`;

  const findWeekPrice = (it, mondayDate) => {
    const allH = (it.history && it.history['1M']) || (it.history && it.history['7D']) || [];
    for (let offset = 0; offset < 5; offset++) {
      const target = new Date(mondayDate);
      target.setDate(mondayDate.getDate() + offset);
      const md = formatMD(target);
      const ymd = formatYMD(target);
      const entry = allH.find(h => h.date === md || h.date === ymd || (h.date && String(h.date).endsWith(md)));
      if (entry && entry.price) return entry.price;
    }
    return null;
  };

  const formatWeekly = (it) => {
    if (!it) return '';
    const cleanName = it.nameKr.split('(')[0].trim();
    const priceStr = it.currency === 'USD' ? `$${it.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}` : `${it.price.toLocaleString('ko-KR')}원`;
    
    let curP = findWeekPrice(it, curMonday);
    let prevP = findWeekPrice(it, prevMonday);

    if (it.id.startsWith('gdt') || it.category === 'dairy') {
      const allH = ((it.history && it.history['1M']) || (it.history && it.history['7D']) || []).filter(x => x.price);
      if (allH.length >= 2) {
        curP = allH[allH.length - 1].price;
        prevP = allH[allH.length - 2].price;
      }
    }

    if (!curP) curP = it.price;
    if (!prevP) {
      const history7d = it.history && it.history['7D'] ? it.history['7D'] : [];
      const sparkline = it.sparkline || [];
      if (history7d.length >= 2) prevP = history7d[0].price;
      else if (sparkline.length >= 2) prevP = sparkline[0];
      else prevP = it.price;
    }
    
    let wPct = it.changePercent || 0;
    if (prevP && prevP > 0) {
      wPct = ((curP - prevP) / prevP) * 100;
    }
    const sign = wPct > 0 ? '▲' : (wPct < 0 ? '▼' : '');
    return `${cleanName} : ${priceStr} (${sign}${Math.abs(wPct).toFixed(2)}%)`;
  };

  const year = now.getFullYear();
  
  // Calculate ISO week number
  const target = new Date(now.valueOf());
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);

  const curFri = new Date(curMonday);
  curFri.setDate(curMonday.getDate() + 4);
  const fmtD = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const weekDateRange = `${fmtD(curMonday)} ~ ${fmtD(curFri)}`;

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

  // Top 1 curated news across all items
  let newsTitle = '글로벌 원자재 공급망 및 주요 품목 시세 동향';
  const newsItem = allCommodities.find(it => it.newsKr && it.newsKr.length > 0) || allCommodities.find(it => it.newsEn && it.newsEn.length > 0);
  if (newsItem) {
    const rawN = (newsItem.newsKr && newsItem.newsKr[0]) || (newsItem.newsEn && newsItem.newsEn[0]);
    if (rawN && rawN.title) {
      const rawTitle = rawN.title;
      const dashIdx = Math.max(rawTitle.lastIndexOf(' - '), rawTitle.lastIndexOf(' – '));
      newsTitle = dashIdx > 10 ? rawTitle.substring(0, dashIdx).trim() : rawTitle.trim();
    }
  }

  return {
    title: `[${year} Week ${weekNumber} Report]`,
    week_number: weekNumber,
    week_date_range: weekDateRange,
    weekly_price_title: `[W${weekNumber} 주요품목가격]`,
    date: dateStr,
    report_date: reportDateStr,
    top_gainer: formatDaily(gainer),
    top_loser: formatDaily(loser),
    weekly_price_list: allCommodities.map(it => formatWeekly(it)),
    fx_usd: `${usdPrice.toLocaleString('ko-KR')}원 (${usdSign}${Math.abs(usdChg).toLocaleString('ko-KR')}원)`,
    fx_eur: `${eurPrice.toLocaleString('ko-KR')}원 (${eurSign}${Math.abs(eurChg).toLocaleString('ko-KR')}원)`,
    news_category: '오늘의 주요 헤드라인',
    news_title: newsTitle
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
  
  // Calculate week date range (Monday to Friday)
  const dayNr = (now.getDay() + 6) % 7;
  const curMon = new Date(now);
  curMon.setDate(now.getDate() - dayNr);
  const curFri = new Date(curMon);
  curFri.setDate(curMon.getDate() + 4);
  const fmtD = (d) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const weekDateRange = b.week_date_range || `${fmtD(curMon)} ~ ${fmtD(curFri)}`;

  const priceLines = b.weekly_price_list || b.other_commodities || [];
  const listArray = Array.isArray(priceLines) ? priceLines : String(priceLines).split('\n').filter(Boolean);
  const weeklyPriceHtml = listArray.map(line => `<div class="pulse-cow-other-line">${line}</div>`).join('');

  const dateStr = b.date || `${currentYear}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const reportDateStr = b.report_date || `${dateStr}, ${hours}:${minutes}`;

  bubble.innerHTML = `
    <div class="pulse-cow-header">
      <div class="pulse-cow-title">
        <span>${reportTitle}</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="리포트 기간 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">${weekDateRange}</span>
        </span>
      </div>
      <button class="pulse-cow-close" id="closePulseCowBtn" title="닫기" type="button">&times;</button>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">
        <span>[일일 원자재 동향]</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="일일 원자재 동향 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">전일 대비 최대 상승 및 하락 품목</span>
        </span>
      </div>
      <div class="pulse-cow-item gainer">
        <span>당일 급등 : ${b.top_gainer}</span>
      </div>
      <div class="pulse-cow-item loser">
        <span>당일 급락 : ${b.top_loser}</span>
      </div>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">
        <span>${weeklyPriceTitle}</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="주간 주요품목가격 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">주간 가격 변동률 (해당 주차 월요일 vs 직전 주 월요일 종가)</span>
        </span>
      </div>
      <div class="pulse-cow-other-list">
        ${weeklyPriceHtml}
      </div>
    </div>

    <div class="pulse-cow-section">
      <div class="pulse-cow-section-title">
        <span>[일일 환율]</span>
        <span class="cow-tooltip-wrap">
          <button type="button" class="cow-info-btn" aria-label="일일 환율 안내" tabindex="0">?</button>
          <span class="cow-tooltip-box">서울 외환시장 마감 기준 전일 대비 환율 변동액</span>
        </span>
      </div>
      <div class="pulse-cow-item">
        <span>USD/KRW : ${b.fx_usd}</span>
      </div>
      <div class="pulse-cow-item">
        <span>EUR/KRW : ${b.fx_eur}</span>
      </div>
    </div>

    <div class="pulse-cow-section" style="margin-bottom:0;">
      <div class="pulse-cow-section-title">
        <span>[오늘의 주요 헤드라인]</span>
      </div>
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

[오늘의 주요 헤드라인]
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

function stripTrailingDots(text) {
  if (!text) return '';
  return text
    .split('\n')
    .map(line => line.trim().replace(/\.+$/, ''))
    .join('\n');
}

const COMMODITY_GUIDE_DATA = {
  'cocoa': {
    definition: '코트디부아르·가나 등 서아프리카산 카카오두 기준, 미국 ICE 거래소 선물 가격',
    correlation: '글로벌 가공사·제과업체의 원료 매입 단가 기준\n선물 급등 시 6개월~1년 시차를 두고 수입 현물가 및 제품가에 직접 반영',
    factors: [
      '서아프리카 가뭄 및 병충해(CSSVD) 발생 여부',
      '코트디부아르·가나 정부의 수매가(LID) 정책',
      '글로벌 가공업체 분쇄량(Grindings) 지표 및 완제품 소비 수요'
    ]
  },
  'arabica': {
    definition: '브라질·콜롬비아 등 고지대 생산 스페셜티·원두커피용 품종, 미국 ICE 거래소 선물 가격',
    correlation: '국제 원두 거래의 핵심 벤치마크\n수입 현물가는 선물 가격에 산지 프리미엄(Diff) 합산하여 결정',
    factors: [
      '브라질 개화기 가뭄 및 결빙(서리) 피해',
      '브라질 헤알화 환율 변동에 따른 농가 출하량 조절',
      '유럽 삼림벌채방지법(EUDR) 등 글로벌 규제 이슈'
    ]
  },
  'robusta': {
    definition: '베트남·인도네시아 등 저지대 생산 인스턴트·에스프레소용 품종, 런던 ICE Europe 선물 가격',
    correlation: '글로벌 인스턴트 커피 및 캔커피 제조사의 원가 기준\n직관성 확보를 위해 아라비카(¢/lb)와 달리 톤당 달러($/MT)로 환산 표기\n아라비카 가격 급등 시 대체재 수요 증가로 연동성 강화',
    factors: [
      '최대 생산국 베트남 기후(가뭄 및 우기 강우량)',
      '산지 농가의 재고 비축 및 출하 속도',
      '수에즈 운하 등 주요 해상 항로 물류 차질'
    ]
  },
  'gdt-index': {
    definition: '뉴질랜드 폰테라(Fonterra) 중심 글로벌 유제품 경매 플랫폼(GDT) 전 품목 가중평균 지표',
    correlation: '전 세계 유제품 실거래가의 기준 방향성 결정\n2주 단위 경매 체결 결과가 각국 수입 계약 단가에 즉각 반영',
    factors: [
      '중국 내수 원유 재고 수준 및 수입 수요',
      '뉴질랜드·EU 주요 산지의 산유량 증감',
      '국제 유가 변동에 따른 글로벌 해상 운임'
    ]
  },
  'gdt-milk': {
    definition: '원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격',
    correlation: '제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영',
    factors: [
      '중국의 전지분유 수입 재개 및 수입량 추이',
      '뉴질랜드 목초지 기후 조건 및 원유 공급량',
      '글로벌 유제품 소비 트렌드'
    ]
  },
  'gdt-wmp': {
    definition: '원유에서 수분만 제거한 유지방 함유 분말인 전지분유 - GDT 경매 거래 가격',
    correlation: '제과·제빵 및 조제분유 수입 현물 계약의 직접적 기준 가격\n국제 유제품 유통 시장 수급 상황 신속 반영',
    factors: [
      '중국의 전지분유 수입 재개 및 수입량 추이',
      '뉴질랜드 목초지 기후 조건 및 원유 공급량',
      '글로벌 유제품 소비 트렌드'
    ]
  },
  'gdt-smp': {
    definition: '원유에서 지방을 분리 제거 후 건조한 분말인 탈지분유 - GDT 경매 거래 가격',
    correlation: '음료, 제과, 빙과류 제조 원가 지표\n버터 부산물로 버터 생산량과 밀접하게 연동',
    factors: [
      '유럽 및 오세아니아 유가공 공장 가동률',
      '버터박(Buttermilk) 가공 비율 및 유청 단백질 수요',
      '식물성 대체 단백질 시장 가격 동향'
    ]
  },
  'gdt-butter': {
    definition: '유지방 80% 이상 유제품인 버터 - GDT 경매 거래 가격',
    correlation: '베이커리·유가공 업체의 직수입 단가 벤치마크\n유지방 수급 불균형 시 단기 변동폭 확대',
    factors: [
      '베이커리 성수기(연말 및 명절) 수요 집중',
      '계절별 원유 내 유지방(Fat) 함유율 변화',
      '식물성 대체 유지(팜유, 마가린 등)와의 가격차'
    ]
  },
  'palm': {
    definition: '인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격',
    correlation: '가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동',
    factors: [
      '인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제',
      '동남아 엘니뇨 가뭄에 따른 수확량 감소',
      '대체 식물성 유지인 대두유(Soybean Oil) 가격 추이'
    ]
  },
  'cpo': {
    definition: '인도네시아·말레이시아산 기름야자 열매 추출 식물성 유지, 말레이시아(BMD)/미국 CME 선물 가격',
    correlation: '가공식품·제과·바이오디젤의 핵심 원가 지표\n실제 수입 시 FOB/CIF 현물 가격과 즉각 연동',
    factors: [
      '인도네시아 바이오디젤 의무 혼합 비율(B35/B40) 및 수출 규제',
      '동남아 엘니뇨 가뭄에 따른 수확량 감소',
      '대체 식물성 유지인 대두유(Soybean Oil) 가격 추이'
    ]
  },
  'lauric-oil': {
    definition: '팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가',
    correlation: '선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표',
    factors: [
      '필리핀·인도네시아 코코넛 수확량 및 태풍 피해',
      '초콜릿 코팅용 대용유지(CBR/CBS) 수요',
      '화장품·계면활성제 등 비식품 화학 산업 수요'
    ]
  },
  'lauric': {
    definition: '팜핵유(CPKO) 및 야자유 등 라우르산 함유 특수 식물성 유지의 로테르담/아시아 현물가',
    correlation: '선물 시장 부재로 로테르담 공시 현물가가 글로벌 수입 계약 기준\n가공식품 및 화학 유지류 수입 시 단가 산정의 직접 지표',
    factors: [
      '필리핀·인도네시아 코코넛 수확량 및 태풍 피해',
      '초콜릿 코팅용 대용유지(CBR/CBS) 수요',
      '화장품·계면활성제 등 비식품 화학 산업 수요'
    ]
  },
  'usd-krw': {
    definition: '서울 외환시장 기준 미국 달러 대비 대한민국 원화 교환 비율',
    correlation: '외환 선물/NDF 시장 흐름이 현물 환율에 실시간 반영\n달러 결제 수입 원자재의 원화 환산 매입 원가 최종 결정',
    factors: [
      '미국 연방준비제도(Fed) 기준금리 정책 방향',
      '국내 수출입 무역수지 및 외국인 자본 유출입',
      '지정학적 리스크에 따른 글로벌 안전자산 선호 심리'
    ]
  },
  'eur-krw': {
    definition: '유럽연합 유로화 대비 대한민국 원화 교환 비율',
    correlation: '글로벌 외환시장(EUR/USD)과 서울 외환시장(USD/KRW) 교차 환율(Cross Rate)로 산출\n유럽산 유제품, 완제품 초콜릿, 가공설비 수입 시 직접 원가 연동',
    factors: [
      '유럽중앙은행(ECB) 통화 정책 및 금리차',
      '유로존 주요국 경제 성장률 지표',
      '달러화 강세/약세에 따른 EUR/USD 역방향 변동'
    ]
  }
};

function openDetailModal(itemId) {
  const item = appState.data.items.find(i => i.id === itemId);
  if (!item) return;

  const icon = ITEM_ICONS[item.id] || '📦';
  // 1. 팝업 타이틀 간소화: '[아이콘] [품목명] 상세'
  document.getElementById('detailTitle').textContent = `${icon} ${item.nameKr} 상세`;
  
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

  // 2. 품목 기초 가이드 데이터 매핑
  const guide = item.guide || COMMODITY_GUIDE_DATA[item.id] || COMMODITY_GUIDE_DATA[item.id.replace('-wmp', '-milk')] || {
    definition: item.description || '국제 시장 기준 원자재 가격 정보입니다',
    correlation: '국제 선물/현물 벤치마크 가격과 연동되어 거래됩니다',
    factors: ['글로벌 수급 동향 및 기후 요인', '환율 및 운임 변동', '주요 산지 정책 변화']
  };

  const factorListHtml = (guide.factors || []).map(f => `
    <li class="guide-factor-item">
      <span class="guide-factor-dot">▪</span>
      <span>${stripTrailingDots(f)}</span>
    </li>
  `).join('');

  document.getElementById('detailBody').innerHTML = `
    <!-- Top Price Summary Box -->
    <div class="detail-summary-box">
      <div>
        <div style="font-size:12px; color:#94A3B8;">현재 시세</div>
        <div style="font-size:26px; font-family:'Outfit'; font-weight:800; color:#FFF; line-height:1.2;">${formatPrice(item.price, item.currency)}</div>
        <div style="font-size:11.5px; color:#64748B; margin-top:2px;">단위: ${item.unitKr} (${item.unit})</div>
      </div>
      <div style="text-align:right;">
        <span class="badge-change ${isGain ? 'badge-gain' : 'badge-loss'}" style="font-size:14px; padding:4px 12px;">
          ${sign}${item.changePercent.toFixed(2)}%
        </span>
        <div style="font-size:11.5px; color:#94A3B8; margin-top:6px;">거래소: ${item.exchange}</div>
      </div>
    </div>

    <!-- Mini Trend Chart Section (Compact) -->
    <div class="detail-chart-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:700; color:#E2E8F0;">📈 ${rangeLabel} 시세 추이</span>
        <span style="font-size:11px; color:#94A3B8;">
          최고 <span style="color:#10B981; font-weight:600;">${formatPrice(rangeHigh, item.currency)}</span> / 최저 <span style="color:#F43F5E; font-weight:600;">${formatPrice(rangeLow, item.currency)}</span>
        </span>
      </div>
      <div style="height:95px; width:100%; position:relative;">
        <canvas id="detailMiniChart"></canvas>
      </div>
    </div>

    <!-- 3. 신규 '품목 기초 가이드' 영역 -->
    <div class="detail-guide-card">
      <div class="detail-guide-header">
        <span>📚 품목 기초 가이드</span>
      </div>

      <!-- [품목 정의] -->
      <div class="guide-item">
        <div class="guide-label">[품목 정의]</div>
        <p class="guide-text">${stripTrailingDots(guide.definition)}</p>
      </div>

      <!-- [선물-현물 연관성] -->
      <div class="guide-item">
        <div class="guide-label">[선물-현물 연관성]</div>
        <p class="guide-text">${stripTrailingDots(guide.correlation || '').replace(/\n/g, '<br>')}</p>
      </div>

      <!-- [주요 변동 요인] -->
      <div class="guide-item">
        <div class="guide-label">[주요 변동 요인]</div>
        <ul class="guide-factor-list">
          ${factorListHtml}
        </ul>
      </div>
    </div>

    <!-- 4. 출처 버튼: 우측 하단 슬림 링크 버튼 -->
    <div class="detail-modal-footer">
      <a href="${exchangeUrl}" target="_blank" rel="noopener noreferrer" class="btn-source-slim" title="${exchangeName} 공식 데이터 출처 바로가기">
        🔗 ${exchangeName} 공식 출처 ↗
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
      const grad = ctx.createLinearGradient(0, 0, 0, 95);
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
            pointRadius: 2.5,
            pointBackgroundColor: strokeColor,
            pointHoverRadius: 4.5
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
              padding: 6,
              callbacks: {
                label: (c) => ` 시세: ${formatPrice(c.raw, item.currency)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#64748B', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: {
                color: '#64748B',
                font: { size: 9.5 },
                callback: (v) => formatPrice(v, item.currency)
              }
            }
          }
        }
      });
    }
  }, 40);
}
