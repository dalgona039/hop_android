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

## Emulator verification (2026-10-09)

On an ARM64 Android 16 tablet emulator, HOP opened the repository's blank HWP
fixture through the Android file picker, accepted keyboard edits, and saved a
new HWP through the system document-creation picker when the source URI lacked
write permission. Reopening the saved HWP in HOP preserved the entered text.
This verified an editor round trip, rather than only displaying a document.

The first round trip exposed two save defects: JavaScript lost Android's URI
permission error, and the external-URI path exported the native session's
original snapshot instead of the current WASM editing buffer. The tracked
bridge and Studio host changes address both. Studio tests, bridge checks, and
the ARM64 debug APK build passed after the fixes.

A restart also exposed a recovery defect: the draft appeared in the WASM
editor, but had no native document session, so Save failed. Draft recovery now
opens the saved HWP bytes through the same editable native-session path as a
normal file and marks the restored document unsaved. Recovered HWPX drafts use
an `.hwp` name because their snapshot bytes are HWP. This recovery change has
unit coverage.

The rebuilt APK passed a recovery round trip on the same emulator: after an
edit and forced app stop, the restored draft was saved as HWP, reopened, and
still contained the added text.

## Galaxy Tab S9 verification (2026-10-10)

On a connected Galaxy Tab S9 running One UI 8.5 / Android 16, HOP opened a
copy of the repository's blank HWP fixture through the Android file picker.
Typing `GALAXY_TAB_S9_EDIT_CHECK` changed the editor page. Save created
`hop-codex-test (1).hwp` in Downloads, leaving the original test file intact.
Reopening the new HWP in HOP showed the same text. The saved file was also
identified as a Hangul Word Processor 5.x file on the host.

These checks do not cover opening HWP/HWPX from another app's VIEW intent,
HWPX-to-HWP editing, formatting and layout fidelity across diverse documents,
or Play Store release readiness.
