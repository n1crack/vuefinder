import { describe, expect, it } from 'vitest';
import { dirname, splitPath } from '../utils/path';

describe('splitPath', () => {
  it('splits a full path into storage and path', () => {
    expect(splitPath('local://A/B')).toEqual(['local', '/A/B']);
  });

  it('returns a root path for a bare storage', () => {
    expect(splitPath('local://')).toEqual(['local', '/']);
  });

  it('returns no storage when the prefix is missing', () => {
    expect(splitPath('A/B')).toEqual([undefined, 'A/B']);
  });
});

describe('dirname', () => {
  it('keeps the double slash for files at the storage root', () => {
    expect(dirname('local://photo.jpg')).toBe('local://');
  });

  it('returns the storage root for the storage root itself', () => {
    expect(dirname('local://')).toBe('local://');
  });

  it('returns the parent folder for nested paths', () => {
    expect(dirname('local://A/B')).toBe('local://A');
    expect(dirname('local://A/B/photo.jpg')).toBe('local://A/B');
  });

  it('ignores trailing slashes', () => {
    expect(dirname('local://A/B/')).toBe('local://A');
  });

  it('returns undefined when there is no storage prefix', () => {
    expect(dirname('photo.jpg')).toBeUndefined();
    expect(dirname('A/B/photo.jpg')).toBeUndefined();
  });

  it('recovers from a single-slash storage separator', () => {
    expect(dirname('local:/photo.jpg')).toBe('local://');
    expect(dirname('local:/A/photo.jpg')).toBe('local://A');
  });
});
