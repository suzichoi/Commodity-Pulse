#  Commodity Pulse - 국제 원자재 일일 동향 대시보드

> **Created by suesue**

[![Update Commodity Data & Deploy](https://github.com/suzichoi/commodity-pulse/actions/workflows/update_data.yml/badge.svg)](https://github.com/suzichoi/commodity-pulse/actions/workflows/update_data.yml)

**코코아(Cocoa), 커피(Arabica/Robusta), 유제품(GDT/원유 선물), 원당, 곡물** 등 주요 식품 원자재 가격 동향 및 외환 시세를 자동으로 수집·시각화하는 **반응형 웹 대시보드**입니다.

> 🌐 **배포 주소:** https://suzichoi.github.io/commodity-pulse/

---

##  사전 필수 설정 및 주의사항 (Prerequisites & Warnings)

### 1. GitHub Actions 권한 설정 (필수)
자동화 봇(`github-actions[bot]`)이 수집된 시세를 커밋하고 배포하기 위해 쓰기 권한이 반드시 필요합니다. 권한이 없으면 워크플로우 실행 시 `Permission denied (status: 403)` 오류가 발생합니다.
* **설정 경로:** 저장소 **[Settings]** ➔ 좌측 **[Actions]** ➔ **[General]**
* **Workflow permissions** 섹션에서 **`Read and write permissions`** 선택 후 **[Save]** 클릭

### 2. GitHub Pages 배포 소스 설정
GitHub Actions 기반 배포 워크플로우를 사용하므로 Pages 빌드 방식을 맞추어야 합니다.
* **설정 경로:** 저장소 **[Settings]** ➔ 좌측 **[Pages]**
* **Build and deployment** 항목의 **Source**를 **`GitHub Actions`**로 지정

### 3. API 키 및 토큰 노출 금지 (보안 주의)
* 본 프로젝트는 서버리스(Serverless) 정적 웹사이트이므로, 프론트엔드 코드(`app.js`, `index.html`)에 GitHub Personal Access Token(PAT)이나 비밀 API 키를 하드코딩해서는 안 됩니다.
* 모든 데이터 수집 및 커밋 권한은 GitHub Actions 내부 토큰(`GITHUB_TOKEN`)을 통해 안전하게 격리되어 실행됩니다.

---

##  주요 기능 (Key Features)

* **1시간 주기 자동 수집 & 배포 (Automated Hourly Pipeline)**
  * 매시간 정각(`cron: '0 * * * *'`)에 실행되는 파이썬 수집 엔진 (`scripts/fetch_data.py`).
  * Yahoo Finance, GDT, ICE, CME 등 다중 소스에서 시세를 파싱하여 `data/commodities.json`을 갱신.
* **데이터 무결성 검증 및 이상치 방어 (Data Validation & Fallback)**
  * 수집 시세가 `0`, `null`이거나 전일 대비 비정상적 급등락(±30% 초과) 감지 시 이전 정상 데이터를 유지하여 차트 왜곡 방지.
* **실시간 수집 상태 인디케이터 (Status Indicator UI)**
  * 헤더 타이틀 우측의 상태 점을 통해 수집 상태 직관적 표시 (🟢 정상 갱신 / 🔴 수집 오류).
  * 클릭 시 마지막 데이터 수집 타임스탬프 팝업 지원.
* **통합 시장 인사이트 & 주간 리포트 (Market Summary & Modal)**
  * 당일 급등/급락 핵심 원자재 요약 및 실시간 뉴스 피드 연동.
  * 전주 마감 대비 현재가 누적 흐름을 계산하는 품목별 주간 리포트 모달 지원.
* **다중 외환 시세 추적**
  * 원자재 거래 기준이 되는 주요 환율(USD/KRW, EUR/KRW) 실시간 모니터링.
* **반응형 다크모드 차트 & 모바일 최적화**
  * Chart.js 기반 인터랙티브 기간별 차트 (1일, 7일, 1개월, 1년).
  * 모바일(스마트폰) 환경에 맞춘 UI 반응형 최적화.

---

##  프로젝트 구조 및 핵심 코드 (Architecture & Core Codes)

```text
commodity-pulse/
├── .github/
│   └── workflows/
│       └── update_data.yml    # 1시간 주기 데이터 수집 & GitHub Pages 자동 배포
├── data/
│   └── commodities.json       # 원자재 시세, 환율, 메타데이터 JSON 저장소
├── scripts/
│   └── fetch_data.py          # 시세 크롤링 및 이상치 검증 파이썬 스크립트
├── requirements.txt           # 파이썬 의존성 패키지 목록
├── index.html                 # 대시보드 메인 마크업
├── styles.css                 # 다크모드 글래스모피즘 & 모바일 반응형 스타일
├── app.js                     # 차트 렌더링, 상태 표시등, 모달 인터랙션 로직
└── README.md                  # 프로젝트 안내서
1. 자동화 워크플로우 (.github/workflows/update_data.yml)
1시간마다 가상 머신을 구동해 데이터를 수집하고 깃허브에 자동 커밋 및 배포하는 파이프라인 명세서입니다.

YAML
name: Update Commodity Data & Deploy

on:
  schedule:
    - cron: '0 * * * *' # 매 1시간마다 정각 실행
  workflow_dispatch:      # 깃허브 웹에서 수동 즉시 실행 지원

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  update-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Fetch Latest Commodity Market Data
        run: |
          python scripts/fetch_data.py

      - name: Commit and Push Updated Data
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add data/commodities.json app.js
          if [ -f commodities.json ]; then git add commodities.json; fi
          if git diff --staged --quiet; then
            echo "No data changes detected. Skipping commit."
          else
            CURRENT_TIME=$(TZ='Asia/Seoul' date '+%Y-%m-%d %H:%M:%S KST')
            git commit -m "chore(data): auto update commodity prices and report [${CURRENT_TIME}]"
            git push origin main
          fi

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact for GitHub Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
2. 데이터 수집 엔진 로직 구조 (scripts/fetch_data.py)
수집 스크립트는 시세 수집 ➔ 이상치 검증(Fallback) ➔ JSON 직렬화 단계를 거칩니다.

Python
# scripts/fetch_data.py (핵심 개념 발췌)
import json
import yfinance as yf
from datetime import datetime

def validate_and_update(old_data, new_price, symbol):
    # 이상치 방어 로직: 0/None 값이거나 전일 대비 ±30% 이상 폭등락 시 이전 데이터 보존
    if not new_price or new_price <= 0:
        return old_data.get(symbol, {}).get("price")
    
    last_price = old_data.get(symbol, {}).get("price", new_price)
    if abs((new_price - last_price) / last_price) > 0.3:
        print(f"[Warning] Abnormal price jump detected for {symbol}. Keeping previous value.")
        return last_price
        
    return new_price
 로컬 개발 및 디버깅 (Local Development)
Bash
# 1. 의존성 패키지 설치
pip install -r requirements.txt

# 2. 시세 데이터 수동 수집 테스트
python scripts/fetch_data.py

# 3. 로컬 테스트 웹서버 실행
python -m http.server 8000
브라우저에서 http://localhost:8000에 접속하여 로컬 구동 상태를 확인할 수 있습니다.


👤 Author
suesue - Initial work & Dashboard maintenance

📄 라이선스
MIT License
