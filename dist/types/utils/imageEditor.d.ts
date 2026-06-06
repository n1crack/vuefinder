/**
 * Canvas-backed image edit primitives used by ImageEditor.vue.
 *
 * Each helper takes a source URL (the current "working" image), applies an
 * operation, and returns a fresh data URL of the result. The image editor
 * stores the result as the new working URL — destructive applies, single
 * working canvas (see grill-me notes).
 */
export declare function mimeForFilename(filename: string): string;
export declare function loadImage(src: string): Promise<HTMLImageElement>;
/**
 * Bake a CSS-style filter chain into a new image. Used by grayscale and
 * brightness/contrast/saturation panels — the live preview applies the
 * same filter via CSS, then on Apply we render it into the bitmap so
 * subsequent operations see it.
 */
export declare function bakeFilter(srcUrl: string, filter: string, mime: string): Promise<string>;
/**
 * Rotate by a quarter-turn and/or flip on either axis. Width/height swap
 * for 90/270 degree rotations.
 */
export declare function bakeRotation(srcUrl: string, rotation: 0 | 90 | 180 | 270, flipX: boolean, flipY: boolean, mime: string): Promise<string>;
/**
 * Adjustment slider values are in [-100, 100] with 0 = neutral. Convert
 * them into the CSS filter string used both for live preview and for the
 * canvas bake.
 */
export declare function adjustToFilter(b: number, c: number, s: number): string;
export declare function dataUrlToBlob(dataUrl: string): Promise<Blob>;
