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
export function dirname(fullPath: string): string | undefined {
  const [storage, path] = splitPath(fullPath);
  if (storage === undefined) return undefined;
  // Strip leading/trailing slashes so the root case collapses to '' and the
  // storage prefix is always re-attached with its full '://' separator.
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const index = trimmed.lastIndexOf('/');
  if (index === -1) return storage + '://';
  return storage + '://' + trimmed.slice(0, index);
}

export function splitPath(fullPath: string): [string | undefined, string] {
  const index = fullPath.indexOf(':/');
  if (index === -1) {
    return [undefined, fullPath];
  }
  return [fullPath.slice(0, index), fullPath.slice(index + 2) || '/'];
}

export function shortenPath(path: string, max: number = 40): string {
  const match = path.match(/^([^:]+:\/\/)(.*)$/);
  if (!match) return path;

  const prefix = match[1];
  const rest = match[2] ?? '';
  const parts = rest.split('/').filter(Boolean); // remove empty segments
  const filename = parts.pop();
  if (!filename) return prefix + rest;

  let short = `${prefix}${parts.join('/')}${parts.length ? '/' : ''}${filename}`;
  if (short.length <= max) return short;

  // Safely split filename and extension
  const split = filename.split(/\.(?=[^\.]+$)/);
  const name = split[0] ?? '';
  const ext = split[1] ?? '';

  const shortName = name.length > 10 ? `${name.slice(0, 6)}...${name.slice(-5)}` : name;

  const shortFilename = ext ? `${shortName}.${ext}` : shortName;

  short = `${prefix}${parts.join('/')}${parts.length ? '/' : ''}${shortFilename}`;

  // Collapse folders if still too long
  if (short.length > max) {
    short = `${prefix}.../${shortFilename}`;
  }

  return short;
}
