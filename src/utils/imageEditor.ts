/**
 * Canvas-backed image edit primitives used by ImageEditor.vue.
 *
 * Each helper takes a source URL (the current "working" image), applies an
 * operation, and returns a fresh data URL of the result. The image editor
 * stores the result as the new working URL — destructive applies, single
 * working canvas (see grill-me notes).
 */

const PNG = 'image/png';
const JPEG = 'image/jpeg';
const WEBP = 'image/webp';

export function mimeForFilename(filename: string): string {
  const ext = (filename.split('.').pop() ?? '').toLowerCase();
  if (ext === 'png') return PNG;
  if (ext === 'webp') return WEBP;
  if (ext === 'gif') return PNG; // canvas can't write GIF, fall back to PNG
  return JPEG;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

function makeCanvas(width: number, height: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not acquire 2D canvas context');
  return { canvas, ctx };
}

/**
 * Bake a CSS-style filter chain into a new image. Used by grayscale and
 * brightness/contrast/saturation panels — the live preview applies the
 * same filter via CSS, then on Apply we render it into the bitmap so
 * subsequent operations see it.
 */
export async function bakeFilter(srcUrl: string, filter: string, mime: string): Promise<string> {
  const img = await loadImage(srcUrl);
  const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
  ctx.filter = filter;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(mime, mime === JPEG ? 0.92 : undefined);
}

/**
 * Rotate by a quarter-turn and/or flip on either axis. Width/height swap
 * for 90/270 degree rotations.
 */
export async function bakeRotation(
  srcUrl: string,
  rotation: 0 | 90 | 180 | 270,
  flipX: boolean,
  flipY: boolean,
  mime: string
): Promise<string> {
  const img = await loadImage(srcUrl);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const swap = rotation === 90 || rotation === 270;
  const { canvas, ctx } = makeCanvas(swap ? h : w, swap ? w : h);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotation) ctx.rotate((rotation * Math.PI) / 180);
  if (flipX || flipY) ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.drawImage(img, -w / 2, -h / 2);
  return canvas.toDataURL(mime, mime === JPEG ? 0.92 : undefined);
}

/**
 * Adjustment slider values are in [-100, 100] with 0 = neutral. Convert
 * them into the CSS filter string used both for live preview and for the
 * canvas bake.
 */
export function adjustToFilter(b: number, c: number, s: number): string {
  // Map -100..+100 to multipliers around 1.0.
  const brightness = 1 + b / 100;
  const contrast = 1 + c / 100;
  const saturate = 1 + s / 100;
  return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
}

export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return await res.blob();
}
