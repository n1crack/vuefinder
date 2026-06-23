import { describe, expect, it } from 'vitest';
import { nextFreeName, splitNameExt } from '../utils/uniqueFilename';

describe('splitNameExt', () => {
  it('splits a normal filename', () => {
    expect(splitNameExt('file.txt')).toEqual({ stem: 'file', ext: '.txt' });
  });

  it('uses the last dot for multi-dot names', () => {
    expect(splitNameExt('archive.tar.gz')).toEqual({ stem: 'archive.tar', ext: '.gz' });
  });

  it('treats names without a dot as all stem', () => {
    expect(splitNameExt('README')).toEqual({ stem: 'README', ext: '' });
  });

  it('treats dotfiles as all stem (leading dot is not an extension)', () => {
    expect(splitNameExt('.env')).toEqual({ stem: '.env', ext: '' });
  });
});

describe('nextFreeName', () => {
  it('returns the original name when there is no collision', () => {
    expect(nextFreeName('file.txt', new Set())).toBe('file.txt');
    expect(nextFreeName('file.txt', new Set(['other.txt']))).toBe('file.txt');
  });

  it('appends a suffix on collision, preserving the extension', () => {
    expect(nextFreeName('file.txt', new Set(['file.txt']))).toBe('file (1).txt');
  });

  it('skips suffixes that are also taken', () => {
    const taken = new Set(['file.txt', 'file (1).txt', 'file (2).txt']);
    expect(nextFreeName('file.txt', taken)).toBe('file (3).txt');
  });

  it('handles names without an extension', () => {
    expect(nextFreeName('README', new Set(['README']))).toBe('README (1)');
  });

  it('handles multi-dot extensions', () => {
    expect(nextFreeName('archive.tar.gz', new Set(['archive.tar.gz']))).toBe(
      'archive.tar (1).gz'
    );
  });
});
