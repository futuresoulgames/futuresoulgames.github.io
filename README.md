# Future Soul Games

대한민국 인디 게임 스튜디오 Future Soul Games의 공식 홈페이지. 운영 사업자는 **꿈모아 (DreamMoa)** 입니다.

공개 홈페이지: https://futuresoulgames.github.io/

저장소: https://github.com/futuresoulgames/futuresoulgames.github.io

2026-10-24 GitHub Pages 공개 및 HTTPS 실제 접속 확인 완료. Search Console은 실제 인증 태그 발급·적용 후 별도 확인이 필요합니다.

## 구성

- `index.html`: Home / Games / About / Contact
- `privacy.html`: 홈페이지 전용 개인정보처리방침 초안
- `assets/styles.css`: PC·모바일 스타일 및 CSS 시각 요소
- `assets/favicon.svg`: 로컬 파비콘
- `404.html`: 사용자 사이트 루트용 오류 페이지
- `.github/workflows/pages.yml`: GitHub Actions → Pages 배포
- `tools/check.mjs`: 내부 링크·메타데이터 검사
- `tools/serve.mjs`: 선택적 로컬 미리보기
- `docs/배포_및_인증_안내.md`: 계정 확인부터 Search Console·Play Console 인증까지
- `docs/검증_상태.md`: 실제 확인 결과 및 미완료 항목

사이트 자체는 HTML/CSS만 사용합니다. JavaScript, npm, 빌드, 백엔드, 데이터베이스, 외부 폰트, 광고, 분석 도구가 없습니다. Node는 로컬 점검·미리보기에만 선택적으로 사용합니다. CI는 GitHub 호스팅 러너의 Node를 사용합니다.

## 로컬 보기

`index.html`을 직접 열거나, Node가 설치된 경우 프로젝트 폴더에서 실행합니다.

```powershell
node tools/check.mjs
node tools/serve.mjs
```

미리보기: http://127.0.0.1:4173 (공개 배포 주소가 아닙니다). 서버 종료: Ctrl+C.

## 배포

GitHub Pages용 공개 저장소에 파일을 올리고 **Settings → Pages → Source: GitHub Actions**를 선택합니다. `main`으로 push할 때 자동 배포됩니다. 워크플로는 HTML/CSS와 assets만 배포하며 README, docs, tools는 배포 결과물에 포함하지 않습니다.

목표 URL `https://futuresoulgames.github.io/`는 **futuresoulgames 계정 또는 조직에 대한 권한**과 **futuresoulgames.github.io 저장소**가 있어야 사용할 수 있습니다. 실제 계정 확인 전 확보·배포 완료로 간주하지 않습니다. 다른 계정을 사용한다면 `<실제계정>.github.io` 이름과 주소를 사용합니다.

## Google 인증

`index.html`의 `<head>` 안 `SEARCH_CONSOLE_VERIFICATION` 주석 바로 아래에 사용자가 전달한 실제 Google HTML 인증 태그를 적용했습니다(2026-10-24). 인증 후에도 태그를 유지합니다. Search Console의 확인 버튼으로 최종 소유권 인증을 완료해야 합니다. 상세 단계는 안내서를 참고하세요.

## 수정

카드게임 이름, 게임 이미지, 출시일, 다운로드 주소는 확정 발표 후 `.game-feature`에 추가하세요. `assets`에 정식 이미지를 넣고 대체 텍스트를 제공합니다. 외부 서비스 또는 정보 수집 기능을 추가할 때 개인정보처리방침도 함께 갱신하세요. 앱의 방침은 별도 파일로 운영하세요.

D-U-N-S, 대표자 실명, 자택 주소, 전화번호, 사업자등록번호, 인증 토큰·비밀번호를 저장소에 넣지 않습니다. `app-ads.txt`와 `CNAME`은 실제 값·도메인이 확보되기 전 만들지 않습니다.
