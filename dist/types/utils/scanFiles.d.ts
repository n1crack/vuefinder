/**
 * Recursively scan dropped entries (files/folders)
 * Converts callback-based FileSystem API to Promise-based
 */
export declare const scanFiles: (resultCallback: (entry: any, file: File) => void, item: any) => Promise<void>;
/**
 * Relative path of a scanned entry, without the leading slash
 * (e.g. "/my-folder/sub/file.txt" -> "my-folder/sub/file.txt").
 * Falls back to the file name when the entry carries no path.
 */
export declare const entryRelativePath: (entry: any, file: File) => string;
