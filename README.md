# 🍫 Commodity Pulse - 국제 원자재 일일 동향 추적기 (GitHub Pages)

[![Daily Commodity Data Collector](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/daily-update.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/daily-update.yml)

매일매일 **코코아(Cocoa), 아라비카/로부스타 커피(Coffee), GDT 우유/원유 선물(Milk & Dairy), 원당(Sugar), 곡물(Wheat)** 등 주요 국제 원자재 가격 동향을 자동으로 추적하고 갱신하는 **GitHub Pages 대시보드 웹 애플리케이션**입니다.

---

## 🌟 주요 기능 (Key Features)

1. **자동 일일 업데이트 (GitHub Actions Automation)**
   - 매일 아침 09:00 KST (00:00 UTC)에 실행되는 파이썬 크롤러 스크립트 (`scripts/fetch_data.py`).
   - Yahoo Finance 및 Stooq API로부터 최신 선물/지수 데이터를 수집 후 `data/commodities.json`을 자동 커밋하여 GitHub Pages에 즉시 반영.
2. **다크 모드 글래스모피즘 디자인 (Luxury UI/UX)**
   - Chart.js 기반 다이나믹 가격 추이 그래프 (1일, 7일, 1달, 1년 기간 전환).
   - 미니 미니 스파크라인(Sparkline) 요약 카드로 주요 변동 품목 한눈에 파악.
3. **환율 실시간 계산 (USD / KRW)**
   - 달러($) 시세뿐만 아니라 실시간 원달러 환율을 반영한 원화(₩) 기준 가격 변환 지원.
4. **검색 & 카테고리 분류**
   - 음료/기호식품 (코코아, 아라비카, 로부스타), 유제품 (GDT 전지분유, Class III 원유), 농산물 (원당, 밀) 카테고리별 필터링.
5. **52주 시세 범위 비주얼라이저**
   - 52주 최고가 대비 현재 가격의 상대적 위치를 시각화 바(Bar)로 표시.

---

## 🚀 GitHub Pages 배포 가이드 (Deployment Steps)

### 1단계: GitHub 저장소 생성 및 푸시
로컬 프로젝트 폴더에서 터미널을 열고 깃 저장소를 연결하여 푸시합니다.
```bash
git init
git add .
git commit -m "feat: initial commit for commodity pulse dashboard"
git branch -M main
git remote add origin https://github.com/본인계정명/원자재-대시보드.git
git push -u origin main
```

### 2단계: GitHub Actions 권한 설정 (중요!)
자동 커밋 스크립트가 실행될 수 있도록 쓰기 권한을 부여합니다.
1. GitHub 저장소의 **[Settings]** 탭 클릭
2. 좌측 메뉴의 **[Actions]** -> **[General]** 선택
3. 맨 아래 **Workflow permissions** 섹션에서 **`Read and write permissions`** 선택
4. **[Save]** 클릭하여 저장

### 3단계: GitHub Pages 서비스 활성화
1. GitHub 저장소의 **[Settings]** 탭 -> **[Pages]** 클릭
2. **Build and deployment** 섹션의 **Source**를 **`GitHub Actions`**로 선택
3. 이제 **[Actions]** 탭에서 첫 배포 워크플로우가 자동으로 완료되면 제공되는 URL로 액세스할 수 있습니다! (`https://본인계정명.github.io/원자재-대시보드/`)

---

## 🛠 프로젝트 구조 (Directory Structure)

```
commodity-tracker/
├── .github/
│   └── workflows/
│       └── daily-update.yml   # 매일 09:00 KST 실행 파이썬 & GitHub Pages 자동 배포
├── data/
│   └── commodities.json       # 원자재 가격 및 히스토리 JSON 데이터베이스
├── scripts/
│   └── fetch_data.py          # Yahoo Finance API 연동 시세 수집 파이썬 스크립트
├── index.html                 # 대시보드 메인 HTML 페이지
├── styles.css                 # 글래스모피즘 CSS 스타일시트
├── app.js                     # Chart.js 차트 및 인터랙션 컨트롤러
└── README.md                  # 프로젝트 안내서
```

---

## 🧪 로컬 테스트 (Local Development)

로컬에서 데이터를 수동 수집하고 웹서버를 띄워 테스트할 수 있습니다.

```bash
# 1. 시세 데이터 수동 갱신 테스트
python scripts/fetch_data.py

# 2. 로컬 웹서버 실행
python -m http.server 8000
```
브라우저에서 `http://localhost:8000` 접속 후 확인합니다.

---

## 📄 라이선스
MIT License
