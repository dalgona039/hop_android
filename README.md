# HOP Android

# HOP Android

HOP (fork/Android port) — Android-focused repository for the HOP project.

This repository contains the Android port efforts for HOP, an open HWP/HWPX editor built on top of the rhwp engine. The upstream HOP project and the rhwp engine are both essential components of this work and are credited below.

Key points
- Project: Android port of HOP (Tauri v2-based desktop originally)
- Engine: rhwp (Rust + WebAssembly) is used for HWP/HWPX parsing and rendering
- Goal: provide an Android experience (Intent-based file open, Scoped Storage I/O, mobile UX)

Status
- Alpha: early Android builds available (debug/release pipelines in progress)

Quick Start (developer)
Prerequisites: Android SDK, NDK, JDK, Node.js, pnpm

```bash
# workspace dependencies
pnpm install

# initialize Android project (from repo root)
pnpm --filter hop-desktop tauri android init

# apply Android bridge templates
pnpm run android:bridge:setup
pnpm run android:bridge:check

# build and run debug on a connected device/emulator
pnpm --filter hop-desktop tauri android dev
```

Build artifacts
- APK: `apps/desktop/src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk`
- AAB: `apps/desktop/src-tauri/gen/android/app/build/outputs/bundle/universalDebug/app-universal-debug.aab`

Documentation and important files
- Development notes: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- Android migration strategy: [docs/architecture/ANDROID_MIGRATION_1PAGER.md](docs/architecture/ANDROID_MIGRATION_1PAGER.md)
- Intent & URI pipeline: [docs/architecture/ANDROID_INTENT_PIPELINE.md](docs/architecture/ANDROID_INTENT_PIPELINE.md)
- Android E2E checklist: [docs/operations/ANDROID_MOBILE_E2E.md](docs/operations/ANDROID_MOBILE_E2E.md)

Credits & attribution
- This repository is an Android-focused fork/port derived from the HOP project: https://github.com/golbin/hop (MIT).
- The HWP/HWPX engine powering the editor is `rhwp`: https://github.com/edwardkim/rhwp (MIT). Please keep the upstream license and copyright notices when redistributing.

License
- This repository is distributed under the MIT License. See `LICENSE` for details.

Contact
- Repository: https://github.com/dalgona039/hop_android

Please open issues or pull requests for Android-specific bugs, feature requests, or packaging improvements.
