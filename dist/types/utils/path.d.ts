/**
 * Retrieve the parent directory of a full `storage://path` string.
 * Returns undefined when the input carries no storage prefix, so callers
 * can fall back to the current path instead of building a bogus target.
 *
 * @example
 * dirname('local://') -> 'local://'
 * dirname('local://A') -> 'local://'
 * dirname('local://A/B') -> 'local://A'
 * dirname('A/B') -> undefined
 */
export declare function dirname(fullPath: string): string | undefined;
export declare function splitPath(fullPath: string): [string | undefined, string];
export declare function shortenPath(path: string, max?: number): string;
