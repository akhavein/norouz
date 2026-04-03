let nowOffsetMs = 0;
let hasSynced = false;

export function nowMs(): number {
  return Date.now() + nowOffsetMs;
}

export function hasServerTimeSync(): boolean {
  return hasSynced;
}

export async function syncNowOffset(): Promise<void> {
  try {
    const requestStartedAt = Date.now();
    const response = await fetch(window.location.href, {
      method: 'HEAD',
      cache: 'no-store',
    });
    const requestEndedAt = Date.now();

    const dateHeader = response.headers.get('date');
    if (!dateHeader) return;

    const serverDateMs = Date.parse(dateHeader);
    if (Number.isNaN(serverDateMs)) return;

    const estimatedNowMs = requestStartedAt + (requestEndedAt - requestStartedAt) / 2;
    nowOffsetMs = serverDateMs - estimatedNowMs;
    hasSynced = true;
  } catch {
    // Fall back to device time when server time can't be retrieved.
  }
}
