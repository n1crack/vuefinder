const PREFIXES = 'KMGTPEZY';

// Rounds to three significant digits (1.46, 14.6, 146) and drops trailing zeros.
function roundSize(value: number): number {
  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return parseFloat(value.toFixed(decimals));
}

function formatWithBase(bytes: number, base: number, suffix: string): string {
  let exponent = 0;
  let value = bytes;
  while (value >= base && exponent < PREFIXES.length) {
    value /= base;
    exponent++;
  }
  let rounded = roundSize(value);
  // Rounding can carry the value up to the next unit, e.g. 1023.9 KiB -> 1 MiB, not "1024 KiB".
  if (rounded >= base && exponent < PREFIXES.length) {
    rounded = roundSize(rounded / base);
    exponent++;
  }
  return rounded + ' ' + (exponent ? PREFIXES[exponent - 1] + suffix : 'B');
}

// Formats a byte size as a human-readable string with binary prefixes (KiB, MiB, GiB, etc.).
export function format(bytes: number): string {
  return formatWithBase(bytes, 1024, 'iB');
}

// Formats a byte size as a human-readable string with metric prefixes (KB, MB, GB, etc.).
export function metricFormat(bytes: number): string {
  return formatWithBase(bytes, 1000, 'B');
}

/**
 * Convert human-readable size to bytes.
 *
 * <div>Example:
 * ```javascript
 * parse("50 MB") // 52428800
 * parse("50gb")  // 53687091200
 * parse("50G")   // 53687091200
 * ```
 * </div>
 * @param {String} text
 * @return {Number} how many bytes
 */
export function parse(text: string | number): number {
  if (typeof text === 'number') return text;
  const powers: Record<string, number> = { k: 1, m: 2, g: 3, t: 4 };
  const regex = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i;
  const res = regex.exec(text);
  if (!res) return 0;
  const value = parseFloat(res[1] || '0');
  const unit = (res[2] || '').toLowerCase();
  const power = powers[unit] ?? 0;
  return Math.round(value * Math.pow(1024, power));
}
