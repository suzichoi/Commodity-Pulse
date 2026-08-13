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
  "lastUpdated": "2026-08-13T15:07:39.577672+09:00",
  "usdKrwRate": 1416.18,
  "eurKrwRate": 1630.6,
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
      "price": 5719.0,
      "change": 23.0,
      "changePercent": 0.4,
      "high52w": 8537.0,
      "low52w": 2798.0,
      "high24h": 5779.0,
      "low24h": 5574.0,
      "volume": 0,
      "sparkline": [
        5924.0,
        5882.0,
        5776.0,
        5782.0,
        5821.0,
        5543.0,
        5619.0
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 5684.69
          },
          {
            "time": "11:00",
            "price": 5696.12
          },
          {
            "time": "13:00",
            "price": 5707.56
          },
          {
            "time": "15:07",
            "price": 5719.0
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-13",
            "price": 5696.0
          },
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
          "title": "Cocoa Recovers Some Ground After Tuesday’s Sharp Drop on Beneficial West African Weather - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiywFBVV95cUxOT2NCUWpMMTZhRUhEVnExZVNGSEdaMHFfbXBBbUx2N3FNVmIzNHlwRmt6Y2xLU2pCbnN4dkRGVU1zV3U0bEdxZm12WXhJdEQ4UkhwZGd0SHA0bGhnME4tZ1pGcTB6YTNHVzNHeldfMVBqT0FEdU92N0h6Ni1LcElIcWIzWllyVkdWaGdXdFBqSnBib19WLURpRWZBdGtCRjFKdUF5UzVLSFRyY0Rpa3RZNG5Fdzhwc09LTEhaeUo2QmtrM0RjVnIyb3lOYw?oc=5",
          "date": "08-13 01:32"
        },
        {
          "title": "Kirkland chocolate chips return to Costco shelves after 2-year hiatus - eciks.org",
          "source": "eciks.org",
          "link": "https://news.google.com/rss/articles/CBMib0FVX3lxTE5TN0hwNV9ZaU8yYnJLOWRPcV9pQzRKUjBTLWtuc2hVRzF1Z21MSmRWdmNOWldBeDZwT0YzdXc0X1dobTIzUEE4M29QOFpLTnhkSUJ5UEN6Nl9FWURib2dJSUM3RF9melMybFFORk1RUQ?oc=5",
          "date": "08-12 14:21"
        },
        {
          "title": "Exceptional Growing Conditions in West Africa Weigh on Cocoa Prices - finance.yahoo.com",
          "source": "finance.yahoo.com",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPZXBNdHV6T0pCVmlyc1J3dS1JX1plMlloMUZSWVEtT2dzVWM3ZlBBQjd3eEdGeEpEcjlrb3N6YW10SElQT3lETTVhdlNQeGFkS1dUazRyUnJuV1FpQmNVVi0tSTBzMG5mQ2QyWVVYRU1IWVltZUhZUm55Nlg1NVVyRktQeVNCZ0NGN2MwU1cwSlBPTTNmN05NRXhVYVNhMDllZ2dLZ3RHV1ZYb0hJQjAzVkVR?oc=5",
          "date": "08-12 01:03"
        },
        {
          "title": "With West Africa cocoa under strain, can Brazil supply more to Switzerland? - SWI swissinfo.ch",
          "source": "SWI swissinfo.ch",
          "link": "https://news.google.com/rss/articles/CBMisgJBVV95cUxOU0ZvZXEweWt4Q3JvSjBoRThnNnh0MTdJbmM0T1V2allwUzAwM1ZjTXlEdlJRS3dJdjRxUUFoYTQ0V0hqc21WRlYwZm5GRGdjLTFPb3hOQkhaYzYzV3ZqZWRxUXA5TWkyeUFZV0NFRzdjQnVDbUZfMDZWS0RsZzlIR0RZWUVPaHdkSm5wczV6VnpUNmFEOG9jM2xldTFUV004VmVBQUgwVjVLSXhYQkkxVmlOMjBURGFHbGtKVXF5RDZWM0t6MVFHR01XOUk5MHpyRDZEYUxFWEVsalFqOF82Y3U3NkVFU0pSR1M0NXJGWk5uTWFWZTB4dDltX2lVal9qdFJTdjE2a0FlTGhkaGVLb3Bra1ByV1dZMjlJclVVRUZiVHlCc2IwX1VnQ1lIRHJFaUE?oc=5",
          "date": "08-12 16:00"
        }
      ],
      "newsKr": [
        {
          "title": "가뭄에 라인강 멈추고 밥상 물가 껑충…‘기후플레이션’의 경고 - 에너지경제신문",
          "source": "에너지경제신문",
          "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1TYXh1TlgxZ2VRRFVwYjVZeFd3SURMeUZ3WkpPaGtZdEgycHh4TFg4NTRSbWlkNi1VT2VINkpPUlZHSnhfMEViWmdvbnpNbS0wejBFSDVtc2ZqRmc?oc=5",
          "date": "08-13 10:11"
        },
        {
          "title": "\"밥상 물가 더 오른다\"…슈퍼 엘니뇨에 세계 식량 가격 우려 - hankyung.com",
          "source": "hankyung.com",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE00ZlVQd1BPZ2dIYWZPdTJLeFdwUTRTaU1Na2J2NndETUV4cjdiZFJ0ZmY1TVF2YWRyM2dKNmpDblVHSFRBd1pONHBWOWVCd3Fub1dJS1d3azRJUQ?oc=5",
          "date": "08-12 09:00"
        },
        {
          "title": "롯데웰푸드, 2분기 깜짝 실적에 주가 껑충 - thecommoditiesnews.com",
          "source": "thecommoditiesnews.com",
          "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTFAxTDBHMDR4Rk1DQV8yZTl5NnAtUTRaYlh4UkpmT3NhenNhczliOGJBU3FONHhXb2xJeVk0NTMyMzFRVU1wME1oNWRBZERZMlhuR1lCVzZHRWtxaDRBb2lhZjBGckNoS3dtWW1NamNhNjR6M2Z5TW9V?oc=5",
          "date": "08-10 17:30"
        },
        {
          "title": "전쟁에 엘니뇨까지 덮쳐 세계 식량가격 급등…식품업계 '좌불안석' - 연합인포맥스",
          "source": "연합인포맥스",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTE1YY0E5NEwxVGFTMzVIZk1rMjBBZUUzc3Z1MXJpVHhWQklNRV9tVWVQQUdHem1CQW1GTmtWTW5YR09DM1E4SUt2eWZtb3pYT2RLUXZiYTREVXIzTXpiclpheW1oSjV4Sk9rMzVzUDcxMkQ?oc=5",
          "date": "08-12 09:24"
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
      "price": 317.25,
      "change": -24.15,
      "changePercent": -7.07,
      "high52w": 437.95,
      "low52w": 242.7,
      "high24h": 321.2,
      "low24h": 313.55,
      "volume": 0,
      "sparkline": [
        324.1,
        326.9,
        321.65,
        335.55,
        332.3,
        335.75,
        340.1
      ],
      "history": {
        "1D": [
          {
            "time": "09:00",
            "price": 315.35
          },
          {
            "time": "11:00",
            "price": 315.98
          },
          {
            "time": "13:00",
            "price": 316.62
          },
          {
            "time": "15:07",
            "price": 317.25
          }
        ],
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-13",
            "price": 341.4
          },
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
          "title": "Coffee Prices See Support as Colombian Earthquake Temporarily Halts Exports - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNZlJKUlhBcy1XWkN2UnRzd3NQS0JlNDZBeVJXRGVPZzBVMGlXN1RuU3o3RUFHc01xYjRmWVlXVWNEZGJmcGNka09kdTYyc0k4dnVwTlgtUlYtdjdkRld6aC02OUpVWUhaS05MY1Fra3hFdTQ3SjBmUmcyZFM3TFpkQldJWTBzU09RRVdMU2VtU3VOdWRMU0F6T18tcGJHOXBSYUk1bmVjTnNDNC0yR3lQOHBhcGkzZTgycWxB?oc=5",
          "date": "08-13 01:08"
        },
        {
          "title": "Jefferies maintains Keurig Dr Pepper and Smucker ratings amid coffee price surge - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxPdGtDcFBQenc3c0R2S0Vkc3p3VE9Dd1R0alRhNXd4THk1TkJ5Z21ESXJRNlMyZzduaFB4cVhpU3R1Y2I3OXdCT3E1d2dMOHFnTzdVWElPd2ZiRGlWVVUzWlduNFRHNHdvUHYyOFZ4cGpDOWNhZTZBZE1DaTZqQWY2d2tpMy02YjJoSlE2aWJjaGRNem82TFNTblpJcWRSNFd1TFRSdlJMUXViTG9lY3pVSkhjb2ZFRVI1R1dubVZUbGIwRHVyQkxoT1ozVThFNjN6R2liU1RhM0dkNFl5czh3REdPRmM?oc=5",
          "date": "08-13 00:58"
        },
        {
          "title": "Brazil Coffee Market Report: Mixed Prices, Slow Harvest, and El Niño Concerns | August 2026 - News and Statistics - IndexBox",
          "source": "IndexBox",
          "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxQSVR5R3VsQmEyZEhqNUg4MW9yYVBtcVVpbVhET2ktSF9ndFRHRFNWTThFaUF3YkZFVHVXV0U0elNEbVg3U3lXZnRMSXhNSnBWRGFBWUUyN1R4bkU2Z09SdnF5WmhMYWwyTnlXQjUzRVZ0bnpEZ1VoTDk1MFM3VWNTYlZQMA?oc=5",
          "date": "08-12 04:30"
        },
        {
          "title": "Coffee markets: Arabica prices rebounded strongly on Friday, driven by the weak dollar and the very low level of certified stocks - Comunicaffe International",
          "source": "Comunicaffe International",
          "link": "https://news.google.com/rss/articles/CBMilgJBVV95cUxNaC01SVJvYThvLU9kWUpHSXdaemZ2aFBSWFh5SWxmcGF3VFpyd1JLZjdhOGR4ZTVsZ2d3Y2wxVHp3UnVHbFh3RFFQamk1Z2tJd0FOZzUxMTJBRjVncjZLQWdwcjVXLUNLbkFKRzZ5RTF3d2R3bjNzcWpNWHVDeWZfdGtrQ1BFTjVJYWZiRTN0MExlbFdUNHI3V1NldXF1bk4zZ2pVeVF0OXkwZ3BiNVFIUG9fQXVhc3Jkb0NmM3dPRGt3U01GNFNwTFdTWWZaRF92OThwRERHUkRVSmtWVTYyRnRUQWRMZkRKYmdNZk1wdkJ5R2VNbTZVVlBnd3hYaGJlMUZqYkRQUzZhVmsyZWU3Y0R5Z0NCZw?oc=5",
          "date": "08-10 18:20"
        }
      ],
      "newsKr": [
        {
          "title": "콜롬비아 강진에 커피 수출길 차질… 글로벌 원두 공급 우려 - 조선비즈 - Chosunbiz",
          "source": "Chosunbiz",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxQTHBxeFE3ZG0wSDlzdkt2S3ZUMGhhZzZXVldFdUZGN2x5WDMxLW1CbllqUi1acWpWLXBMLXhDSGlBT3YyUUFiUFlWZTBHR1JUc3M2TUtuN3Jka0Z4OTQtdGs1UzcwR3d1RDJuUkdFRlpyRVhNUWYxZXI5ZkpxTXpGMVk1T0xTc0xxeDhKeWR0a3VSZEt1RkJpRV96TnB5UdIBsgFBVV95cUxOaVFEaERjZUlMU25yYy1mdkJMd1FuQ0dkbk44U1JBMVhRWExaa01FX2F4R3pwZEx0cmdQdXZ0N1R4Vjg1NFZJY2tla2ZSU1k3V3JkeWY3b0ZhNm0ydjZLUGkzakpWbDRLcUM2WDBDOWxYTUw0MjFZUmZ3Y05FM1UyX05JVmFtVjlIaVYyaTlhczVZVGJYa1dtZ3hfcHRvRFg5Y3B0WFE2NTByZE5EZUVfVUJR?oc=5",
          "date": "08-13 11:04"
        },
        {
          "title": "오늘(8월 13일) 커피 가격은 kg당 500 VND 하락했으며, 로부스타 가격은 하락세를 이어갔습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPbDlaTnp4VmFqWkxXRU1sU19QWXlQSnVfVm50WkFXeFJ6Y3l6U0otXzZoaTkwWjQyQXpGdHRnUmJCVkdSYWVoU2xERTdPQV95V0tOZDRGWkh6NHA0Y2k5eUw4OTRmTWdySGhfckF3dTNtWlhpQU9rOVZIazFydUktekdxMGhXMENJS2RlamZiYWNVQ1dlNTY0?oc=5",
          "date": "08-13 08:46"
        },
        {
          "title": "콜롬비아 강진에 커피 생산·수출망 마비...커피 원두 시장 비상 - thecommoditiesnews.com",
          "source": "thecommoditiesnews.com",
          "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTE1TSGd1c0dWLW5hNklXV3Bqbk90VlBkek9aMy1PZTRUQTJnU2ZvRUxzaXZCNFpmSTB6WnRSUVRvNnBqdjJhTmVJX2R4aEVuWUtaRF9kQjZPeWR6dTNWb1QtM0VjSzg3NXprWUpnQ29YQUJKLTlMNFZ3?oc=5",
          "date": "08-12 14:20"
        },
        {
          "title": "콜롬비아, 강진 여파에 커피 수출 작업 중단…아라비카 커피 선물 5주 최고치 - 아주경제",
          "source": "아주경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE8xQ0hPY0pSM1VCZWREY2JyZFdGSXBzVHZHTnpNamlMVzNJOElnX0ZjZTlyNVBoeUZiWUJzVzJMSkxsYVBYMUFleUVlZ0VRX0hOcUx6Y1llcFRDUdIBWEFVX3lxTE1zams5dXptS19uYkJNQ01FT3ZjSGFfY1oxaVlwczlPUGxUTk4wQ2JDR2JUZjRxNmVJQlgyRk5aTlRSUnd2Z3ZRd0JPbDdjSWF2QWE1d0ZXVEo?oc=5",
          "date": "08-12 10:06"
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
      "price": 3754.0,
      "change": -26.0,
      "changePercent": -0.69,
      "high52w": 4692.5,
      "low52w": 3003.2,
      "high24h": 3754.0,
      "low24h": 3754.0,
      "volume": 12850,
      "sparkline": [
        3866.62,
        3829.08,
        3810.31,
        3791.54,
        3784.03,
        3772.77,
        3754.0
      ],
      "history": {
        "7D": [
          {
            "date": "08-06",
            "price": 3866.62
          },
          {
            "date": "08-07",
            "price": 3829.08
          },
          {
            "date": "08-08",
            "price": 3810.31
          },
          {
            "date": "08-09",
            "price": 3791.54
          },
          {
            "date": "08-10",
            "price": 3784.03
          },
          {
            "date": "08-11",
            "price": 3772.77
          },
          {
            "date": "08-12",
            "price": 3754.0
          }
        ],
        "1M": [
          {
            "date": "07-14",
            "price": 4654.96
          },
          {
            "date": "07-15",
            "price": 4617.42
          },
          {
            "date": "07-16",
            "price": 4579.88
          },
          {
            "date": "07-17",
            "price": 4542.34
          },
          {
            "date": "07-18",
            "price": 4504.8
          },
          {
            "date": "07-19",
            "price": 4467.26
          },
          {
            "date": "07-20",
            "price": 4429.72
          },
          {
            "date": "07-21",
            "price": 4392.18
          },
          {
            "date": "07-22",
            "price": 4354.64
          },
          {
            "date": "07-23",
            "price": 4317.1
          },
          {
            "date": "07-24",
            "price": 4279.56
          },
          {
            "date": "07-25",
            "price": 4242.02
          },
          {
            "date": "07-26",
            "price": 4204.48
          },
          {
            "date": "07-27",
            "price": 4166.94
          },
          {
            "date": "07-28",
            "price": 4129.4
          },
          {
            "date": "07-29",
            "price": 4091.86
          },
          {
            "date": "07-30",
            "price": 4054.32
          },
          {
            "date": "07-31",
            "price": 4016.78
          },
          {
            "date": "08-01",
            "price": 3979.24
          },
          {
            "date": "08-02",
            "price": 3941.7
          },
          {
            "date": "08-03",
            "price": 3904.16
          },
          {
            "date": "08-04",
            "price": 3866.62
          },
          {
            "date": "08-05",
            "price": 3829.08
          },
          {
            "date": "08-06",
            "price": 3810.31
          },
          {
            "date": "08-07",
            "price": 3791.54
          },
          {
            "date": "08-08",
            "price": 3784.03
          },
          {
            "date": "08-09",
            "price": 3772.77
          },
          {
            "date": "08-10",
            "price": 3754.0
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 3731.48
          },
          {
            "time": "11:00",
            "price": 3738.98
          },
          {
            "time": "13:00",
            "price": 3746.49
          },
          {
            "time": "15:07",
            "price": 3754.0
          }
        ],
        "1Y": [
          {
            "date": "2025-08",
            "price": 4504.8
          },
          {
            "date": "2025-09",
            "price": 4579.88
          },
          {
            "date": "2025-10",
            "price": 4654.96
          },
          {
            "date": "2025-11",
            "price": 4692.5
          },
          {
            "date": "2025-12",
            "price": 4617.42
          },
          {
            "date": "2026-01",
            "price": 4542.34
          },
          {
            "date": "2026-02",
            "price": 4429.72
          },
          {
            "date": "2026-03",
            "price": 4317.1
          },
          {
            "date": "2026-04",
            "price": 4204.48
          },
          {
            "date": "2026-05",
            "price": 4091.86
          },
          {
            "date": "2026-06",
            "price": 3979.24
          },
          {
            "date": "2026-07",
            "price": 3866.62
          },
          {
            "date": "2026-08",
            "price": 3754.0
          }
        ]
      },
      "newsEn": [
        {
          "title": "Coffee Prices See Support as Colombian Earthquake Temporarily Halts Exports - Barchart.com",
          "source": "Barchart.com",
          "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNZlJKUlhBcy1XWkN2UnRzd3NQS0JlNDZBeVJXRGVPZzBVMGlXN1RuU3o3RUFHc01xYjRmWVlXVWNEZGJmcGNka09kdTYyc0k4dnVwTlgtUlYtdjdkRld6aC02OUpVWUhaS05MY1Fra3hFdTQ3SjBmUmcyZFM3TFpkQldJWTBzU09RRVdMU2VtU3VOdWRMU0F6T18tcGJHOXBSYUk1bmVjTnNDNC0yR3lQOHBhcGkzZTgycWxB?oc=5",
          "date": "08-13 01:08"
        },
        {
          "title": "Arabica Coffee Prices Undercut as Brazil Harvest Expected to Accelerate - TradingView",
          "source": "TradingView",
          "link": "https://news.google.com/rss/articles/CBMiygFBVV95cUxORDBaa24yY3pveTdodHdKeXpfRUR0OHBYVGlKQkhIb3NRelJlc3RCWVpqT2VhSXJQclo0QUVobzdpUkkyWG1TRGhRRC0zS1BuSzcwRGMxVGVYUkRDYVNRYjdtTG90SkV2N1NiUmhFeU1DLThPdGUxS1p5ZmpuYUNZY3ROelJCTm1FSXZLWUFLV0tlN1JlUUpZaU1tLU1NcXpGQUcwU3RMeXNQdHdQSlFXQkhkY2QtTDA2eUxzTFBfVmVyRHF3OUtDREdB?oc=5",
          "date": "08-11 03:21"
        },
        {
          "title": "Coffee prices today, August 13th: Mixed trends, robusta continues to fall. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQLTFhb2l1ZWF1ZThiU25ySEk0MzdKcjRKVFlMUWtkRE9VQ0NHRGlxbEttdHJacVExRjRENUdtVUpFZDVQTHdMcVc5S3ZxNjAzakdKR2plVHZTZ3k1YzkyRm5ZZXRYT3Frdm1qT21QcmJUY1VsZGhuVGszbUJLMUl4emthaDBjYTFIb3NYaUt0OV8yMkdEZ0xv?oc=5",
          "date": "08-13 08:35"
        },
        {
          "title": "Coffee markets: Arabica prices rebounded strongly on Friday, driven by the weak dollar and the very low level of certified stocks - Comunicaffe International",
          "source": "Comunicaffe International",
          "link": "https://news.google.com/rss/articles/CBMilgJBVV95cUxNaC01SVJvYThvLU9kWUpHSXdaemZ2aFBSWFh5SWxmcGF3VFpyd1JLZjdhOGR4ZTVsZ2d3Y2wxVHp3UnVHbFh3RFFQamk1Z2tJd0FOZzUxMTJBRjVncjZLQWdwcjVXLUNLbkFKRzZ5RTF3d2R3bjNzcWpNWHVDeWZfdGtrQ1BFTjVJYWZiRTN0MExlbFdUNHI3V1NldXF1bk4zZ2pVeVF0OXkwZ3BiNVFIUG9fQXVhc3Jkb0NmM3dPRGt3U01GNFNwTFdTWWZaRF92OThwRERHUkRVSmtWVTYyRnRUQWRMZkRKYmdNZk1wdkJ5R2VNbTZVVlBnd3hYaGJlMUZqYkRQUzZhVmsyZWU3Y0R5Z0NCZw?oc=5",
          "date": "08-10 18:20"
        }
      ],
      "newsKr": [
        {
          "title": "오늘(8월 13일) 커피 가격은 kg당 500 VND 하락했으며, 로부스타 가격은 하락세를 이어갔습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPbDlaTnp4VmFqWkxXRU1sU19QWXlQSnVfVm50WkFXeFJ6Y3l6U0otXzZoaTkwWjQyQXpGdHRnUmJCVkdSYWVoU2xERTdPQV95V0tOZDRGWkh6NHA0Y2k5eUw4OTRmTWdySGhfckF3dTNtWlhpQU9rOVZIazFydUktekdxMGhXMENJS2RlamZiYWNVQ1dlNTY0?oc=5",
          "date": "08-13 08:46"
        },
        {
          "title": "오늘(8월 13일) 커피 가격: 혼조세, 로부스타 가격 하락세 지속. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQdGJTWTlOdWdMck44SnNIUE9IWkdqNFQ0THBsNVpiZHNLMzNtNFJzRDExTlJzU1VENzc4N3J6THhYX0dHcWx6MjcxWnhMa0hIVjRkY3dlbS0yelFZckdpcjRfLUJwcHltb2VrY0Jib2NMLXNNNDVieHQwY3Bibng4LUVoZ3hlVWhfTGw5NEl1ZjNCd1NTWHJn?oc=5",
          "date": "08-13 08:31"
        },
        {
          "title": "2026년 8월 13일 현재 커피 가격: 커피 1톤당 최대 100만 VND 하락. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNRVItakhBZUNmTXh0UW9RV185M2l6WHlwNDFxT1UyZ3ZtY0VSY053MHJfT21WUi15TVFYTWFGNVA0b0VEZ01QUTBOTmx4WXdSRUhyT3BONTNLRHp3ZDlJZjRPNnZsNHV3SFZZZTljOGp5QTRNdEhaZmFDQVc1Q0hpMUdhSHZTdEpkMXNKMFRlOTNHZzYz?oc=5",
          "date": "08-13 14:42"
        },
        {
          "title": "압도적인 매도 압력으로 인해 밀과 로부스타 커피 가격이 동시에 하락했습니다. - Vietnam.vn",
          "source": "Vietnam.vn",
          "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQWU1LYmJmUFNUb1psZ2xKeTQ4anNoTC1zenBSRGJYMTZtZTJFeGtaNU9ub0ZSb3JiSEkyRC1wNXdkNnZtODljX1g4UFJlaGp1OTVvOXBtNWZ5U01PRTh6MF9JUl94UlhOTkhVRnVucFBJS19lenotc196UWFvaXBFMHNYbjY2UUU3TENkRg?oc=5",
          "date": "08-12 17:27"
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
        },
        {
          "title": "artificial insemination dairy | Former NZ Dairy Farmer Champions Bovine Genetics in Europe - en.edairynews.com",
          "source": "en.edairynews.com",
          "link": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNTUZzZGhrRDE4a1RuTEdzQmhNd3lzTmlNZGUzMUNUS2t2d0NZSHNNZ1FQX2oyai1MM0ZNS0dxbkxVNWJvaVNDX1RtTFY3dEREeUI3dS1wdndTdWlBb0NFV2VlMjJXZzNuVjlIS0RYUzhxdmdhaEkycW1QR3pKMlhKam41RW5UNm1yemtsUGJR?oc=5",
          "date": "08-11 07:10"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 연속 하락세 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
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
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - farmersadvance.com",
          "source": "farmersadvance.com",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        },
        {
          "title": "Powder prices jump but butter and cheese stall - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxONW9lTk15cl92cjRCR1dZR0s5dXRKVU9zazZhMnRBNUV0SEJaVEZjY3VkbC1DR2pSZXBLWXl4M2x2VmRfbHoyS21vbEVxdTEwdEswR0hNT3cxbGNsd2ktZk1GTWIzOEVaU3hvVURfdFFtU2NmbEI0SjFCLTVycmtpWVNtdGY3R0szSE9RSlgxcVJnTzVENmk0b3UyVW92Zw?oc=5",
          "date": "08-13 07:57"
        },
        {
          "title": "EU Milk Production Rose 3.7% and Expanded Dairy Supply - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOZy1rOGdIMFM3SG1IYzI5WHQ5MFllcG9Za3YxY2JZNHpHVzExZlM4VDVmN3ZVUEZFblBWWFlKXzBFTE02eHRLRVUwbmczSWowd2piNEVkUXVQZF95T2RwbE9kT2ZBWnJSUmVXcDNsZnRMWHFMYVVDZVBXUmlMMlpfX3R6dVRzUjdUQkFWNWtNNWg2TmVOemxQLVgxR2h4VGpFVXZ1Wg?oc=5",
          "date": "08-13 03:04"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
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
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - farmersadvance.com",
          "source": "farmersadvance.com",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        },
        {
          "title": "Global dairy markets establish firmer footing amid production uncertainty - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNMzg5Mkl1VGZBNnJRbW9XVW10a3pvT0F5VGZNOVNBTEEtcXE0RjZWY1ZDN2ZGaWtUcnJEcnh3X29fSWhPLUJ5ZVdDTmhzNFRPT1VWajJwcTJMak5FQkFlR2dhTnRXd2U0NldSNWpqQWlhR2MxZ3ZBb29Hdzh1WXJKNVNTQVQyRnl3M1JEYUdVdDBMOGEwUEg4VTViMGo5RC1QTHI5NWFiNDlXelpwOExPUkplVkQwbHJFOVpJSTYxYw?oc=5",
          "date": "08-13 11:03"
        },
        {
          "title": "Powder prices jump but butter and cheese stall - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxONW9lTk15cl92cjRCR1dZR0s5dXRKVU9zazZhMnRBNUV0SEJaVEZjY3VkbC1DR2pSZXBLWXl4M2x2VmRfbHoyS21vbEVxdTEwdEswR0hNT3cxbGNsd2ktZk1GTWIzOEVaU3hvVURfdFFtU2NmbEI0SjFCLTVycmtpWVNtdGY3R0szSE9RSlgxcVJnTzVENmk0b3UyVW92Zw?oc=5",
          "date": "08-13 07:57"
        },
        {
          "title": "European Milk price fluctuates as butter plummet continues - Agriland",
          "source": "Agriland",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNeTA1RUdmWFhqYklDcjVqd3UtOEhmcDgzZk5JaURLNlVYN1hZekdndVR4Z0xKRHBjRmdPbDF5bUd5N3ZjRkZvdmI4X2N1T2RVMVBBU21Hbms0cW1ndENWdm9zeEdtTEFOLXJhZ3hpdXdkY194QlkzT0FBRzNhWkFQdkVNeEFHMEllNmpTMUV2d1d2dnlIYjBjMDNmVEw?oc=5",
          "date": "08-12 21:30"
        }
      ],
      "newsKr": [
        {
          "title": "GDT 유제품 가격 연속 하락세 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBXZjl5aHdkU1JfaXRhMzhpc3RZd0E5Nkp0Z2JZYUJCQjlmbklJZWxIQlRLYndsNjc0Yi1ZRlpXMVNNSi1meG1yNm55bElheXFFMjZTQmNzNmVuN0JaWjY4eEk0ay02bzg?oc=5",
          "date": "11-03 16:00"
        },
        {
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - foodicon.co.kr",
          "source": "foodicon.co.kr",
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
          "title": "Global dairy markets establish firmer footing amid production uncertainty - Dairy News Today",
          "source": "Dairy News Today",
          "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNMzg5Mkl1VGZBNnJRbW9XVW10a3pvT0F5VGZNOVNBTEEtcXE0RjZWY1ZDN2ZGaWtUcnJEcnh3X29fSWhPLUJ5ZVdDTmhzNFRPT1VWajJwcTJMak5FQkFlR2dhTnRXd2U0NldSNWpqQWlhR2MxZ3ZBb29Hdzh1WXJKNVNTQVQyRnl3M1JEYUdVdDBMOGEwUEg4VTViMGo5RC1QTHI5NWFiNDlXelpwOExPUkplVkQwbHJFOVpJSTYxYw?oc=5",
          "date": "08-13 11:03"
        },
        {
          "title": "National Milk Producers fight to stop plant-based imitators from co-opting dairy product terms - farmersadvance.com",
          "source": "farmersadvance.com",
          "link": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNd1dEVUIxVGZoUmxiZkQ1M2NqcGdzc2l1UjRleFBZdmtkUFFndjgtZWE5cVZVR0hWa1ctenM4QjJRUThlQ2Y4cDZJaEh5QlM4VV90TG5LVmlLdnM1ek1CekpSanVLNGVSRUlocWo3ZldjWGk5bTZhX084S2JqSDdFQnZpaG4zdkpjVFNNRnN2dnRJeXV2ZTdudG5ocFhfV20tRVQ4QTlENV9kUWV4dHBSMnpBMmgzcDMwT3FhdUZVNEFkOEtBZnFDaFAtbnlmUExWd0FNZUN2YlNrNi1GenNQUzRfSkxIQUc3bzl6ODV2Ry0xUQ?oc=5",
          "date": "08-12 13:00"
        },
        {
          "title": "Following Tetra Pak's Expansion of Paper-Based Barriers to - GlobeNewswire",
          "source": "GlobeNewswire",
          "link": "https://news.google.com/rss/articles/CBMivwJBVV95cUxQMU9zc2pnenc1NnJDeHZkSDY4SGdtSjdhYmV6V1JtUkNadFI4NjhpNXM1bzdxUnF6YmRNb0lIWDVJazFwWVFsRDZjUkVTMjlCQ2RRNzhJMnNUWDNtdnRCMzhpZ2padjViVVBhOVpDREpBTGwwbUJONzVXNzRDU2h2WEFfZW4yWjN0a2o1WTFMTmJCQlpqLWJkX214RkttalVCSUVkdEZLLUtxMWdScmh5Zmw1SlBXaUExNUVEYnpzaTRQVFp6bU8wRHFqM25wOXlORHNReE8xdHhXMDFYNnk4U0hSY1FCSFhHVXdxclJSWnBhdnh5Ui1KQlU4RlhwY1ptcXVfdVFOTE9weldseERXemZQZzJaNmVPYVlKRjkxekNZMGE3d0ExalRzSTRZNU8yRFlGaWtIZi1ucC1zODJR?oc=5",
          "date": "08-12 20:49"
        },
        {
          "title": "Powder prices jump but butter and cheese stall - Irish Farmers Journal",
          "source": "Irish Farmers Journal",
          "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxONW9lTk15cl92cjRCR1dZR0s5dXRKVU9zazZhMnRBNUV0SEJaVEZjY3VkbC1DR2pSZXBLWXl4M2x2VmRfbHoyS21vbEVxdTEwdEswR0hNT3cxbGNsd2ktZk1GTWIzOEVaU3hvVURfdFFtU2NmbEI0SjFCLTVycmtpWVNtdGY3R0szSE9RSlgxcVJnTzVENmk0b3UyVW92Zw?oc=5",
          "date": "08-13 07:57"
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
          "title": "GDT 유제품 시세 4.3% 오르며 상승세 이어가 - foodicon.co.kr",
          "source": "foodicon.co.kr",
          "link": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBkVFdYR1FXZUEyLWhSc3lnNEMtRmhwRXI3WW02U0QxTHAxeW1EY20zR0swdVlKZE91WVNjTm5KbDI4QjN5YnJoeWRRMXFpUnZxb3ZEdm5tZjQ2el94QnQ3MEdqc1ZSX0k?oc=5",
          "date": "11-04 16:00"
        },
        {
          "title": "GDT 유제품 가격 연속 하락세 - foodicon.co.kr",
          "source": "foodicon.co.kr",
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
      "change": -296.5,
      "changePercent": -26.56,
      "high52w": 1193.5,
      "low52w": 820.0,
      "high24h": 820.0,
      "low24h": 820.0,
      "volume": 10,
      "sparkline": [
        1150.0,
        1153.5,
        1151.25,
        1150.0,
        1160.0,
        1163.75,
        1157.0
      ],
      "history": {
        "7D": [
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
          }
        ],
        "1M": [
          {
            "date": "07-13",
            "price": 1116.5
          },
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
            "time": "15:07",
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
          "title": "Palm oil falls on Dalian and Chicago rivals, lower crude oil - NST Online",
          "source": "NST Online",
          "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQU3N4Rzd5d3dMdUtOaG5kX1JZemlfbk9TWGFnRDhOUTNHYUpqSkdXbFp4TFIySHZ2MHVjZDZkN1VJUVVaWFYxZ2xsV25tNE40ZURjTWlOaUxYN1hCNkxta1BZdmlNb1J0QTd3S1ZWYnpOT1lVZ0NPSUY5cmo3TnZKU25UMkpsZ0ZKbUQwWXJDaWRzUHBrZTJDTzZyUkFaQ2RqMGZPNVNGUHFxcmFIdjBtSFRpc3Q?oc=5",
          "date": "08-13 12:48"
        },
        {
          "title": "Palm Oil Hits Four-Month High as Rival Vegetable Oils Gain - ChemAnalyst",
          "source": "ChemAnalyst",
          "link": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOVGppSGNrajhib19PZWRsVmFURFBqNTZ6LXJYN09BYkRHTXJyZmFBTkI4SU14QmJjbFQwTXFuLW1uTHlGc1Frb0dRbGQ3eDZsWnVfdXJ4TFo2djJDcTZCdk1oamIwME5TQjVqN0dGWnVqX1Y0UDA4RVJlWnNfZGVFOVRxSC1hY08wT21CZk1sZFBmSGRyc3A4T3M0dGV3dkgzRExNeUU5ZDRfNjZiU29tVVNn?oc=5",
          "date": "08-11 00:55"
        },
        {
          "title": "Malaysian palm oil prices hit four-month high on Monday - UkrAgroConsult",
          "source": "UkrAgroConsult",
          "link": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNZFpiV05zOThpdzlXcTNrb21zZ1lRMnlxZktZMnBXdEtxY1Nzb1pEb2h6Wk9WLU5ielQ1Vm1nSDE0MXZzNU84ZWloY3M2U2pKTDVXZDh2LVJpMGtpZVRoa0NnQUtxRVA4YnlIM0pnYkFTM3Utc3BsRWxhZExsUEVQLURpT2hmUzgtRjg4NUhnLWFLeU9MOGc?oc=5",
          "date": "08-11 15:51"
        },
        {
          "title": "Malaysia Morning Wrap | Malaysia Palm Oil Stocks Rise in July; US Equities Dip Slightly - Moomoo",
          "source": "Moomoo",
          "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNREltTE1pZTE3U1lKT0pMX3cxZjlVWXl1blJxUUhiMFJHWjdkOUxPdWN4VlROQkp3QUxGYXlEVElWV3JfamtVY1ptaVJrTW81TEJmM2dzY0NKV3JjVzNkN1ZjMi1BR0ttWTdZVmZjWjZXdFVTWW5OUTc2YUpjOGZuODYtVjFYTEIyS0M2OTR1Mko3SmtlQ0NVSHVoRTNDZkthbDZBV1RBa3VLN1dSVVR0eWlFSQ?oc=5",
          "date": "08-11 09:15"
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
          "title": "국제 설탕ㆍ곡물ㆍ유지류 가격 상승, 육류ㆍ유제품은 하락 - foodnews.co.kr",
          "source": "foodnews.co.kr",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE5VM1pUSEdUa3BGTm4zUzZOOU9Pa0RLaGhfb2NmOHpxVFZXdUktNnB2ZlFEazhyODdSTVotRXBHRzJoRHU4MXE4RGVjQWZnOFFzLXpmOU81eHZVTGFTYWlRNVNoZ3VCQS1WS0RnbQ?oc=5",
          "date": "08-10 11:00"
        },
        {
          "title": "해바라기유도 '껑충'…유지류 가격 초비상 [푸드360] - 네이트",
          "source": "네이트",
          "link": "https://news.google.com/rss/articles/CBMieEFVX3lxTE1qRlU0OGlGSU1VZlMwa0VWeFFDdWNjYVI0MERNZTJ5LVZYdU5HMlNKbi1sX0tYNERpTTl6ZDZUVzIxRGxZNmw5NjJVdkhRa0JCRnF0ekk5WE9FQWtaTldZaVZ1c2xPcm5DZjkyX0ZWVU5vdDVmdG1ZTg?oc=5",
          "date": "08-10 11:54"
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
            "date": "08-07",
            "price": 1930.0
          },
          {
            "date": "08-08",
            "price": 1931.93
          },
          {
            "date": "08-09",
            "price": 1933.86
          },
          {
            "date": "08-10",
            "price": 1935.79
          },
          {
            "date": "08-11",
            "price": 1937.72
          },
          {
            "date": "08-12",
            "price": 1939.65
          },
          {
            "date": "08-13",
            "price": 1941.58
          }
        ],
        "1M": [
          {
            "date": "07-15",
            "price": 1930.0
          },
          {
            "date": "07-16",
            "price": 1930.96
          },
          {
            "date": "07-17",
            "price": 1931.93
          },
          {
            "date": "07-18",
            "price": 1932.9
          },
          {
            "date": "07-19",
            "price": 1933.86
          },
          {
            "date": "07-20",
            "price": 1934.82
          },
          {
            "date": "07-21",
            "price": 1935.79
          },
          {
            "date": "07-22",
            "price": 1936.76
          },
          {
            "date": "07-23",
            "price": 1937.72
          },
          {
            "date": "07-24",
            "price": 1938.68
          },
          {
            "date": "07-25",
            "price": 1939.65
          },
          {
            "date": "07-26",
            "price": 1940.62
          },
          {
            "date": "07-27",
            "price": 1941.58
          },
          {
            "date": "07-28",
            "price": 1942.54
          },
          {
            "date": "07-29",
            "price": 1943.51
          },
          {
            "date": "07-30",
            "price": 1944.48
          },
          {
            "date": "07-31",
            "price": 1945.44
          },
          {
            "date": "08-01",
            "price": 1946.4
          },
          {
            "date": "08-02",
            "price": 1947.37
          },
          {
            "date": "08-03",
            "price": 1948.34
          },
          {
            "date": "08-04",
            "price": 1949.3
          },
          {
            "date": "08-05",
            "price": 1950.26
          },
          {
            "date": "08-06",
            "price": 1951.23
          },
          {
            "date": "08-07",
            "price": 1952.2
          },
          {
            "date": "08-08",
            "price": 1953.16
          },
          {
            "date": "08-09",
            "price": 1954.12
          },
          {
            "date": "08-10",
            "price": 1955.09
          },
          {
            "date": "08-11",
            "price": 1956.06
          },
          {
            "date": "08-12",
            "price": 1957.02
          },
          {
            "date": "08-13",
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
            "time": "15:07",
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
          "title": "Does Coconut Oil Benefit Your Skin? Experts Explain — Plus Products to Shop - TODAY.com",
          "source": "TODAY.com",
          "link": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBQRUtma2JheTljOU9uX09lTVFQcWZhei05X2JMdEhsellRdHl5TS1QVk93ZWdOb3FHOVM5eFFFbVhBYms3Uk5DVE5fOUszczJ6b2pYdkxZSkFvTU9vYVpMZkpVSUtSUktQbFpsR0VHaW4?oc=5",
          "date": "02-04 17:00"
        },
        {
          "title": "Humble coconut oil turns into a luxury on rising demand, shrinking output - Reuters",
          "source": "Reuters",
          "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNQ01qdVpVWVRianppU1ZsRnh1NDdKU0h6V2xESUFRV195QmlsaEVCR2NiZEY5bGtFbDBsTTNWY2ZkanlkMndhNnVqc1NEUjVuVXpNZ3Zob3lwRmpKWVJNX3N6b08wZkdRWkpyOFdONXFTQ3Y5bDB0YlFPZGFNaTVCbHBtUjhNdlIteVJHTEMyb0VYTlhOalFUTkktcmdWVXM0TWNKMGVaMVNwbDc1cHlOaUxsYTBadw?oc=5",
          "date": "08-19 16:00"
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
      "price": 1416.28,
      "change": -82.2,
      "changePercent": -5.49,
      "high52w": 1587.7,
      "low52w": 1322.42,
      "high24h": 1418.03,
      "low24h": 1410.48,
      "volume": 0,
      "sparkline": [
        1428.43,
        1421.16,
        1422.3,
        1407.0,
        1417.31,
        1412.18,
        1416.28
      ],
      "history": {
        "7D": [
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
            "price": 1416.28
          }
        ],
        "1M": [
          {
            "date": "07-13",
            "price": 1498.48
          },
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
            "price": 1416.28
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1407.78
          },
          {
            "time": "11:00",
            "price": 1410.61
          },
          {
            "time": "13:00",
            "price": 1413.45
          },
          {
            "time": "15:07",
            "price": 1416.28
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
          "title": "Asia FX, dollar steady as traders weigh Fed outlook after in-line U.S. CPI - Investing.com",
          "source": "Investing.com",
          "link": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOS3pkMnpHOVJDaXlQXzM1RExWbzAyYkx4R2VnZjFoWER0VTZRXzZPWGFNY1dTU3dvX2FxMm9fdWtGaWFyTFRNN2F1VTVFTFBtZVVkTExNSDNJbExfYUxuOC1qWUI5R3ROYjFBbV9rSmpLOS1TRC03Z01DYTNkT21iaEVuMHNnbzY4bHUxVUtYTjBZd0VCaGdVTVE2X2g0eXZDY3ZyS1IyWlJSYndOR3RzQ2d0VWoyZ0hmTHlucmI3ajhBZllCT2x3?oc=5",
          "date": "08-13 13:42"
        },
        {
          "title": "Korean Won Jumps 9.4%, But Ranks Second in Currency Volatility - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPQ29nLUJ6ZXBQQThoQk1ySFFoeERNcDE4UU1PVVBSWi1ObG5TRWRMVEFSbGl5TW1hTnFoUldkT2FZNTFnekRiOEZZZGxhWG9kOTFIeG01MzduTUNVX05vYU9RQlhhYmZnel90dWJyd1lkX0lPZTFIemE3ampBMjFGa2l4Tks1aFVOamt1bk9FT1NRMnhvNUFzYXdRclNKU2M?oc=5",
          "date": "08-13 13:04"
        },
        {
          "title": "SBI and Nodeinfra Sign Deal to Bypass Dollar in Japan-Korea Trade via Canton Network - Tech Times",
          "source": "Tech Times",
          "link": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQVkJjR2FSaFJjX19yZ3hqMzE1a1dQV2dxeGJGQXdScmNVZWJfYTk2QWVGUFM3T2hMdjNjRENFZzRKS2I3b3E1UmtWdGNEaVlLajVVbVpfU0lNOGV3YzIxMEVscXBESGdrdmRqcHZ0eUdiZ1hNTmNZZi1VekNYUXBwVVFyOXVRNm5maTZmNW03RGcxa0VRT2ZnUXVMd1h1R1o3NHRYQ2w1V0VFV04zSFV0UkJXbUExd1VIYm9YaTR2cF91SlBrdWJ2UQ?oc=5",
          "date": "08-13 05:43"
        },
        {
          "title": "Canadian Dollar CAD/USD Overview - CME Group",
          "source": "CME Group",
          "link": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9GQklIb3JlZjBWc0VaM296ZGlibGdKM0FjVzR3eTk1dDNNODV3QVdZUVpaRHYyMUNqdkZwSTJubThfVGk1VFZ2WXd3UExDaU1sdVZGczI0R29xV1V3ZW9vYjRGR3c4WkFjMGM0Vg?oc=5",
          "date": "08-11 04:59"
        }
      ],
      "newsKr": [
        {
          "title": "[환율 전망] 미국의 '끈적한 물가' 확인, 환율은 혼조 예상 - KB Think",
          "source": "KB Think",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1ZSS1kWXlpSjRIalBGaXBpWjc5NnZaVWEtanVlVUkwRDhVSk9vUnNyS2FmMzJrTEtyb0xvUGxVb1c5Z2pUaFBuSENDM2pKUEpmdzQycjI2MGFJLTlTY0VZMQ?oc=5",
          "date": "08-13 08:10"
        },
        {
          "title": "강달러에 서학개미 환전 등 저가매수세⋯\"1410원 후반서 상승\" [환율전망] - 이투데이",
          "source": "이투데이",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE9xOFkxT0FpVF9fNVRrbHEzYkc4WWtYRGhCSE5rdC1XUHVlalBwNTdINlY0dFUwWU5qeW8xcE5CZDRxR1RHX3R0d2NtbnZhSlBvck9RTA?oc=5",
          "date": "08-13 08:22"
        },
        {
          "title": "강달러에 서학개미 환전 등 저가매수세···\"1410원 후반서 상승\" [환율전망] - 네이트",
          "source": "네이트",
          "link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1RVTkyVGNRb08yQkRveFhvWHFWRjlTbkwyOTRnVThDRGVyNlhFbEhDNGxTeWNPejJteFZkdHRnTGFoTl9mOVJQSFNVbmpxSUZ6T2JJ?oc=5",
          "date": "08-13 08:23"
        },
        {
          "title": "위험 선호 위축에 美 물가 대기 중⋯\"1400원대 상승 후 하락\" [환율전망] - v.daum.net",
          "source": "v.daum.net",
          "link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTE9YTjI4N1lydS1aTTFuTlJReTgyZVF6WVBMbUhfdGdKaWdnR2FkaERIOTRzZUQ1LUlkUWwtcWFyUWMyU0VmQlZ3NmZtQQ?oc=5",
          "date": "08-12 08:40"
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
      "price": 1630.6,
      "change": -38.49,
      "changePercent": -2.31,
      "high52w": 1807.42,
      "low52w": 1592.84,
      "high24h": 1633.3,
      "low24h": 1626.1,
      "volume": 0,
      "sparkline": [
        1647.17,
        1642.01,
        1638.82,
        1618.62,
        1635.36,
        1628.62,
        1630.6
      ],
      "history": {
        "7D": [
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
            "price": 1630.6
          }
        ],
        "1M": [
          {
            "date": "07-13",
            "price": 1669.09
          },
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
            "price": 1630.6
          }
        ],
        "1D": [
          {
            "time": "09:00",
            "price": 1620.82
          },
          {
            "time": "11:00",
            "price": 1624.08
          },
          {
            "time": "13:00",
            "price": 1627.34
          },
          {
            "time": "15:07",
            "price": 1630.6
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
          "title": "Korean Won Jumps 9.4%, But Ranks Second in Currency Volatility - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPQ29nLUJ6ZXBQQThoQk1ySFFoeERNcDE4UU1PVVBSWi1ObG5TRWRMVEFSbGl5TW1hTnFoUldkT2FZNTFnekRiOEZZZGxhWG9kOTFIeG01MzduTUNVX05vYU9RQlhhYmZnel90dWJyd1lkX0lPZTFIemE3ampBMjFGa2l4Tks1aFVOamt1bk9FT1NRMnhvNUFzYXdRclNKU2M?oc=5",
          "date": "08-13 13:04"
        },
        {
          "title": "Azerbaijani currency to world currency rates for August 13 - trend.az",
          "source": "trend.az",
          "link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5Ua3ZKV3lGVHRuN2lzMGlfOFcwSWVhV2dsOGZpWTNfeWpUb0RfQzBSSzBKUEZMTGtIczVwOEVVMjRKdVB6WlBOX1N1ai1rWml2cmxuOQ?oc=5",
          "date": "08-13 14:16"
        },
        {
          "title": "Citi sees Bank of Korea rate hike on inflation concerns By Investing.com - Investing.com India",
          "source": "Investing.com India",
          "link": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPTEhiZlVBNE9UNFFJSFRHa3dNWDZwSVBYek51dnQ3R0V1WjVSRWFWRkZwRjNudWlDR0prd3hCaE5SdGFBQkNaUWMySi1ZYUduWl9Vc2dQVHRXYU1NbkczNUFXZTJZZ2pYN0NWRnlDeGRNUnJEb0JsZ1hvVlI1QU1zek94Y3Vvamp0LU4yamtKUjBtRVpEZi12dmw1RHRiZlhmNU1SQ2RPdVd2TldkTHBqQy1qYXR4cms?oc=5",
          "date": "08-12 19:29"
        },
        {
          "title": "Korean Won Edges Up Against Dollar as Markets Await U.S. Inflation Data - Seoul Economic Daily",
          "source": "Seoul Economic Daily",
          "link": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPTXJnclVSNGtSaVp0T1ZNVUpnQzhJZmpnT1RqaVN2RHRUYWkwcDFyUzc0d3F1X3NNX3ZJLXdNUE1DUU1HQzE1czU0T256SWlHeUFIRXpSdkVVTHBCNTdsRUlaVFE3R29GMUVoMjVFU3NsQzBmX1FfUFhlSFpOTEI1cmozTGZLTGVkbE1wcEpubjFpbWh4LWpXeWkzOGc?oc=5",
          "date": "08-12 16:41"
        }
      ],
      "newsKr": [
        {
          "title": "환율, 닷새째 1410원대…달러 강세·저가 매수세 유입 - 아주경제",
          "source": "아주경제",
          "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5Ea01XRWNQSDJ2QUdXMDRZQzY1TXlPZDNXLXlicjdheGlIUWxkNGdoZml6UUdmclNfME5oMnY3MG9rRlNUWExycHMxWlE2ZGhnRjFEcHFhdzFrUdIBWEFVX3lxTE1hNU5pN1drUXptTnZwR1VVMW1ZTUZMREplUXpndmc2UzBkOTkwRGI1dHg0YkVlM1pGRUlEamFmTjdEa0F2U3N0TEw2WG51RzdvNHFJNUZaMVc?oc=5",
          "date": "08-13 09:51"
        },
        {
          "title": "美 CPI 예상 부합…달러·원 환율 1413원대 하락 - 뉴스1",
          "source": "뉴스1",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFByN0VLNlBxa0FnVzFPYkYxbThrUkliV2oybHhxbzBLUVpaU3V1UWJpSU5XVzU4VEViMVdvWGE1eVVtMTV2WUR0bHBOc1pTQ2JaUmx5c2ZvMWE2N0ZBQU1FWtIBYEFVX3lxTFByN0VLNlBxa0FnVzFPYkYxbThrUkliV2oybHhxbzBLUVpaU3V1UWJpSU5XVzU4VEViMVdvWGE1eVVtMTV2WUR0bHBOc1pTQ2JaUmx5c2ZvMWE2N0ZBQU1FWg?oc=5",
          "date": "08-13 09:41"
        },
        {
          "title": "2026년, 2027~2028년 및 향후 EURUSD 예측 및 전망 - litefinance.org",
          "source": "litefinance.org",
          "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxORi11ZUotZm1OV0JYQ0FDYjJyUGJuUGdNdEtub0FDZm44YVJ4b01CN2UyTTctUl92aUp5b2t0eDlheGFQVWR0SzRKZVFxWWtwQUNWa1VIcUZpVThxLWEyNS1LMGhwaTlqOUI3cWtlRzVIQVoydVc0TGpmaGdSZzBuNkRQd1JQeFhxSHg5cXZUNTQ4Zw?oc=5",
          "date": "08-12 14:49"
        },
        {
          "title": "엔화 환율 다시 160엔 육박…미일 동시개입 효과 끝났나 - 연합뉴스",
          "source": "연합뉴스",
          "link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTE1kSzJhQk5nNUp0V2lsWjNfMW9QblVPcF8tY0s5U240SmdaQ092NVd0RVpoVG9oSHRubHJuTElrWUJHSkE5LUJDV1Q2M0RNWms0T09hUWZIb3NaYm9DdWxIVNIBYEFVX3lxTE1kSzJhQk5nNUp0V2lsWjNfMW9QblVPcF8tY0s5U240SmdaQ092NVd0RVpoVG9oSHRubHJuTElrWUJHSkE5LUJDV1Q2M0RNWms0T09hUWZIb3NaYm9DdWxIVA?oc=5",
          "date": "08-11 17:11"
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
    // Prevent HTTP caching by attaching timestamp query param and no-store option
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`./data/commodities.json${cacheBuster}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Network response not ok');
    appState.data = await response.json();
  } catch (err) {
    console.warn('Using fallback commodity dataset:', err);
    if (!appState.data) {
      appState.data = FALLBACK_DATA;
    }
  }
}

function startSilentAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  // Silently reload data every 60 seconds in the background
  autoRefreshTimer = setInterval(async () => {
    await loadData();
    renderApp();
  }, 60000);
}

function setupEventListeners() {
  // Currency Toggle
  document.getElementById('btnUsd').addEventListener('click', () => setCurrency('USD'));
  document.getElementById('btnKrw').addEventListener('click', () => setCurrency('KRW'));

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
  document.getElementById('btnUsd').classList.toggle('active', curr === 'USD');
  document.getElementById('btnKrw').classList.toggle('active', curr === 'KRW');
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
  const updatedDate = new Date(appState.data.lastUpdated);
  const formatted = updatedDate.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const usdRate = appState.data.usdKrwRate ? `₩${appState.data.usdKrwRate.toLocaleString('ko-KR')}` : '-';
  const eurRate = appState.data.eurKrwRate ? `₩${appState.data.eurKrwRate.toLocaleString('ko-KR')}` : '₩1,626.5';
  document.getElementById('lastUpdatedText').textContent = `업데이트: ${formatted} | USD/KRW ${usdRate} · EUR/KRW ${eurRate}`;
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

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon-title">
          <span class="card-icon">${icon}</span>
          <div>
            <div class="card-title-kr">${item.nameKr}</div>
            <div class="card-title-en">${item.symbol}</div>
          </div>
        </div>
        <span class="badge-change ${badgeClass}">
          ${sign}${item.changePercent.toFixed(2)}%
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
