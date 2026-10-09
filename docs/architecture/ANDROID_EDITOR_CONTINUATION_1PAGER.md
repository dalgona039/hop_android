# Android editor continuation 1-Pager

## Background

This repository is the HOP Android editor fork. It keeps the desktop editing
surface, mobile toolbar, URI read/write bridge, and draft recovery. The separate
Android viewer experiment is not the product target.

## Problem

The generated Android project is ignored, while the tracked setup script only
installs Kotlin bridge sources. Its verifier expects an obsolete installer call,
and the generated manifest has no HWP/HWPX VIEW association. A successful build
therefore does not prove external opening or editing and saving on Android.

## Goal

Keep all product changes in this checkout. Make the existing editor's Android
integration reproducible and verify an actual edit-and-save workflow in an
emulator before moving to the Galaxy Tab S9.

## Non-goals

Do not replace the editor with a viewer, modify upstream `third_party/rhwp`,
declare official Android support, or update the desktop release flow.

## Constraints

Use pnpm, keep macOS/Windows/Linux behavior, keep generated Android files ignored,
and do not log document contents or private URIs. Scoped Storage write permission
must be granted by Android's document provider.

## Implementation outline

1. Repair setup/check scripts for the current bridge installer and make manifest
   integration repeatable after `tauri android init`.
2. Route cold and warm Android VIEW intents into the existing editor's mobile
   document-open flow while retaining one editing window.
3. Build the existing Android editor and test open, edit, save, reopen on an AVD.
4. Record what the emulator proves and what still needs One UI validation.

## Verification plan

Run setup/check, focused Studio tests, Studio build, Android APK build, and
emulator editing smoke test. Run desktop checks for any shared Rust or Studio
changes. Verify Intent open and URI write with a grant-bearing provider, not a
bare `adb shell` URI.

## Recovery

Changes stay in tracked scripts, Kotlin templates, and mobile host code. The
ignored generated Android project can be regenerated and set up again. Existing
desktop code and the separate viewer worktree remain untouched.
