# HOP Android

**HOP is Open HWP — Android**

HOP는 HWP/HWPX 문서를 보고 편집할 수 있는 오픈소스 앱입니다. 이 저장소는 Tauri v2 기반 HOP의 Android 이식 작업을 중심으로 관리합니다. 데스크톱 전용 흐름을 모바일에 맞게 분리하고, Android의 content URI 파일 I/O와 터치 UX를 보강하는 것이 목표입니다.

## Status

* Android 이식 진행 중
* 모바일 전용 기능은 점진적으로 추가/검증 중

## Android 이식 목표

* 외부 앱에서 `.hwp`/`.hwpx` 파일 열기 (VIEW intent)
* Scoped Storage 환경에서 열기/저장/다른 이름으로 저장
* 모바일 UX(하단 액션 바, 롱프레스 액션 시트 등)
* 데스크톱 전용 기능은 모바일 빌드에서 비활성

## Android 개발 빠른 시작

Android SDK/NDK/JDK가 준비되어 있어야 합니다.

```bash
pnpm install
pnpm --filter hop-desktop tauri android init
pnpm run android:bridge:setup
pnpm run android:bridge:check
pnpm --filter hop-desktop tauri android dev
```

## 문서

* [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
* [docs/architecture/ANDROID_MIGRATION_1PAGER.md](docs/architecture/ANDROID_MIGRATION_1PAGER.md)
* [docs/architecture/ANDROID_INTENT_PIPELINE.md](docs/architecture/ANDROID_INTENT_PIPELINE.md)
* [docs/operations/ANDROID_MOBILE_E2E.md](docs/operations/ANDROID_MOBILE_E2E.md)

## Credits

HOP는 [rhwp](https://github.com/edwardkim/rhwp)를 기반으로 합니다. HWP 엔진을 공개해 주신 개발자분께 감사드립니다.

License: MIT
