/**
 * Splits a filename into its stem and extension. The extension keeps its
 * leading dot. Dotfiles (e.g. ".env") and names without a dot return an empty
 * extension so the whole name is treated as the stem.
 */
export function splitNameExt(name: string): { stem: string; ext: string } {
  const idx = name.lastIndexOf('.');
  if (idx > 0) return { stem: name.slice(0, idx), ext: name.slice(idx) };
  return { stem: name, ext: '' };
}

/**
 * Returns `name` when it is not already present in `taken`, otherwise the first
 * available "stem (n)ext" variant (e.g. "file (1).txt", "file (2).txt", ...).
 * Used to keep both copies when an uploaded file collides with an existing one.
 */
export function nextFreeName(name: string, taken: Set<string>): string {
  if (!taken.has(name)) return name;
  const { stem, ext } = splitNameExt(name);
  let n = 1;
  let candidate = `${stem} (${n})${ext}`;
  while (taken.has(candidate)) {
    candidate = `${stem} (${++n})${ext}`;
  }
  return candidate;
}
