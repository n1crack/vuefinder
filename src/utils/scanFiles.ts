/**
 * Recursively scan dropped entries (files/folders)
 * Converts callback-based FileSystem API to Promise-based
 */
export const scanFiles = async (
  resultCallback: (entry: any, file: File) => void,
  item: any,
): Promise<void> => {
  if (!item) return;

  if (item.isFile) {
    const file = await new Promise<File>((resolve) => {
      item.file(resolve);
    });
    resultCallback(item, file);
  }

  if (item.isDirectory) {
    const reader = item.createReader();
    const entries = await new Promise<any[]>((resolve) => {
      reader.readEntries(resolve);
    });
    for (const entry of entries) {
      await scanFiles(resultCallback, entry);
    }
  }
};
