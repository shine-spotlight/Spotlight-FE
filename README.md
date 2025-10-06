# 소규모 공연을 위한 공간-공연 예술가 매칭 플랫폼, SPOTLIGHT
<img width="1920" height="1080" alt="preview" src="https://github.com/user-attachments/assets/cdd15bd2-ec33-4b7b-99ad-7152bf72d269" />

---
## Overview

소규모 공연 예술가의 공연 공간 부족 문제를 해결하기 위해,
공연자 ↔ 공연장 양면 시장 구조와 포인트 기반 제안 시스템을 설계한 매칭 플랫폼입니다.

스포트라이트는 대형 공연장보다 작은 규모의 친밀한 공연 공간에 초점을 맞춰,
예술가가 손쉽게 무대를 찾고, 운영자는 적합한 공연자를 효율적으로 탐색할 수 있도록 합니다.

이를 통해 지역 기반의 공연 문화를 활성화하고,
예술가와 공간 모두가 지속 가능한 방식으로 성장할 수 있는 생태계를 지향합니다.

---
## Key Features

### 프로필 탐색 시스템  
예술가와 공간의 프로필을 탐색하고 상세 정보를 확인할 수 있습니다.  
- 2열 그리드 뷰 기반의 프로필 탐색  
- 지역, 페이, 카테고리 등 다중 필터 지원  
- 찜하기 및 상세 정보 열람 기능  

### 제안서 시스템  
예술가가 공연 공간이나 공고에 제안을 보낼 수 있는 시스템입니다.  
- 포인트 차감 확인 및 제안서 작성 바텀시트  
- 제안 전송 후 피드백 제공  
- `Framer Motion` 기반 드래그 제스처 UI

### 공연 공고 시스템  
공연 공간 운영자가 공연 기회를 등록하고, 예술가가 탐색할 수 있는 기능입니다.  
- 제목, 설명, 일정, 카테고리, 페이 입력 및 이미지 업로드  
- 지역·날짜·카테고리 기반 필터 검색  
- `Tanstack Query` 기반 조건부 쿼리로 효율적 데이터 관리  

### 마이페이지  
사용자의 포인트, 프로필, 찜한 목록을 관리하는 개인화 공간입니다.  
- 예술가 / 공간 운영자 역할별 프로필 관리  
- 포인트 충전 및 내역 확인  
- 찜한 항목 조회  

### 카카오 소셜 로그인  
- 카카오 OAuth2를 통한 로그인 및 회원가입  
- 로그인 진행 상태 및 역할 검증  
- 토큰 관리 및 사용자 데이터 자동 로드  

---
## Frontend Tech Stack
|React + Vite + TypeScript|빠른 개발 환경, 타입 안정성|
|Emotion|컴포넌트 단위 스타일링, 동적 테마 적용|
|Zustand|가벼운 전역 상태 관리|
|Tanstack Query|서버 상태 관리 및 API 캐싱 최적화|
|PWA (Service Worker)|오프라인 접근성 제공, 앱과 같은 사용자 경험 제공|
|Vercel|빌드/배포 자동화|

---

## 폴더 구조
```
spotlight-FE/
├── public/                      # 정적 리소스 (logo, manifest 등)
├── src/                        
│   ├── apis/                    # 서버 통신 로직 (API 호출, 인스턴스 등)
│   ├── assets/                  # image, svg, json 등 정적 자원
│   ├── components/              # 공통 UI 컴포넌트
│   ├── constants/               # 상수, ENUM, 환경 관련 상수 정의
│   ├── guards/                  # 회원가입 라우팅 접근 제어(StepGuard)
│   ├── hooks/                   # 커스텀 훅
│   ├── models/                  # 데이터 모델 및 타입 정의
│   ├── pages/                   # 페이지 단위 컴포넌트 (라우팅 단위)
│   ├── providers/               # 전역 상태 및 Context 관리
│   ├── queries/                 # Tanstack Query 관련 로직
│   ├── routes/                  # 라우팅 설정 (react-router-dom)
│   ├── stores/                  # Zustand 전역 상태 관리 
│   ├── styles/                  # 전역 스타일, theme 설정
│   ├── types/                   # 공통 타입 정의
│   └── utils/                   # 유틸리티 함수 
├── App.tsx                      # 전체 앱의 루트 컴포넌트
├── main.tsx                     # 진입점
├── build.sh                     # 빌드 자동화 스크립트
├── eslint.config.js             # ESLint 설정 파일
├── vite.config.ts               # Vite 빌드 설정 파일
├── vercel.json                  # Vercel 배포 설정
├── sw.js                        # PWA 서비스 워커
├── offline.html                 # 오프라인 페이지
└── index.html                   # 앱 진입 HTML
```
