/**
 * Recursively scan dropped entries (files/folders)
 * Converts callback-based FileSystem API to Promise-based
 */
export const scanFiles = async (
  resultCallback: (entry: any, file: File) => void,
  item: any
): Promise<void> => {
  if (!item) return;

  if (item.isFile) {
    const file = await new Promise<File | null>((resolve) => {
      item.file(resolve, () => resolve(null));
    });
    if (file) resultCallback(item, file);
  }

  if (item.isDirectory) {
    const reader = item.createReader();
    // readEntries() yields at most 100 entries per call, so it has to be called
    // repeatedly until it returns an empty array to read the whole directory.
    for (;;) {
      const entries = await new Promise<any[]>((resolve) => {
        reader.readEntries(resolve, () => resolve([]));
      });
      if (!entries.length) break;
      for (const entry of entries) {
        await scanFiles(resultCallback, entry);
      }
    }
  }
};

/**
 * Relative path of a scanned entry, without the leading slash
 * (e.g. "/my-folder/sub/file.txt" -> "my-folder/sub/file.txt").
 * Falls back to the file name when the entry carries no path.
 */
export const entryRelativePath = (entry: any, file: File): string => {
  const matched = /^[/\\](.+)/.exec((entry?.fullPath as string) || '');
  return matched?.[1] ?? file.name;
};
