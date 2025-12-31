import { persistentAtom } from '@nanostores/persistent';
import type { WritableAtom } from 'nanostores';

// Create locale atom with localStorage persistence
export function createLocaleAtom(storageKey: string, initialLocale: string): WritableAtom<string> {
  return persistentAtom<string>(storageKey, initialLocale, {
    encode: JSON.stringify,
    decode: JSON.parse,
  });
}
