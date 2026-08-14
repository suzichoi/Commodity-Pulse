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
  chartInstance: null
};

// Fallback seed data in case file:// CORS restricts fetch
const FALLBACK_DATA = {
  "lastUpdated": "2026-08-14T14:24:34.542791+09:00",
  "usdKrwRate": 1414.66,
  "eurKrwRate": 1631.8,
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
      "price": 5710.0,
      "change": 50.0,
      "changePercent": 0.88,
      "high52w": 8441.0,
      "low52w": 2798.0,
      "high24h": 5854.0,
      "low24h": 5665.0,
      "volume": 0,
      "sparkline": [
        5882.0,
        5776.0,
        5782.0,
        5821.0,
        5543.0,
        5619.0,
        5648.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5675.74
          },
          {
            "time": "11:00",
            "price": 5687.16
          },
          {
            "time": "13:00",
            "price": 5698.58
          },
          {
            "time": "14:24",
            "price": 5710.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 5660.0
          },
          {
            "date": "07-15",
            "price": 5737.0
          },
          {
            "date": "07-16",
            "price": 5216.0
          },
          {
            "date": "07-17",
            "price": 5533.0
          },
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 4200
          },
          {
            "date": "2025-11",
            "price": 5400
          },
          {
            "date": "2026-02",
            "price": 9800
          },
          {
            "date": "2026-05",
            "price": 11500
          },
          {
            "date": "2026-08",
            "price": 8420
          }
        ]
      },
      "newsEn": [
        {
          "title": "Hershey stock: 11.2% upside to fair value as cocoa costs weigh on margins - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxNYjVnXzlKcFRzVmZvODZmUlZ3Q1lmZGRfXzlGM1pBbk16RzFKRDFUZXdhVkdBSTR4dDNQYTVJZ05Db2RsVmx6Q0tEb2JJSHdVa3VBcUYwcWVjMk9aaEdDUzFydXRvaW4zU3hPS0N4UTBrQ3VIdzF6UF9DQVZ5cWpjSHVWbEx1TXhUTm5lcTVsRHdiaVFxaDVnXzBSdUZYLXhvQUR6ZmhBSldrNC1uenIwLXd6dXN6VERCYk5VV1QyYnJaazlCTklxT0RUUHFIWldJWGJTaVcycw?oc=5",
          "date": "08-13 20:03"
        },
        {
          "title": "Cocoa Recovers More Ground After Tuesday’s Sharp Drop on Beneficial West African Weather - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMi4AFBVV95cUxQX1lsVWpjZ0hjY2J0Tm5LTXlXMXZ3eHBvdmtYV2R2VEdyWEowdDdVVFJyQVRZd3cwczRVeE1EN3ltLXViZjRfQTlLUjM2cm0zZkJ5dEwtWG5vRnUySktwR2ZQV3UwdTBZSHN4SW8yRDJQU3NMQUVkdkY1anpRVHhxVlpOMG5ZSEZXYVBqWlN2TUd5QnZvTjlyT2xqb2dJNGt1ckEzNzlHWVJ2ckxJY3duMTJjSlNORkIzTWd0ZUZXWnFja3FWT2dheURkdklmSGh0NjY2YmhkX0JoSWdJXzVzOA?oc=5",
          "date": "08-14 03:39"
        },
        {
          "title": "Cocoa Prices Retreat on Beneficial West African Weather - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQTGxhTUVldFJjaUV6NXdvN2FTd1hFUDRBOXB2Q1dYeG1JbWJ5XzVEV0wwNlRjVU9Pd1dkZW9Fb2l5NmlsYXNzTjRkV2xncWVyTmdEWi1NbGgtZmxsM2RCOEwtSnJ3eVdsaDhUZEtHaVhtX3ZOY01DNnhTQmVWaDJzbkt2TGN3T2g2dy1uLS1tRUR5eXJ6WkY5YjJJMHFHeE1S?oc=5",
          "date": "08-12 03:19"
        },
        {
          "title": "Cocoa loses 4% amid news from Ghana 🚩 What's next for the market? - XTB.com",
          "source": "XTB.com",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQTjZOTVhxNFVnYThtNnFveHk0Uk1KbjdiNTJXYzBORnZGNDlRdDdmXzQ2OWtRVmt3bkZpc3ZsTXZOWk1jVjVxNUJ5R2VCbWdCd0U3T2N5U2MzUTZtNENiVTFNTEdBVWxMMzU3ekJTVGs2WTAzcWpqUWRnQnI3cmpXSXZmNW9pckxZcWh6UG4wNExMcHVGd0dxSVh2ZG13c0xhbjljMmd1a2RVa3U2NVVZT3N5dHBZclZJWU9j?oc=5",
          "date": "08-11 22:11"
        }
      ],
      "newsKr": [
        {
          "title": "허쉬 주가: 코코아 비용 마진 압박에도 적정가치 11.2% 상승 여력 - Investing.com 한국어",
          "source": "Investing.com 한국어",
          "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTE9KOUktSGkyVE5JcU96VkxvRmFheEI0MWVYelMwZUtOMVQtOWY0OVlEWFZkd014dDRqbjdXS2JnNFdhOWdibHdZQXpuVUU0RTNyZEMxSy1iTnlyLVdxOXVsYmE2MGx0TjF3SlZ6RWtwRTF4eEtLQ3dr?oc=5",
          "date": "08-13 20:05"
        },
        {
          "title": "코코아 버터 대안 시장 규모, 점유율, 성장(2034년) - fortunebusinessinsights.com",
          "source": "fortunebusinessinsights.com",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNbFlZWHpJWTVpc2EzYmVYbmRmWUlmRlZrbENMVkpDSmJGOUZya19Ra2QtVENsOTd3ckFtLUNsOUtaeThjQ0l2LUtTWGd6WFl3aFlIWkp5b2pkWnVEaVNvS3hsRFVHMWR5cW9uaGVRUWlpaEpldU5rSlRBVWljYnpxZHpzVi15TlNmbGlUdVBXRkpmcWI4VVpr?oc=5",
          "date": "08-12 18:08"
        },
        {
          "title": "\"밥상 물가 더 오른다\"…슈퍼 엘니뇨에 세계 식량 가격 우려 - 한국경제",
          "source": "한국경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE00ZlVQd1BPZ2dIYWZPdTJLeFdwUTRTaU1Na2J2NndETUV4cjdiZFJ0ZmY1TVF2YWRyM2dKNmpDblVHSFRBd1pONHBWOWVCd3Fub1dJS1d3azRJUQ?oc=5",
          "date": "08-12 09:00"
        },
        {
          "title": "가뭄에 라인강 멈추고 밥상 물가 껑충…‘기후플레이션’의 경고 - ekn.kr",
          "source": "ekn.kr",
          "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1TYXh1TlgxZ2VRRFVwYjVZeFd3SURMeUZ3WkpPaGtZdEgycHh4TFg4NTRSbWlkNi1VT2VINkpPUlZHSnhfMEViWmdvbnpNbS0wejBFSDVtc2ZqRmc?oc=5",
          "date": "08-13 10:11"
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
      "currency": "US Cent",
      "unit": "US Cent / lb",
      "unitKr": "파운드당 센트",
      "description": "브라질 가뭄 및 한파 우려와 글로벌 수프라 서플라이 체인 수급 동향에 민감하게 반응하는 프리미엄 원두",
      "newsKeywords": "Arabica coffee price market news",
      "naverQuery": "아라비카 커피 가격",
      "price": 313.4,
      "change": -23.8,
      "changePercent": -7.06,
      "high52w": 437.95,
      "low52w": 242.7,
      "high24h": 320.8,
      "low24h": 310.4,
      "volume": 0,
      "sparkline": [
        326.9,
        321.65,
        335.55,
        332.3,
        335.75,
        340.1,
        333.1
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 311.52
          },
          {
            "time": "11:00",
            "price": 312.15
          },
          {
            "time": "13:00",
            "price": 312.77
          },
          {
            "time": "14:24",
            "price": 313.4
          }
        ],
        "7D": [
          {
            "date": "08-05",
            "price": 326.9
          },
          {
            "date": "08-06",
            "price": 321.65
          },
          {
            "date": "08-07",
            "price": 335.55
          },
          {
            "date": "08-10",
            "price": 332.3
          },
          {
            "date": "08-11",
            "price": 335.75
          },
          {
            "date": "08-12",
            "price": 340.1
          },
          {
            "date": "08-13",
            "price": 333.1
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 337.2
          },
          {
            "date": "07-15",
            "price": 334.45
          },
          {
            "date": "07-16",
            "price": 321.3
          },
          {
            "date": "07-17",
            "price": 328.45
          },
          {
            "date": "07-20",
            "price": 334.4
          },
          {
            "date": "07-21",
            "price": 331.95
          },
          {
            "date": "07-22",
            "price": 316.65
          },
          {
            "date": "07-23",
            "price": 309.4
          },
          {
            "date": "07-24",
            "price": 313.8
          },
          {
            "date": "07-27",
            "price": 324.55
          },
          {
            "date": "07-28",
            "price": 339.4
          },
          {
            "date": "07-29",
            "price": 325.8
          },
          {
            "date": "07-30",
            "price": 323.05
          },
          {
            "date": "07-31",
            "price": 332.1
          },
          {
            "date": "08-03",
            "price": 319.5
          },
          {
            "date": "08-04",
            "price": 324.1
          },
          {
            "date": "08-05",
            "price": 326.9
          },
          {
            "date": "08-06",
            "price": 321.65
          },
          {
            "date": "08-07",
            "price": 335.55
          },
          {
            "date": "08-10",
            "price": 332.3
          },
          {
            "date": "08-11",
            "price": 335.75
          },
          {
            "date": "08-12",
            "price": 340.1
          },
          {
            "date": "08-13",
            "price": 333.1
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 155.0
          },
          {
            "date": "2025-11",
            "price": 182.0
          },
          {
            "date": "2026-02",
            "price": 210.0
          },
          {
            "date": "2026-05",
            "price": 250.0
          },
          {
            "date": "2026-08",
            "price": 238.45
          }
        ]
      },
      "newsEn": [
        {
          "title": "Jefferies maintains Keurig Dr Pepper and Smucker ratings amid coffee price surge - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxOVi1fNW01X0E3bFRiaktPTWNUdlhyaTc4bUlROGZsWHJzSjZSQmZUZ2ZPWXU1VVFPYnUzWXlyVzJRVy11TldZRkpUVkV3bGRENlJqQl9mSHhMUUw3QjdGMTVZa3JNY1J0UFBLckN6MXFibHZlak5UVDR0dzBhemFiYnZRN2kwT1BRSm1vT0pLalJBTEJPb1prNVZzRzZVWHlJa0dQTWkwQnNlZmw0LV9yWGhrMFY5cGZRQ090MmxyazNqUWRZa0tqS0hkbXB3c3l4MlE3RlBWZk1Edw?oc=5",
          "date": "08-13 12:03"
        },
        {
          "title": "Brazil Coffee Market Report: Mixed Prices, Slow Harvest, and El Niño Concerns | August 2026 - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxQSVR5R3VsQmEyZEhqNUg4MW9yYVBtcVVpbVhET2ktSF9ndFRHRFNWTThFaUF3YkZFVHVXV0U0elNEbVg3U3lXZnRMSXhNSnBWRGFBWUUyN1R4bkU2Z09SdnF5WmhMYWwyTnlXQjUzRVZ0bnpEZ1VoTDk1MFM3VWNTYlZQMA?oc=5",
          "date": "08-12 04:30"
        },
        {
          "title": "Is El Niño Sending Coffee Prices Higher Again? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiYkFVX3lxTFBBcElLQ19UdVBrbDVUbDFubzk3aFhRM0FmREhFaExlTGdEeU9hVlRXQS1hZmRkWGlZeGtnVnpBQVVPNHdZTG1CNWRPN0tBcXhKbXRMNW5GRXpva1FTRDVXN3Bn?oc=5",
          "date": "08-12 03:33"
        },
        {
          "title": "Coffee prices today, August 13: Continuing the downward trend - Laodong.vn",
          "source": "Laodong.vn",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNSlpmX0lBM01wVnlwUzllcnlvQXN5eDNuRThvajVMYnpRUDFFM2w3OVVHSDIwN2lyRlZTWWgtQjROUUV6OHoyRG1iekJpeVFKOGpVV0xlTEpzaUdhajZDSE5kMWZPaWZzVE5Bdk5WT0t5V3BBN3VDRTktbEhaUmdCQ0Z6MkhkcDNGS050b21n?oc=5",
          "date": "08-13 17:42"
        }
      ],
      "newsKr": [
        {
          "title": "\"커피, 뜨거운 투자처 부상…AI 수익률 웃돌아\" | - 연합인포맥스",
          "source": "연합인포맥스",
          "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTE12LVpfUWt6YTlBTURlZ2ZFdU02RHVwRlFhdDVER0VzYm1aMy01Zlljak1rWDdVLVNfWXBFQVdGcjllMVpDckF2M0VRaE1INVQ4UUlkLW5XclpsMnFta29xdUFqY01fQ1ZEQ2E4UlN6N2dpWmZm?oc=5",
          "date": "08-14 10:33"
        },
        {
          "title": "커피 선물가격 폭등...AI 제치고 대안 투자처로 부상 - 글로벌이코노믹",
          "source": "글로벌이코노믹",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNVlp5ZFhNRGlLUlQyRGg2SkZwVENReUQ0N3V2R040UWNKX3dTX25RM2dtV09SSUl5Ym55LUNwUU9vQVdUYmU3c2RscXpvVGljbFQ0LTZTbGNpNU93dW5CNVQyaFJNUE9WUVdVdzV6NDhUeVBJaXQxblBfRW5BSTFJSXZoY0tPcVlZ?oc=5",
          "date": "08-14 05:51"
        },
        {
          "title": "오늘(8월 14일) 커피 가격: 콜롬비아의 수출 재개로 모든 커피 가격이 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPbU8zVTRvUlQ4ZDF6eE1JcFFTaWJLQ3dodzJ5cXRVNWVDLTlud0RlZkdGbFdpMkdMeElXQ1htTG1Wd2hMdDRMQUZacVlJdVVVNlRRekE5NjNQSGtaZUNQWFUtUVliQVdITGtPZ1VBbFl6Tmw5UnYwZGRveTlsTWg3QXhhSmVyRi1vdHk4bDVScFRhV1F3djdOcFRzTQ?oc=5",
          "date": "08-14 08:50"
        },
        {
          "title": "콜롬비아 강진에 커피 수출길 차질… 글로벌 원두 공급 우려 - 조선비즈 - Chosunbiz",
          "source": "Chosunbiz",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxQTHBxeFE3ZG0wSDlzdkt2S3ZUMGhhZzZXVldFdUZGN2x5WDMxLW1CbllqUi1acWpWLXBMLXhDSGlBT3YyUUFiUFlWZTBHR1JUc3M2TUtuN3Jka0Z4OTQtdGs1UzcwR3d1RDJuUkdFRlpyRVhNUWYxZXI5ZkpxTXpGMVk1T0xTc0xxeDhKeWR0a3VSZEt1RkJpRV96TnB5UdIBsgFBVV95cUxOaVFEaERjZUlMU25yYy1mdkJMd1FuQ0dkbk44U1JBMVhRWExaa01FX2F4R3pwZEx0cmdQdXZ0N1R4Vjg1NFZJY2tla2ZSU1k3V3JkeWY3b0ZhNm0ydjZLUGkzakpWbDRLcUM2WDBDOWxYTUw0MjFZUmZ3Y05FM1UyX05JVmFtVjlIaVYyaTlhczVZVGJYa1dtZ3hfcHRvRFg5Y3B0WFE2NTByZE5EZUVfVUJR?oc=5",
          "date": "08-13 11:04"
        }
      ]
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
      "price": 3643.0,
      "change": -111.0,
      "changePercent": -2.96,
      "high52w": 4553.75,
      "low52w": 2914.4,
      "high24h": 3643.0,
      "low24h": 3643.0,
      "volume": 12850,
      "sparkline": [
        3752.29,
        3715.86,
        3697.64,
        3679.43,
        3672.14,
        3661.21,
        3643.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-07",
            "price": 3752.29
          },
          {
            "date": "08-08",
            "price": 3715.86
          },
          {
            "date": "08-09",
            "price": 3697.64
          },
          {
            "date": "08-10",
            "price": 3679.43
          },
          {
            "date": "08-11",
            "price": 3672.14
          },
          {
            "date": "08-12",
            "price": 3661.21
          },
          {
            "date": "08-13",
            "price": 3643.0
          }
        ],
        "1M": [
          {
            "date": "07-15",
            "price": 4517.32
          },
          {
            "date": "07-16",
            "price": 4480.89
          },
          {
            "date": "07-17",
            "price": 4444.46
          },
          {
            "date": "07-18",
            "price": 4408.03
          },
          {
            "date": "07-19",
            "price": 4371.6
          },
          {
            "date": "07-20",
            "price": 4335.17
          },
          {
            "date": "07-21",
            "price": 4298.74
          },
          {
            "date": "07-22",
            "price": 4262.31
          },
          {
            "date": "07-23",
            "price": 4225.88
          },
          {
            "date": "07-24",
            "price": 4189.45
          },
          {
            "date": "07-25",
            "price": 4153.02
          },
          {
            "date": "07-26",
            "price": 4116.59
          },
          {
            "date": "07-27",
            "price": 4080.16
          },
          {
            "date": "07-28",
            "price": 4043.73
          },
          {
            "date": "07-29",
            "price": 4007.3
          },
          {
            "date": "07-30",
            "price": 3970.87
          },
          {
            "date": "07-31",
            "price": 3934.44
          },
          {
            "date": "08-01",
            "price": 3898.01
          },
          {
            "date": "08-02",
            "price": 3861.58
          },
          {
            "date": "08-03",
            "price": 3825.15
          },
          {
            "date": "08-04",
            "price": 3788.72
          },
          {
            "date": "08-05",
            "price": 3752.29
          },
          {
            "date": "08-06",
            "price": 3715.86
          },
          {
            "date": "08-07",
            "price": 3697.64
          },
          {
            "date": "08-08",
            "price": 3679.43
          },
          {
            "date": "08-09",
            "price": 3672.14
          },
          {
            "date": "08-10",
            "price": 3661.21
          },
          {
            "date": "08-11",
            "price": 3643.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3621.14
          },
          {
            "time": "11:00",
            "price": 3628.43
          },
          {
            "time": "13:00",
            "price": 3635.71
          },
          {
            "time": "14:24",
            "price": 3643.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 4371.6
          },
          {
            "date": "2025-09",
            "price": 4444.46
          },
          {
            "date": "2025-10",
            "price": 4517.32
          },
          {
            "date": "2025-11",
            "price": 4553.75
          },
          {
            "date": "2025-12",
            "price": 4480.89
          },
          {
            "date": "2026-01",
            "price": 4408.03
          },
          {
            "date": "2026-02",
            "price": 4298.74
          },
          {
            "date": "2026-03",
            "price": 4189.45
          },
          {
            "date": "2026-04",
            "price": 4080.16
          },
          {
            "date": "2026-05",
            "price": 3970.87
          },
          {
            "date": "2026-06",
            "price": 3861.58
          },
          {
            "date": "2026-07",
            "price": 3752.29
          },
          {
            "date": "2026-08",
            "price": 3643.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Robusta coffee prices ease, raw sugar rises - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNcGE0YjZmM1p1bzIxMS0wZVpBWm1MU081U0ZIOTViYkxFbnFhZTdPQnJ4ZXBpTmZ1YW1QUE0wYm1xdy1ZcVgxWDFwbXJwdkY3NFQ4S2dOMTFjOTNzSV9LSF9mcGR3MkdvU0lzYURFVW5nZ2Vva1JOR0NtM2FFdGJqV2xpNTZncnotTVkzeHllX25pZUlvZDQzamFyRm5EQXRleXdSUXc5S1Z1cGR0LU5KTHJ3?oc=5",
          "date": "08-13 20:59"
        },
        {
          "title": "Coffee Prices See Support as Colombian Earthquake Temporarily Halts Exports - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNZlJKUlhBcy1XWkN2UnRzd3NQS0JlNDZBeVJXRGVPZzBVMGlXN1RuU3o3RUFHc01xYjRmWVlXVWNEZGJmcGNka09kdTYyc0k4dnVwTlgtUlYtdjdkRld6aC02OUpVWUhaS05MY1Fra3hFdTQ3SjBmUmcyZFM3TFpkQldJWTBzU09RRVdMU2VtU3VOdWRMU0F6T18tcGJHOXBSYUk1bmVjTnNDNC0yR3lQOHBhcGkzZTgycWxB?oc=5",
          "date": "08-13 01:08"
        },
        {
          "title": "Coffee Prices Decline as Colombian Coffee Exports Partially Resume - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNYVgxNUJfU0dETWlERGFTZmw3dFFxWXZUTlV4QVo5d05DLVVaNEdOS2ZXbkpwdkJrdjVhZ0RCd21hSnBRUC1obGxhYV9iTjJMeHdtbmVpSjVwQmJFQ2ZSSlZWYXhMelhteTJFVF9JQ1lGM3dQR1YwOTRoZWJ3bTVHbU5BdmI4RGRDRlNTbmFaMkpXU3oweVcwYlBaUHQtdXdBT0JGaFFxQUpMZHZxZG5wR0gtRVhaTEJ0VlM4OFp3dS1SdlU?oc=5",
          "date": "08-14 03:37"
        },
        {
          "title": "Coffee prices today, August 13th: Mixed trends, robusta continues to fall. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQLTFhb2l1ZWF1ZThiU25ySEk0MzdKcjRKVFlMUWtkRE9VQ0NHRGlxbEttdHJacVExRjRENUdtVUpFZDVQTHdMcVc5S3ZxNjAzakdKR2plVHZTZ3k1YzkyRm5ZZXRYT3Frdm1qT21QcmJUY1VsZGhuVGszbUJLMUl4emthaDBjYTFIb3NYaUt0OV8yMkdEZ0xv?oc=5",
          "date": "08-13 08:35"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 14일) 커피 가격: 콜롬비아의 수출 재개로 모든 커피 가격이 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPbU8zVTRvUlQ4ZDF6eE1JcFFTaWJLQ3dodzJ5cXRVNWVDLTlud0RlZkdGbFdpMkdMeElXQ1htTG1Wd2hMdDRMQUZacVlJdVVVNlRRekE5NjNQSGtaZUNQWFUtUVliQVdITGtPZ1VBbFl6Tmw5UnYwZGRveTlsTWg3QXhhSmVyRi1vdHk4bDVScFRhV1F3djdOcFRzTQ?oc=5",
          "date": "08-14 08:50"
        },
        {
          "title": "브라질 풍작에 커피값 급락…콜롬비아 지진에 수출망 마비 - 글로벌이코노믹",
          "source": "글로벌이코노믹",
          "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNcGZSQ1ZKN2ozZUx6Tno3NklGUjhjckJGWGMwcEgzcTVmSEZlMGRxazNzY1dEWk1JSkZDX3EyejhXcWJYR0R2bTlkZWpLal9VUHJ3b0VaUWtjMEZxQ0E1eDJSOWZUcGJncjFMS01fSm5ncWRBbnlENFVsWUFTMjNYV3VWRUxTbHBR?oc=5",
          "date": "08-14 07:56"
        },
        {
          "title": "커피 가격은 오늘(8월 14일)에도 계속 하락하여 로부스타 가격은 톤당 100달러 이상 떨어졌습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQOTdEaHRINVFqNWxqSERRaU41V0VMbW9JVExac1E3STB3Y0NuN3ZLeS0xZFllZUJhVnJZYVdoYnhURTNjdy1sZkVRU0dxaDlZTlYyLUZQc1ZOZk5xbjNaU1JvV1lKNTVsdUdyOUxJWXY1YkRfWEh2NkZxek9QOWY3U2xIQVE4VmN0dXpLbGlBY04?oc=5",
          "date": "08-14 08:30"
        },
        {
          "title": "콜롬비아 강진에 韓 커피 시장 들썩…\"맛 차이에 공급망 변경 쉽지 않아\" - 뉴스웍스",
          "source": "뉴스웍스",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE5ScUU4RVFwOXgzRFdkTmRSb3AtVmQxeXA5RERDVFV5TElGeTE0SHloMEVrcUhodVJtWEE3eFFjejNfS1JNWmlPZkQ4ckVDQzFvdnhHSExPWkxzblRMbDRPX2plNjZCVjIxRGI2SDJmTQ?oc=5",
          "date": "08-13 18:12"
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
      "unit": "Index Pts",
      "unitKr": "포인트",
      "description": "글로벌 유제품 경매 종합 가격지수 (GDT Event Weighted Average Price Index)",
      "newsKeywords": "Global Dairy Trade auction index news",
      "naverQuery": "GDT 지수 유제품",
      "price": 3778.0,
      "change": -37.0,
      "changePercent": -0.97,
      "high52w": 3880.0,
      "low52w": 3030.0,
      "high24h": 3778.0,
      "low24h": 3778.0,
      "volume": 14300,
      "sparkline": [
        3800.0,
        3850.0,
        3880.0,
        3820.0,
        3758.0,
        3815.0,
        3778.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-07-21 (Event 408)",
            "price": 3815.0
          },
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3778.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "2026-05-19",
            "price": 3850.0
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 2990.0
          },
          {
            "date": "2025-08-19",
            "price": 3030.0
          },
          {
            "date": "2025-09-02",
            "price": 3070.0
          },
          {
            "date": "2025-09-16",
            "price": 3110.0
          },
          {
            "date": "2025-10-07",
            "price": 3150.0
          },
          {
            "date": "2025-10-21",
            "price": 3200.0
          },
          {
            "date": "2025-11-04",
            "price": 3250.0
          },
          {
            "date": "2025-11-18",
            "price": 3290.0
          },
          {
            "date": "2025-12-02",
            "price": 3340.0
          },
          {
            "date": "2025-12-16",
            "price": 3390.0
          },
          {
            "date": "2026-01-06",
            "price": 3440.0
          },
          {
            "date": "2026-01-20",
            "price": 3490.0
          },
          {
            "date": "2026-02-03",
            "price": 3540.0
          },
          {
            "date": "2026-02-17",
            "price": 3580.0
          },
          {
            "date": "2026-03-03",
            "price": 3630.0
          },
          {
            "date": "2026-03-17",
            "price": 3670.0
          },
          {
            "date": "2026-04-07",
            "price": 3710.0
          },
          {
            "date": "2026-04-21",
            "price": 3750.0
          },
          {
            "date": "2026-05-05",
            "price": 3800.0
          },
          {
            "date": "2026-05-19",
            "price": 3850.0
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "dairy commodity forward purchasing | Global Dairy Markets Establish Firmer Base Amid Production Uncertainties - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOaUg2czdwT05hS2dyZFNPNnBzTld3S1JmSS1tRTJEeGtFaGlDVUtRWHZzU2R1cW9ELTlGZjlUeHFYaUxvR0JXZi1EVG9iUzV4NUx2NjdjYUNYNTZNODE0cDF6Vzd1WkRKR3JEUmVxU1RLck45d3M3OFZFeG1Fa3NtR1Z5cFlxd1gyVmVRSVhBcmN5RWdfLWhxRm9oc1VYMk1a?oc=5",
          "date": "08-13 06:00"
        },
        {
          "title": "EU Milk Production Rose 3.7% and Expanded Dairy Supply - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOZy1rOGdIMFM3SG1IYzI5WHQ5MFllcG9Za3YxY2JZNHpHVzExZlM4VDVmN3ZVUEZFblBWWFlKXzBFTE02eHRLRVUwbmczSWowd2piNEVkUXVQZF95T2RwbE9kT2ZBWnJSUmVXcDNsZnRMWHFMYVVDZVBXUmlMMlpfX3R6dVRzUjdUQkFWNWtNNWg2TmVOemxQLVgxR2h4VGpFVXZ1Wg?oc=5",
          "date": "08-13 03:04"
        },
        {
          "title": "Powder prices jump but butter and cheese stall - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxONW9lTk15cl92cjRCR1dZR0s5dXRKVU9zazZhMnRBNUV0SEJaVEZjY3VkbC1DR2pSZXBLWXl4M2x2VmRfbHoyS21vbEVxdTEwdEswR0hNT3cxbGNsd2ktZk1GTWIzOEVaU3hvVURfdFFtU2NmbEI0SjFCLTVycmtpWVNtdGY3R0szSE9RSlgxcVJnTzVENmk0b3UyVW92Zw?oc=5",
          "date": "08-13 07:57"
        },
        {
          "title": "Dairy market finds firmer footing as buyers look beyond current supply - farmersweekly.co.nz",
          "source": "farmersweekly.co.nz",
          "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPaG1rcGFZUy1wa2g4eENrcXptMHdSVGFhNWw5LW1kZThNQUdLWjg1SF8wYkFBNVdnZFNVbU5LbGZWQjkzRC1UU0hIOURxVmtPVDRlRHhlZFlvTFBTM1RkQ3ZKcUFMdTNHYUVWbXhDVVpTR3lTeGg0NWRMNGozeTc1ZjB4R2Q1R2lsS2hLM1MxSGVXMktDTGF4c2ppOGhXSUFxVFhiRWE5SmdTNHhiWTNyVWtwNTQzMUlBMmEwTThTcUZqenM?oc=5",
          "date": "08-12 11:19"
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
          "title": "버터값 최고치…베이커리업계 직격탄 - 한국경제",
          "source": "한국경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBzTXJKcDFiaXJnSUpFX1AxMGc0eEFuTTkwckVDR3lZRTJYQjNKQnFUWW91TGxwUFNkcXlMaE5DMm9meGpzbzZXX21JOUU0U1RkVG5Cd1FLeGNxQQ?oc=5",
          "date": "08-18 16:00"
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
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
      "description": "글로벌 유제품 가격 벤치마크(뉴질랜드 Fonterra 중심 경매 지수). 격주 화요일 경매 데이터 업데이트",
      "newsKeywords": "Global Dairy Trade Whole Milk Powder news",
      "naverQuery": "GDT 전지분유 가격",
      "price": 3483.0,
      "change": -3.0,
      "changePercent": -0.09,
      "high52w": 3772.0,
      "low52w": 3050.0,
      "high24h": 3483.0,
      "low24h": 3483.0,
      "volume": 28500,
      "sparkline": [
        3724.0,
        3772.0,
        3706.0,
        3589.0,
        3425.0,
        3486.0,
        3483.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-07-21 (Event 408)",
            "price": 3486.0
          },
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3483.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
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
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 3020.0
          },
          {
            "date": "2025-08-19",
            "price": 3050.0
          },
          {
            "date": "2025-09-02",
            "price": 3080.0
          },
          {
            "date": "2025-09-16",
            "price": 3110.0
          },
          {
            "date": "2025-10-07",
            "price": 3150.0
          },
          {
            "date": "2025-10-21",
            "price": 3200.0
          },
          {
            "date": "2025-11-04",
            "price": 3250.0
          },
          {
            "date": "2025-11-18",
            "price": 3280.0
          },
          {
            "date": "2025-12-02",
            "price": 3320.0
          },
          {
            "date": "2025-12-16",
            "price": 3360.0
          },
          {
            "date": "2026-01-06",
            "price": 3390.0
          },
          {
            "date": "2026-01-20",
            "price": 3440.0
          },
          {
            "date": "2026-02-03",
            "price": 3470.0
          },
          {
            "date": "2026-02-17",
            "price": 3490.0
          },
          {
            "date": "2026-03-03",
            "price": 3530.0
          },
          {
            "date": "2026-03-17",
            "price": 3570.0
          },
          {
            "date": "2026-04-07",
            "price": 3590.0
          },
          {
            "date": "2026-04-21",
            "price": 3615.0
          },
          {
            "date": "2026-05-05",
            "price": 3724.0
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
          }
        ]
      },
      "newsEn": [
        {
          "title": "Global dairy markets establish firmer footing amid production uncertainty - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNMzg5Mkl1VGZBNnJRbW9XVW10a3pvT0F5VGZNOVNBTEEtcXE0RjZWY1ZDN2ZGaWtUcnJEcnh3X29fSWhPLUJ5ZVdDTmhzNFRPT1VWajJwcTJMak5FQkFlR2dhTnRXd2U0NldSNWpqQWlhR2MxZ3ZBb29Hdzh1WXJKNVNTQVQyRnl3M1JEYUdVdDBMOGEwUEg4VTViMGo5RC1QTHI5NWFiNDlXelpwOExPUkplVkQwbHJFOVpJSTYxYw?oc=5",
          "date": "08-13 11:03"
        },
        {
          "title": "European dairy processor payouts | European Milk Prices Fluctuate as Global Butter Values Decline - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQdkhObXJRam85cHQ5by0zdjNIdzdlR3VYNXgzRFFsa3BDbEFsZ1N6MC0xdkZCLXljZnk5TVZueFY1RzBRNVM4MFlKUFV5UWRGbjZJY1Vxazd3UlNIQzZKeE56YVdWQmhVZXc0bDlXaFZsaWM3MXJfSWhUWFhQWWlGbFBya2lqYWVRb3dtZVBKTFJldG8?oc=5",
          "date": "08-13 21:53"
        },
        {
          "title": "IDFA opens nominations for annual industry awards - Dairy Foods Magazine",
          "source": "Dairy Foods Magazine",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNLV9ONWNhMlhEUktIQ0M0c2c0V1BwNE5CdllWS01BV0tuWUNXdWdRVklMX1V5XzFpdndFNlRULU1ScXZ1eEh2M1RBblpJOEdtRXA0bmJRRXpuRnJtNVRiY0x2Rm9ZVHdhTDQ3WDdHYmZtRXhxb1N6c1B4ZTI1eFRsZ0plczdxLWg3QTRpb2EtaFRtanV2MGc?oc=5",
          "date": "08-14 03:27"
        },
        {
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        }
      ],
      "newsKr": [
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
        },
        {
          "title": "뉴질랜드 달러 가치 하락: 왜 NZD는 RBNZ 금리 압박에도 약세일까? - EBC Financial Group",
          "source": "EBC Financial Group",
          "link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5PWTZ4b0NfZDlwckpnTF9yN3RMajUySkE4R1VidUpKaUZDYkVlWHZtYjlTaTFGLXd6VWpYY1pQOENxbkVBNUMwaUpNTjhQdlFKWEE?oc=5",
          "date": "06-12 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
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
      "price": 3261.0,
      "change": 27.0,
      "changePercent": 0.83,
      "high52w": 3261.0,
      "low52w": 2580.0,
      "high24h": 3261.0,
      "low24h": 3261.0,
      "volume": 18200,
      "sparkline": [
        3200.0,
        3220.0,
        3240.0,
        3210.0,
        3180.0,
        3234.0,
        3261.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-07-21 (Event 408)",
            "price": 3234.0
          },
          {
            "time": "2026-08-04 (Event 409)",
            "price": 3261.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-07",
            "price": 3180.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          }
        ],
        "1M": [
          {
            "date": "2026-05-19",
            "price": 3220.0
          },
          {
            "date": "2026-06-02",
            "price": 3240.0
          },
          {
            "date": "2026-06-16",
            "price": 3210.0
          },
          {
            "date": "2026-07-07",
            "price": 3180.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 2550.0
          },
          {
            "date": "2025-08-19",
            "price": 2580.0
          },
          {
            "date": "2025-09-02",
            "price": 2610.0
          },
          {
            "date": "2025-09-16",
            "price": 2640.0
          },
          {
            "date": "2025-10-07",
            "price": 2680.0
          },
          {
            "date": "2025-10-21",
            "price": 2710.0
          },
          {
            "date": "2025-11-04",
            "price": 2750.0
          },
          {
            "date": "2025-11-18",
            "price": 2790.0
          },
          {
            "date": "2025-12-02",
            "price": 2830.0
          },
          {
            "date": "2025-12-16",
            "price": 2870.0
          },
          {
            "date": "2026-01-06",
            "price": 2910.0
          },
          {
            "date": "2026-01-20",
            "price": 2950.0
          },
          {
            "date": "2026-02-03",
            "price": 2990.0
          },
          {
            "date": "2026-02-17",
            "price": 3010.0
          },
          {
            "date": "2026-03-03",
            "price": 3050.0
          },
          {
            "date": "2026-03-17",
            "price": 3080.0
          },
          {
            "date": "2026-04-07",
            "price": 3120.0
          },
          {
            "date": "2026-04-21",
            "price": 3150.0
          },
          {
            "date": "2026-05-05",
            "price": 3200.0
          },
          {
            "date": "2026-05-19",
            "price": 3220.0
          },
          {
            "date": "2026-06-02",
            "price": 3240.0
          },
          {
            "date": "2026-06-16",
            "price": 3210.0
          },
          {
            "date": "2026-07-07",
            "price": 3180.0
          },
          {
            "date": "2026-07-21",
            "price": 3234.0
          },
          {
            "date": "2026-08-04",
            "price": 3261.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "dairy commodity forward purchasing | Global Dairy Markets Establish Firmer Base Amid Production Uncertainties - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOaUg2czdwT05hS2dyZFNPNnBzTld3S1JmSS1tRTJEeGtFaGlDVUtRWHZzU2R1cW9ELTlGZjlUeHFYaUxvR0JXZi1EVG9iUzV4NUx2NjdjYUNYNTZNODE0cDF6Vzd1WkRKR3JEUmVxU1RLck45d3M3OFZFeG1Fa3NtR1Z5cFlxd1gyVmVRSVhBcmN5RWdfLWhxRm9oc1VYMk1a?oc=5",
          "date": "08-13 06:00"
        },
        {
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        },
        {
          "title": "Global dairy markets establish firmer footing amid production uncertainty - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNTlBjbXpFd3loaU0xSjJXUFFjSFJKbmgxS2VsMW9rUExWQnZ4SkY2VTZxeTRKN0cwci04UTlfQmFjVldzelpzTl9UcnhfcHREa29rLW5CakNWM0JmSU8wajBhWDJfV0ZnWjcxMTRJalNFVnB4ODlMVVJ0NnZwNGtQU29QVW44bFA2TXlqYnZTdmtXNGVZcXFVdkVzVFVvM3dJUzkzdXhfdVM2a19qc0VyeVI1YWNpdw?oc=5",
          "date": "08-13 09:18"
        },
        {
          "title": "Filipino consumers are seeking value in every bite - Asia Food Journal",
          "source": "Asia Food Journal",
          "link": "https://news.google.com/rss/articles/CBMihgFBVV95cUxPNkZDVWRYbFdSMmFCMURkMFVXUVM1aGpUc1EwdHotdHd1RHhqM1VNMU1obWhmSXpDdjUzb3ZVYkZ1U0NCTUluTlJnUHgwQmRwbEhNYXRyTVRQWVZjMGJJRVEzTjc0Q3JWd09GU1Y5ZEgtNmh5cTlyUVRaUEJlc1BvOGRSS0c0Zw?oc=5",
          "date": "08-14 10:31"
        }
      ],
      "newsKr": [
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
      "price": 5225.0,
      "change": -78.0,
      "changePercent": -1.47,
      "high52w": 5410.0,
      "low52w": 4180.0,
      "high24h": 5225.0,
      "low24h": 5225.0,
      "volume": 14300,
      "sparkline": [
        5320.0,
        5380.0,
        5410.0,
        5350.0,
        5260.0,
        5303.0,
        5225.0
      ],
      "history": {
        "1D": [
          {
            "time": "2026-07-21 (Event 408)",
            "price": 5303.0
          },
          {
            "time": "2026-08-04 (Event 409)",
            "price": 5225.0
          }
        ],
        "7D": [
          {
            "date": "2026-07-07",
            "price": 5260.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          }
        ],
        "1M": [
          {
            "date": "2026-05-19",
            "price": 5380.0
          },
          {
            "date": "2026-06-02",
            "price": 5410.0
          },
          {
            "date": "2026-06-16",
            "price": 5350.0
          },
          {
            "date": "2026-07-07",
            "price": 5260.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08-05",
            "price": 4120.0
          },
          {
            "date": "2025-08-19",
            "price": 4180.0
          },
          {
            "date": "2025-09-02",
            "price": 4250.0
          },
          {
            "date": "2025-09-16",
            "price": 4320.0
          },
          {
            "date": "2025-10-07",
            "price": 4380.0
          },
          {
            "date": "2025-10-21",
            "price": 4450.0
          },
          {
            "date": "2025-11-04",
            "price": 4520.0
          },
          {
            "date": "2025-11-18",
            "price": 4580.0
          },
          {
            "date": "2025-12-02",
            "price": 4650.0
          },
          {
            "date": "2025-12-16",
            "price": 4720.0
          },
          {
            "date": "2026-01-06",
            "price": 4780.0
          },
          {
            "date": "2026-01-20",
            "price": 4850.0
          },
          {
            "date": "2026-02-03",
            "price": 4920.0
          },
          {
            "date": "2026-02-17",
            "price": 4980.0
          },
          {
            "date": "2026-03-03",
            "price": 5050.0
          },
          {
            "date": "2026-03-17",
            "price": 5120.0
          },
          {
            "date": "2026-04-07",
            "price": 5180.0
          },
          {
            "date": "2026-04-21",
            "price": 5240.0
          },
          {
            "date": "2026-05-05",
            "price": 5320.0
          },
          {
            "date": "2026-05-19",
            "price": 5380.0
          },
          {
            "date": "2026-06-02",
            "price": 5410.0
          },
          {
            "date": "2026-06-16",
            "price": 5350.0
          },
          {
            "date": "2026-07-07",
            "price": 5260.0
          },
          {
            "date": "2026-07-21",
            "price": 5303.0
          },
          {
            "date": "2026-08-04",
            "price": 5225.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "European dairy processor payouts | European Milk Prices Fluctuate as Global Butter Values Decline - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQdkhObXJRam85cHQ5by0zdjNIdzdlR3VYNXgzRFFsa3BDbEFsZ1N6MC0xdkZCLXljZnk5TVZueFY1RzBRNVM4MFlKUFV5UWRGbjZJY1Vxazd3UlNIQzZKeE56YVdWQmhVZXc0bDlXaFZsaWM3MXJfSWhUWFhQWWlGbFBya2lqYWVRb3dtZVBKTFJldG8?oc=5",
          "date": "08-13 21:53"
        },
        {
          "title": "European dairy processor payouts | European Milk Prices Soften as Butter Values Decline Across Global Markets - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOVGlvbnh4WFFBSll6TEZna3dKY0ZrbElWQmh3TjdzNkliSmw3X252SVFXT1dmSjlIU3hSekFJekhyaDRldmFZLVBYVnRvTWQtdnpPMHhyaHoyVWZtckZndEZsdGRZWk94MlNDMFk0VFJ5MV9IS2oxVGpucklGdVZXTnpVRHRfVU9MaFR1ZlVRV2VoeG9sbDJnTkY4WFNZYVZKcUVz?oc=5",
          "date": "08-13 22:16"
        },
        {
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - Farmers' Advance",
          "source": "Farmers' Advance",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        },
        {
          "title": "Global dairy markets establish firmer footing amid production uncertainty - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNTlBjbXpFd3loaU0xSjJXUFFjSFJKbmgxS2VsMW9rUExWQnZ4SkY2VTZxeTRKN0cwci04UTlfQmFjVldzelpzTl9UcnhfcHREa29rLW5CakNWM0JmSU8wajBhWDJfV0ZnWjcxMTRJalNFVnB4ODlMVVJ0NnZwNGtQU29QVW44bFA2TXlqYnZTdmtXNGVZcXFVdkVzVFVvM3dJUzkzdXhfdVM2a19qc0VyeVI1YWNpdw?oc=5",
          "date": "08-13 09:18"
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
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
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
      "price": 820.0,
      "change": -302.75,
      "changePercent": -26.97,
      "high52w": 1193.5,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "volume": 10,
      "sparkline": [
        1153.5,
        1151.25,
        1150.0,
        1160.0,
        1163.75,
        1157.0,
        1161.75
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 1122.75
          },
          {
            "date": "07-15",
            "price": 1123.75
          },
          {
            "date": "07-16",
            "price": 1124.0
          },
          {
            "date": "07-17",
            "price": 1121.5
          },
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
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 815.08
          },
          {
            "time": "11:00",
            "price": 816.72
          },
          {
            "time": "13:00",
            "price": 818.36
          },
          {
            "time": "14:24",
            "price": 820.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 656.0
          },
          {
            "date": "2026-08",
            "price": 820.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "First Thing Today | Grains mixed overnight; corn may be taking leadership role - Pro Farmer",
          "source": "Pro Farmer",
          "link": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOeFNSNU1hMEs0SERYZjNBcjM3c2VWeWxINGpwdm9QVHBDUEkyNGRxYm9odWs1bGV5T0JodGtFQUR0cE5sTElrQ0hKYWtPUjMxNnJoNEZ2MFRDT0hqQ1dzdGVjSllWZFhOa2RlNDZsSkJEU0REdnBaTjhNdlpLU3luTldlUG1pQ2R4SlFvSnN3RHhXeGpVNjFvYkdIUFY3RFdPNmdNanpHbXcxZ3ctdFlReTBtR045ZUU1OHk5aWZodXRlUQ?oc=5",
          "date": "08-13 19:59"
        },
        {
          "title": "Malaysia’s Palm Oil Slipped Again As Rival Oils Weakened - Finimize",
          "source": "Finimize",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPVFhsa3U1TkpKeVBiNWpHQjFZSXBQVVoybTgxNFZxM2ttQ0JJR3FqQkVHcVUwQzh0T0dmS2w2ZzZNMFQ0NmtrejJMMURhaUw0TUctZ3c2MzYycGp0ZWcxbURWY0NQZW9ySzZ1N1QwM2NfRXY4YUJsZkFfMlJKTUp5RmVDdEVEa0ozZVVNMQ?oc=5",
          "date": "08-13 21:08"
        },
        {
          "title": "Golden Agri-Resources H1 net profit up 4.4% at US$167.2 million on higher CPO prices - The Business Times",
          "source": "The Business Times",
          "link": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNT2s2RDlfcjZhZVNsZmlLME9nR2thdmwxdEJWcW1QYUZzS3RQTHFLalBBUkFZQU9oZHY2WlFPeXJvaVN6ejNGb0R2RTF0N21jQzA4NjVhZDlnOHdSbDZUd0JOdnA1TVZpUzVpb0I1WUFzcVFvQkN0cE9mRmV4Z28tRGJYcVE4MVBaNFY3Nlk1UkUzdkdFNFZxUTlMYUFsQll3eGRoNndyTWRSQkIyNGcyeFJ0UjIzRWxvOWZSdmRoc1lWZw?oc=5",
          "date": "08-14 13:58"
        },
        {
          "title": "Malaysian palm oil rises, tracking Dalian - Business Recorder",
          "source": "Business Recorder",
          "link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTE1zU0p2XzhzQ3VQNGVHTjJiRjR3dkJ0V1FDLUo5SnFkOV9SVnVwRmVoTnk3LTZJM2MyUVJERTdQMDk3VGlLNXFTaUhxejh5Skxk0gFWQVVfeXFMTU9JbUR4TEgtYk5RcjVqVEdWOVBJZkM0ZlBGYVBxWnNJNEpULS05MTRjMXVFdUVMRUcyeUM5OEdBdnU2eFdxNUs4bXZ4VFdlQmR5VW16UVE?oc=5",
          "date": "08-13 22:56"
        }
      ],
      "newsKr": [
        {
          "title": "해바라기유도 ‘껑충’…유지류 가격 초비상 [푸드360] - 헤럴드경제",
          "source": "헤럴드경제",
          "link": "https://news.google.com/rss/articles/CBMiVkFVX3lxTE14VjRvazRSVFdoc1RyclRjZWtudlozWm1ESDd4ay14amtHTkllclducHRFYXR5RlVEdVRCbDRZWjJvbExwUlJtbndlVFA0WGZzZk9Ic2V3?oc=5",
          "date": "08-10 11:52"
        },
        {
          "title": "FAO 7월 세계식량가격지수 전월 대비 0.6% 상승 - 푸드아이콘",
          "source": "푸드아이콘",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE5tdmRqdlUwX3lWVHZzeThDMzlwRUpaZHFzNlpPd29GM0JJb0RETTMwcE1wN3BBSnhuYndfSVhZTXIydVpvaU53S05VUXkzU3ptX0lBNTVlNV9zV2lCcEZaUnlYeWxFSVRUeWJBWA?oc=5",
          "date": "08-10 08:30"
        },
        {
          "title": "국제 설탕ㆍ곡물ㆍ유지류 가격 상승, 육류ㆍ유제품은 하락 - 식품저널 foodnews",
          "source": "식품저널 foodnews",
          "link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE5MQ2xyaDlraVRwaXJ4Xzl0Z1g5dXZFa3I3eXJRTVE3RnItbG5uMHcyT00tcjN4LWpqRUU2NXM4NzFfUVY5ZWh1MkhzN1JhaTBVVndCUVdKYUd1ck1qWW9PazBGUXVONmVaMzFLZ0VR?oc=5",
          "date": "08-10 11:00"
        },
        {
          "title": "FAO 7월 세계식량가격지수 131.1포인트 기록… 곡물·유지류·설탕 상승세 주도 - 기계신문",
          "source": "기계신문",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1mT2pzSERFb1dCV3hmbkRjQjFyM2NlSXdUUXFnYjlSN3pZZDN6dEM0RmREMndxQ0ZwUXVmN2NzU1JrS1B3dkx0TTVUc0RkSDQyZFBheWR4aHZoQXZ6MGYxaTBQNktEczQ?oc=5",
          "date": "08-08 15:13"
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
            "date": "08-08",
            "price": 1930.0
          },
          {
            "date": "08-09",
            "price": 1931.93
          },
          {
            "date": "08-10",
            "price": 1933.86
          },
          {
            "date": "08-11",
            "price": 1935.79
          },
          {
            "date": "08-12",
            "price": 1937.72
          },
          {
            "date": "08-13",
            "price": 1939.65
          },
          {
            "date": "08-14",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "07-16",
            "price": 1930.0
          },
          {
            "date": "07-17",
            "price": 1930.96
          },
          {
            "date": "07-18",
            "price": 1931.93
          },
          {
            "date": "07-19",
            "price": 1932.9
          },
          {
            "date": "07-20",
            "price": 1933.86
          },
          {
            "date": "07-21",
            "price": 1934.82
          },
          {
            "date": "07-22",
            "price": 1935.79
          },
          {
            "date": "07-23",
            "price": 1936.76
          },
          {
            "date": "07-24",
            "price": 1937.72
          },
          {
            "date": "07-25",
            "price": 1938.68
          },
          {
            "date": "07-26",
            "price": 1939.65
          },
          {
            "date": "07-27",
            "price": 1940.62
          },
          {
            "date": "07-28",
            "price": 1941.58
          },
          {
            "date": "07-29",
            "price": 1942.54
          },
          {
            "date": "07-30",
            "price": 1943.51
          },
          {
            "date": "07-31",
            "price": 1944.48
          },
          {
            "date": "08-01",
            "price": 1945.44
          },
          {
            "date": "08-02",
            "price": 1946.4
          },
          {
            "date": "08-03",
            "price": 1947.37
          },
          {
            "date": "08-04",
            "price": 1948.34
          },
          {
            "date": "08-05",
            "price": 1949.3
          },
          {
            "date": "08-06",
            "price": 1950.26
          },
          {
            "date": "08-07",
            "price": 1951.23
          },
          {
            "date": "08-08",
            "price": 1952.2
          },
          {
            "date": "08-09",
            "price": 1953.16
          },
          {
            "date": "08-10",
            "price": 1954.12
          },
          {
            "date": "08-11",
            "price": 1955.09
          },
          {
            "date": "08-12",
            "price": 1956.06
          },
          {
            "date": "08-13",
            "price": 1957.02
          },
          {
            "date": "08-14",
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
            "time": "14:24",
            "price": 1930.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Coconut Oil Market Size, Share, Growth Forecast to 2034 - Fortune Business Insights",
          "source": "Fortune Business Insights",
          "link": "https://news.google.com/rss/articles/CBMic0FVX3lxTFB2bEhUZ1VzendLYXMtQWZQU3dxOVZJcnVGVXhObG9yRzB3MUk0bVJxaE5CRExlQWM3UzFNZlpTbEZsMXZmQ20waUZpTTVURWxIb3BkVG1zSWhxYm9aU3AtM1ViYm9IMzM5TUpFcTZUQjlfM1E?oc=5",
          "date": "07-20 16:00"
        },
        {
          "title": "Desiccated cococnuts: El Niño to have quite an impact - Mundus Agri",
          "source": "Mundus Agri",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxOQTJ2YjFfS2dGWlJ1LV9lZGtVd2dPSEtiOFRKLVpCaC1ZbkMtdDZ5b2Z5UF9JTVhLd3VJaEZoT2RlSERVV2d4dEF5Q3E4VWdZNjFPeGVKdFZaMUd2NXk5cjBja093N21tTElXYjI5WGtLTWotTnZHdnVsUTNBei1zbnVTSQ?oc=5",
          "date": "08-12 22:05"
        },
        {
          "title": "European veg oils edge up on global soft oils strength and laurics ease on week - Fastmarkets",
          "source": "Fastmarkets",
          "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPZE9ISjl5aHZqbERXT2t2UnRXNU9ucUNnRVJNLTVpX2h6eHByWWZtMDZkaE9aT0ozOVI4Z1A2YkY4c1FEYWNGbHgwUUxaMlY1cXkyeXJiZGI3NzZ2Yk9aazdrbFg3SURYVEY5OThCeHl0YXd4VkZvMzVNajFmR1c2T0p4ZVU2dVlwVm5hWThIYnpSTFluRzF3aTBGNkVEN0MzV1lrVktOZzM5blJMUkNIRmhuczVqUF9n?oc=5",
          "date": "04-27 16:00"
        },
        {
          "title": "Does Coconut Oil Benefit Your Skin? Experts Explain — Plus Products to Shop - today.com",
          "source": "today.com",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBQRUtma2JheTljOU9uX09lTVFQcWZhei05X2JMdEhsellRdHl5TS1QVk93ZWdOb3FHOVM5eFFFbVhBYms3Uk5DVE5fOUszczJ6b2pYdkxZSkFvTU9vYVpMZkpVSUtSUktQbFpsR0VHaW4?oc=5",
          "date": "02-04 17:00"
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
      "price": 1414.67,
      "change": -83.03,
      "changePercent": -5.54,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1420.08,
      "low24h": 1411.88,
      "volume": 0,
      "sparkline": [
        1421.16,
        1422.3,
        1407.0,
        1417.31,
        1412.18,
        1416.46,
        1414.67
      ],
      "history": {
        "7D": [
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
            "price": 1414.67
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 1497.7
          },
          {
            "date": "07-15",
            "price": 1487.88
          },
          {
            "date": "07-16",
            "price": 1486.2
          },
          {
            "date": "07-17",
            "price": 1478.85
          },
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
            "price": 1414.67
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1406.18
          },
          {
            "time": "11:00",
            "price": 1409.01
          },
          {
            "time": "13:00",
            "price": 1411.84
          },
          {
            "time": "14:24",
            "price": 1414.67
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1131.66
          },
          {
            "date": "2026-08",
            "price": 1414.58
          }
        ]
      },
      "newsEn": [
        {
          "title": "South Korean Won Rises - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMifkFVX3lxTE1PT2hlY29GY0dhZGU0dDZvVXFBYWZmNGg0eU50Y0FjVGN2TmNlZVIxdkFCMzFKc0FYYzB5YUpDOFc4X0ZzTV9mZXlKbFlxWVdoTzREb1JEd2pGdVVzTWhUM19fZ3hScjJJRmlLVG5UQnhldkRZXzhSeVN0NFhXQQ?oc=5",
          "date": "08-14 12:42"
        },
        {
          "title": "Asia FX ticks up, dollar dips after soft U.S. PPI curbs Fed hike bets - Investing.com UK",
          "source": "Investing.com UK",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQbGNRaXNrUWdMYy04YXNGdkFCLXk3NVA4MWxJdURUUkxsMEN0STgtOVFwUl9SbTV6Wk1YOXBfWnlZcW5YVUNTemtrdDBFV19pbjd5ZlVNQ3NDbjBHQnhRdUNEakZlSUlZdlByNkZtZnpiUmJmaWkyMW1uY0UyQktRaUJENnFnOHpyR19DLW1oSEZZbmhwWVJQN3RkeExFd3NSVENGcFYtZVc2V3RsMEVUQ2hsSEJFdw?oc=5",
          "date": "08-14 14:18"
        },
        {
          "title": "Canadian Dollar CAD/USD Overview - CME Group",
          "source": "CME Group",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9GQklIb3JlZjBWc0VaM296ZGlibGdKM0FjVzR3eTk1dDNNODV3QVdZUVpaRHYyMUNqdkZwSTJubThfVGk1VFZ2WXd3UExDaU1sdVZGczI0R29xV1V3ZW9vYjRGR3c4WkFjMGM0Vg?oc=5",
          "date": "08-11 21:10"
        },
        {
          "title": "Korean Won Rebounds After Three Days on Import Demand, Dollar Strength - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQeU8xcUdRVTlBSHlDa3BuMVNybjY1cXQxSEtSSk9tbGI5WktKcUUzVjFSelRuVWxCOVpUd3Jac18xajVPcXBGLXVkb1dzdlZhdjhCVEZvbDByWEJDUHpvVDRGdU5oTVdnN1NpRjJKU1h5eVJZaWdELTZCOVdLZThmd2E0WmU2RnRMSmt4UWNlRm5hQzYwemlzNmNRYw?oc=5",
          "date": "08-13 16:13"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 물가 둔화와 위험선호, 환율도 하방 압력 지속 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBiNk03QWQ1X2tCNGFEa3pDaUJPUmN1dnptR3B6NHA0VFl6TmNRVVJCd1FoV0F4VVE5dlU0WGhmRnpuUXpIWm5zSjZZQ3pPWGtmWG1ySktLTUFOZW5PLWdnNQ?oc=5",
          "date": "08-14 08:04"
        },
        {
          "title": "연준 인상 베팅 또 후퇴ㆍ엔화도 변수⋯\"1410원 초중반서 하락\" [환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE41c1JzZ3ljR3pUcDkyVFFRaGU1OTdmcmFVMmRMNVpfeFlBUV9BbllkNTVrWVVYOTA2Um5va2VHcTJtelBZSmRKUHpTZ3l0R0M2YjQ4Qw?oc=5",
          "date": "08-14 07:55"
        },
        {
          "title": "원·달러 환율, 1418.53원…점진적 하락세 지속 전망 - 조세일보",
          "source": "조세일보",
          "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE5yaHY2WlBiQ2ZJYVJRd1h2RHVwS296UUVaay1nZVYzWVFlSDFEVWFLQmctU1U2SlhOcy1MN3dBUThTY2hVR2pTOEY5VlVJaUwwS3lJQ21FUTFsSTg5eDgw?oc=5",
          "date": "08-14 07:49"
        },
        {
          "title": "강달러에 서학개미 환전 등 저가매수세⋯\"1410원 후반서 상승\" [환율전망] - v.daum.net",
          "source": "v.daum.net",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE85TVZqS25tYmVwRWNrTkFrY0xSVUNaYXd1cjJUVGEyYm44VWUwZTVqMjJLdFFIeUNBTWk2cVFENWRucjNVbXZaeE5GMXJQckZIaHFHdg?oc=5",
          "date": "08-13 08:23"
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
      "price": 1631.8,
      "change": -72.05,
      "changePercent": -4.23,
      "high52w": 1807.42,
      "low52w": 1592.84,
      "high24h": 1636.6,
      "low24h": 1628.8,
      "volume": 0,
      "sparkline": [
        1642.01,
        1638.82,
        1618.62,
        1635.36,
        1628.62,
        1632.86,
        1631.8
      ],
      "history": {
        "7D": [
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
            "price": 1631.8
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 1703.85
          },
          {
            "date": "07-15",
            "price": 1698.0
          },
          {
            "date": "07-16",
            "price": 1707.87
          },
          {
            "date": "07-17",
            "price": 1692.64
          },
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
            "price": 1631.8
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1622.01
          },
          {
            "time": "11:00",
            "price": 1625.27
          },
          {
            "time": "13:00",
            "price": 1628.54
          },
          {
            "time": "14:24",
            "price": 1631.8
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 1304.08
          },
          {
            "date": "2026-08",
            "price": 1630.1
          }
        ]
      },
      "newsEn": [
        {
          "title": "Korean Won Rebounds After Three Days on Import Demand, Dollar Strength - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQeU8xcUdRVTlBSHlDa3BuMVNybjY1cXQxSEtSSk9tbGI5WktKcUUzVjFSelRuVWxCOVpUd3Jac18xajVPcXBGLXVkb1dzdlZhdjhCVEZvbDByWEJDUHpvVDRGdU5oTVdnN1NpRjJKU1h5eVJZaWdELTZCOVdLZThmd2E0WmU2RnRMSmt4UWNlRm5hQzYwemlzNmNRYw?oc=5",
          "date": "08-13 16:13"
        },
        {
          "title": "Korean Won Jumps 9.4%, But Ranks Second in Currency Volatility - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPQ29nLUJ6ZXBQQThoQk1ySFFoeERNcDE4UU1PVVBSWi1ObG5TRWRMVEFSbGl5TW1hTnFoUldkT2FZNTFnekRiOEZZZGxhWG9kOTFIeG01MzduTUNVX05vYU9RQlhhYmZnel90dWJyd1lkX0lPZTFIemE3ampBMjFGa2l4Tks1aFVOamt1bk9FT1NRMnhvNUFzYXdRclNKU2M?oc=5",
          "date": "08-13 13:04"
        },
        {
          "title": "Citi sees Bank of Korea rate hike on inflation concerns By Investing.com - Investing.com India",
          "source": "Investing.com India",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPTEhiZlVBNE9UNFFJSFRHa3dNWDZwSVBYek51dnQ3R0V1WjVSRWFWRkZwRjNudWlDR0prd3hCaE5SdGFBQkNaUWMySi1ZYUduWl9Vc2dQVHRXYU1NbkczNUFXZTJZZ2pYN0NWRnlDeGRNUnJEb0JsZ1hvVlI1QU1zek94Y3Vvamp0LU4yamtKUjBtRVpEZi12dmw1RHRiZlhmNU1SQ2RPdVd2TldkTHBqQy1qYXR4cms?oc=5",
          "date": "08-12 19:29"
        },
        {
          "title": "CBA currency exchange rates (12.08.2026) - Report.az",
          "source": "Report.az",
          "link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE9XSnhiMjVzajVuQUZCUFM4YlQtc3p5Q2l3ekhsX1NEZXN3ZDNnSk1BNkVXcF94bk41Nml3cjBvcVNwbHpnWEkxaS1QSmlfaGFqRXdCVkhWbVVLRTRTeUlQLXlYMWtNa3ZaeVBYdl9IYndXQjUwWUZRTU1uWdIBe0FVX3lxTE9XSnhiMjVzajVuQUZCUFM4YlQtc3p5Q2l3ekhsX1NEZXN3ZDNnSk1BNkVXcF94bk41Nml3cjBvcVNwbHpnWEkxaS1QSmlfaGFqRXdCVkhWbVVLRTRTeUlQLXlYMWtNa3ZaeVBYdl9IYndXQjUwWUZRTU1uWQ?oc=5",
          "date": "08-12 14:35"
        }
      ],
      "newsKr": [
        {
          "title": "환율·유가 하락에 7월 수입물가 1.0%↓…두달 연속 하락 - 연합뉴스",
          "source": "연합뉴스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1VRzFtWExLLUJZM0NMdl9VOGE2YmpWbndUdnRBQ1RHdEhJOW9xT2ZZMnVUU3BoNzlSWVpicmFhbldDZUhaSUR6Zm5SLXR0a214dkFxanRoVW5BTTJZVnBRNNIBYEFVX3lxTE1VRzFtWExLLUJZM0NMdl9VOGE2YmpWbndUdnRBQ1RHdEhJOW9xT2ZZMnVUU3BoNzlSWVpicmFhbldDZUhaSUR6Zm5SLXR0a214dkFxanRoVW5BTTJZVnBRNA?oc=5",
          "date": "08-14 06:00"
        },
        {
          "title": "국제유가, '석유 수요 감소' IEA 전망에 하락 - TBS 서울",
          "source": "TBS 서울",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxOQS0ySVQ3cHQwVGZ3M19Yenloa2dRM1hGcTdQcHluRzNiNTZOdE5DcWZYQ196UzVJb0Ntb2R5RHlTblphT2tFY0JMakVBNjBhbG1Gd0dtRFBxTF9wUFUxWU9oUHNoV2VCTkFVZ3R3OUR2Y2JyU2FIRm41TzRTYW9RLTZCbThWS2ZMLUM1dw?oc=5",
          "date": "08-14 07:24"
        },
        {
          "title": "美 생산자물가 예상 하회…달러·원 환율 1416원대 출발 - 뉴스1",
          "source": "뉴스1",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBIZ0xlbmFodzY4WXhsVTROXy1CbjBBaDV1aFZPNm9uOE1PcG1DeEFKZ2tlTUo0M01Sb0VuZlU3VHNyWXgyMHlzemxXN0lMT08ybDc0TkRNU25NcDlBZy1MY9IBYEFVX3lxTFBIZ0xlbmFodzY4WXhsVTROXy1CbjBBaDV1aFZPNm9uOE1PcG1DeEFKZ2tlTUo0M01Sb0VuZlU3VHNyWXgyMHlzemxXN0lMT08ybDc0TkRNU25NcDlBZy1MYw?oc=5",
          "date": "08-14 09:47"
        },
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - LiteFinance",
          "source": "LiteFinance",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "08-12 14:49"
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
  initHappyCow();
  renderApp();
  startSilentAutoRefresh();
});

// Happy Cow Entertaining Widget Logic
const COW_QUOTES = [
  "음메에에~ 행복 충전! 🍀",
  "걱정은 체하니까 퉤 뱉어버리소! 💨",
  "일단 탄수화물부터 채우소! 🍔",
  "복잡한 생각은 싹 비워버리소~ 🍃",
  "인생 뭐 별거 있소, 풀 뜯으러 가소~ 🌿",
  "마음도 잔디밭처럼 평온하소~ 🌾",
  "맛난 거 먹으러 가소! 🥩",
  "행복은 밥그릇 안에 있소! 🍚",
  "오늘은 새 풀을 뜯으소! 🍀",
  "평범한 하루가 제일 좋은 하루요! ☀️",
  "내 발걸음대로 묵묵히 걸으소! 🐢",
  "달달하게 당 충전 하소! 🍰",
  "하나만 건져도 대성공이오! 🎣",
  "시원하게 음메~ 한번 하소! 🐮",
  "일희일비하며 힘 빼지 마소! 🐎",
  "물 흘러가는 대로 두소! 🌊",
  "오늘 하루도 충분히 잘했소! 👏",
  "단순하게 사는 게 가장 편하소! 🧩",
  "따뜻한 샤워로 피로를 풀소! 🚿",
  "향긋한 커피 한잔 즐기소! ☕",
  "오늘 하루도 힘내소! 💪",
  "스트레스 다 날려버리소! ✨",
  "웃으면 복이 오소~ 😊",
  "잠깐 기지개 한번 켜소~ 🧘",
  "토닥토닥 잘하고 있소! 💛",
  "항상 응원하고 있소~ 🐮",
  "마음 편안히 가지소~ 🌿",
  "당신이 최고소! 👍"
];

function initHappyCow() {
  const cowBtn = document.getElementById('cowBtn');
  const cowIcon = document.getElementById('cowIcon');
  const cowCountBadge = document.getElementById('cowCountBadge');
  const cowSpeech = document.getElementById('cowSpeech');
  const cowBar = document.getElementById('happyCowBar');

  if (!cowBtn || !cowCountBadge) return;

  // Retrieve stored moo count or start with 0
  let mooCount = parseInt(localStorage.getItem('commodity_happy_moo_count') || '0', 10);
  cowCountBadge.textContent = `${mooCount} 음메`;

  cowBtn.addEventListener('click', (e) => {
    mooCount++;
    localStorage.setItem('commodity_happy_moo_count', mooCount);
    cowCountBadge.textContent = `${mooCount} 음메`;

    // Trigger pop & wiggle animations
    cowIcon.classList.remove('wiggle');
    void cowIcon.offsetWidth; // trigger reflow
    cowIcon.classList.add('wiggle');

    cowCountBadge.classList.remove('pop');
    void cowCountBadge.offsetWidth;
    cowCountBadge.classList.add('pop');

    // Change quote randomly
    const randomQuote = COW_QUOTES[Math.floor(Math.random() * COW_QUOTES.length)];
    if (cowSpeech) {
      cowSpeech.textContent = `"${randomQuote}"`;
    }

    // Spawn floating particle effect
    if (cowBar) {
      const particle = document.createElement('div');
      particle.className = 'moo-particle';
      const emojis = ['🐮 +1 음메!', '🥛 음메~', '🍀 음메!', '🧈 최고소!', '✨ +1', '🎉 1음메 추가!'];
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      
      const rect = cowBtn.getBoundingClientRect();
      const barRect = cowBar.getBoundingClientRect();
      
      particle.style.left = `${Math.max(10, rect.left - barRect.left + 15)}px`;
      particle.style.top = `${rect.top - barRect.top - 8}px`;
      
      cowBar.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }
  });
}

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
  const btnGithubGuide = document.getElementById('btnGithubGuide');
  const closeGuideModal = document.getElementById('closeGuideModal');

  if (btnGithubGuide && guideModal) {
    btnGithubGuide.addEventListener('click', () => {
      guideModal.classList.add('open');
    });
  }
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
}

function setCurrency(curr) {
  appState.currency = curr;
  renderApp();
}

function renderApp() {
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
  const updatedDate = new Date(appState.data.lastForexUpdated || appState.data.lastUpdated || Date.now());
  const formatted = updatedDate.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const usdRate = appState.data.usdKrwRate ? `₩${appState.data.usdKrwRate.toLocaleString('ko-KR')}` : '-';
  const eurRate = appState.data.eurKrwRate ? `₩${appState.data.eurKrwRate.toLocaleString('ko-KR')}` : '-';
  document.getElementById('lastUpdatedText').textContent = `실시간 환율: USD/KRW ${usdRate} · EUR/KRW ${eurRate} (${formatted} 기준)`;
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
  container.innerHTML = '';

  const items = appState.data.items.slice(0, 4); // Top 4 priority commodities

  items.forEach(item => {
    const isGain = item.change >= 0;
    const badgeClass = isGain ? 'badge-gain' : 'badge-loss';
    const sign = isGain ? '+' : '';
    const icon = ITEM_ICONS[item.id] || '📦';
    const isActive = item.id === appState.selectedItemId;

    const card = document.createElement('div');
    card.className = `metric-card ${isActive ? 'active-card' : ''}`;
    card.dataset.id = item.id;

    const shortKrName = item.nameKr.split(' ')[0];

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon-title">
          <span class="card-icon">${icon}</span>
          <div>
            <div class="card-title-kr">
              <span class="title-desktop">${item.nameKr}</span>
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
      <div class="card-value">${formatPrice(item.price, item.currency)}</div>
      <div class="card-subtext">
        <span>${item.unitKr}</span>
        <span>변동: ${sign}${item.change}</span>
      </div>
      <canvas class="card-sparkline" id="spark_${item.id}"></canvas>
    `;

    card.addEventListener('click', () => {
      appState.selectedItemId = item.id;
      document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');
      renderMainChart();
    });

    container.appendChild(card);
    
    // Draw mini sparkline
    setTimeout(() => drawMiniSparkline(`spark_${item.id}`, item.sparkline, isGain), 50);
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

  document.getElementById('chartTitle').textContent = `${icon} ${selectedItem.nameKr} 시세 추이`;
  document.getElementById('chartSubtitle').innerHTML = `${exLink} · ${selectedItem.unitKr} (${selectedItem.symbol})`;

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
          bodyColor: '#94A3B8',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return ` 시세: ${formatPrice(rawPrices[context.dataIndex], selectedItem.currency)}`;
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
        <div class="cell-unit">${item.unitKr}</div>
      </td>
      <td>
        <span class="badge-change ${badgeClass}">
          ${sign}${item.changePercent.toFixed(2)}% (${sign}${item.change})
        </span>
      </td>
      <td>
        <div style="font-size:13px; font-weight:600; color:#E2E8F0;">${formatPrice(item.high24h, item.currency)}</div>
        <div style="font-size:12px; color:#64748B;">저가 ${formatPrice(item.low24h, item.currency)}</div>
      </td>
      <td>
        <div class="range-bar-container">
          <div class="range-labels">
            <span>52주 저</span>
            <span>52주 고</span>
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
        document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active-card'));
        const activeMetric = document.querySelector(`.metric-card[data-id="${item.id}"]`);
        if (activeMetric) activeMetric.classList.add('active-card');
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

  const articlesHtml = (item.news && item.news.length > 0) ? item.news.slice(0, 2).map(art => `
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); padding:12px; border-radius:8px; margin-bottom:8px;">
      <a href="${art.link}" target="_blank" style="font-size:13px; font-weight:700; color:#60A5FA; text-decoration:none;">${art.title}</a>
      <div style="font-size:11px; color:#94A3B8; margin-top:4px;">출처: ${art.source} · ${art.date || ''}</div>
    </div>
  `).join('') : '';

  document.getElementById('detailBody').innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; margin-bottom:20px;">
      <div>
        <div style="font-size:13px; color:#94A3B8;">현재 시세</div>
        <div style="font-size:32px; font-family:'Outfit'; font-weight:800; color:#FFF;">${formatPrice(item.price, item.currency)}</div>
        <div style="font-size:13px; color:#64748B;">단위: ${item.unitKr} (${item.unit})</div>
      </div>
      <div style="text-align:right;">
        <span class="badge-change ${isGain ? 'badge-gain' : 'badge-loss'}" style="font-size:16px; padding:6px 14px;">
          ${sign}${item.changePercent.toFixed(2)}% (${sign}${item.change})
        </span>
        <div style="font-size:12px; color:#94A3B8; margin-top:8px;">거래소: ${item.exchange}</div>
      </div>
    </div>

    <h4 style="font-size:16px; margin-bottom:8px; color:#F8FAFC;">📌 품목 개요 및 시장 동향</h4>
    <p style="font-size:14px; color:#94A3B8; line-height:1.6; margin-bottom:24px;">${item.description}</p>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
      <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px; color:#64748B;">52주 최고가</div>
        <div style="font-size:18px; font-weight:700; color:#F8FAFC; margin-top:4px;">${formatPrice(item.high52w, item.currency)}</div>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:10px; border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px; color:#64748B;">52주 최저가</div>
        <div style="font-size:18px; font-weight:700; color:#F8FAFC; margin-top:4px;">${formatPrice(item.low52w, item.currency)}</div>
      </div>
    </div>

    <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.2); padding:18px; border-radius:12px; margin-bottom:24px;">
      <h4 style="font-size:15px; font-weight:700; color:#10B981; margin-bottom:10px;">📰 최근 주요 뉴스 헤드라인 & 포털 검색</h4>
      ${articlesHtml}
      <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn-primary" style="padding:6px 12px; font-size:12px; background:#03CF5D; color:#FFF; font-weight:700;" onclick="window.open('https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(item.naverQuery || (item.nameKr.split(' ')[0] + ' 가격'))}', '_blank')">네이버 뉴스 ('${item.naverQuery || (item.nameKr.split(' ')[0] + ' 가격')}')</button>
        <button class="btn-primary" style="padding:6px 12px; font-size:12px; background:linear-gradient(135deg, #059669 0%, #047857 100%);" onclick="openNews('${item.id}')">전체 관련 뉴스 보기</button>
      </div>
    </div>

    <div style="text-align:right;">
      <button class="btn-primary" onclick="selectAndCloseModal('${item.id}')">차트에 이 품목 표시</button>
    </div>
  `;

  document.getElementById('detailModal').classList.add('open');
}

function selectAndCloseModal(itemId) {
  appState.selectedItemId = itemId;
  document.getElementById('detailModal').classList.remove('open');
  renderMainChart();
}
