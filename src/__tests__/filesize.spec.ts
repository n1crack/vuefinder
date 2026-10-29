import { describe, expect, it } from 'vitest';
import { format, metricFormat } from '../utils/filesize';

describe('format', () => {
  it('keeps bytes below 1 KiB as whole bytes', () => {
    expect(format(0)).toBe('0 B');
    expect(format(512)).toBe('512 B');
    expect(format(1023)).toBe('1023 B');
  });

  it('keeps three significant digits instead of rounding to an integer', () => {
    expect(format(1536)).toBe('1.5 KiB');
    expect(format(1.46 * 1024 * 1024)).toBe('1.46 MiB');
    expect(format(14.6 * 1024 * 1024)).toBe('14.6 MiB');
    expect(format(146.4 * 1024 * 1024)).toBe('146 MiB');
  });

  it('drops trailing zeros', () => {
    expect(format(1024)).toBe('1 KiB');
    expect(format(2 * 1024 * 1024 * 1024)).toBe('2 GiB');
  });

  it('carries to the next unit when rounding reaches the base', () => {
    expect(format(1023.9 * 1024)).toBe('1 MiB');
  });
});

describe('metricFormat', () => {
  it('uses powers of 1000', () => {
    expect(metricFormat(999)).toBe('999 B');
    expect(metricFormat(1500)).toBe('1.5 KB');
    expect(metricFormat(12_345_678)).toBe('12.3 MB');
    expect(metricFormat(999_999)).toBe('1 MB');
  });
});
