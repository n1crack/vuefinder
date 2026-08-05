import { describe, expect, it } from 'vitest';
import { entryRelativePath, scanFiles } from '../utils/scanFiles';

const fileEntry = (fullPath: string) => {
  const name = fullPath.split('/').pop() as string;
  return {
    isFile: true,
    isDirectory: false,
    fullPath,
    file: (resolve: (file: File) => void) => resolve(new File(['x'], name)),
  };
};

/** Mimics readEntries(), which yields at most `chunkSize` entries per call. */
const dirEntry = (fullPath: string, children: any[], chunkSize = 100) => {
  let offset = 0;
  return {
    isFile: false,
    isDirectory: true,
    fullPath,
    createReader: () => ({
      readEntries: (resolve: (entries: any[]) => void) => {
        const chunk = children.slice(offset, offset + chunkSize);
        offset += chunk.length;
        resolve(chunk);
      },
    }),
  };
};

const collect = async (entry: any) => {
  const names: string[] = [];
  await scanFiles((scanned: any, file: File) => {
    names.push(entryRelativePath(scanned, file));
  }, entry);
  return names;
};

describe('scanFiles', () => {
  it('preserves the nested folder structure', async () => {
    const tree = dirEntry('/my-folder', [
      fileEntry('/my-folder/file1.txt'),
      dirEntry('/my-folder/subfolder', [fileEntry('/my-folder/subfolder/file2.txt')]),
    ]);

    expect(await collect(tree)).toEqual([
      'my-folder/file1.txt',
      'my-folder/subfolder/file2.txt',
    ]);
  });

  it('reads directories with more than 100 entries', async () => {
    const children = Array.from({ length: 250 }, (_, i) => fileEntry(`/big/file${i}.txt`));

    expect(await collect(dirEntry('/big', children))).toHaveLength(250);
  });

  it('skips files that cannot be read instead of hanging', async () => {
    const unreadable = {
      isFile: true,
      isDirectory: false,
      fullPath: '/my-folder/locked.txt',
      file: (_resolve: unknown, reject: () => void) => reject(),
    };
    const tree = dirEntry('/my-folder', [unreadable, fileEntry('/my-folder/file1.txt')]);

    expect(await collect(tree)).toEqual(['my-folder/file1.txt']);
  });

  it('ignores a missing entry', async () => {
    expect(await collect(null)).toEqual([]);
  });
});

describe('entryRelativePath', () => {
  it('strips the leading slash', () => {
    expect(entryRelativePath({ fullPath: '/my-folder/file.txt' }, new File([], 'file.txt'))).toBe(
      'my-folder/file.txt'
    );
  });

  it('falls back to the file name when the entry has no path', () => {
    expect(entryRelativePath({}, new File([], 'file.txt'))).toBe('file.txt');
  });
});
