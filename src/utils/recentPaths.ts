const STORAGE_KEY = 'vuefinder:recent-paths';
const MAX_RECENT = 4;

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getRecentPaths(): string[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is string => typeof entry === 'string')
      .slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function addRecentPath(path: string): void {
  if (!isBrowser || !path) return;
  try {
    const current = getRecentPaths().filter((entry) => entry !== path);
    current.unshift(path);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, MAX_RECENT)));
  } catch {
    // Quota / privacy mode — drop silently.
  }
}

export function removeRecentPath(path: string): void {
  if (!isBrowser || !path) return;
  try {
    const next = getRecentPaths().filter((entry) => entry !== path);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
