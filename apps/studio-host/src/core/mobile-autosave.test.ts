import { describe, expect, it, vi } from 'vitest';
import type { DocumentInfo } from '@/core/types';
import { restoreMobileDraftSnapshot } from './mobile-autosave';

describe('mobile draft recovery', () => {
  it('restores HWP bytes into an editable native session and marks them unsaved', async () => {
    const docInfo = { pageCount: 1, fontsUsed: [] } as unknown as DocumentInfo;
    const bridge = {
      openDocumentWithExternalBytes: vi.fn().mockResolvedValue({
        docInfo,
        message: 'draft.hwp — 1페이지',
      }),
      markDocumentDirty: vi.fn(),
    };
    const showDocument = vi.fn().mockResolvedValue(undefined);
    const snapshot = {
      fileName: 'draft.hwpx',
      bytes: Uint8Array.from([1, 2, 3]),
      savedAt: 1,
    };

    await restoreMobileDraftSnapshot(snapshot, bridge, showDocument);

    expect(bridge.openDocumentWithExternalBytes).toHaveBeenCalledWith(
      'draft.hwp', snapshot.bytes, 'hwp',
    );
    expect(showDocument).toHaveBeenCalledWith(docInfo, 'draft.hwp — 임시 저장본 복구');
    expect(bridge.markDocumentDirty).toHaveBeenCalledOnce();
  });
});
