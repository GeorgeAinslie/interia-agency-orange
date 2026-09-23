/**
 * Logo raster: `public/assets/interia-mark.png`.
 * If you replace the file, update `intrinsicWidth` / `intrinsicHeight` to match the new PNG
 * so `next/image` serves sharp derivatives (wrong ratio ⇒ tiny srcset ⇒ blurry upscale).
 */
export const interiaMarkAsset = {
  src: "/assets/interia-mark.png" as const,
  intrinsicWidth: 1600,
  intrinsicHeight: 400,
} as const;

/** Props for `next/image` layout — same aspect ratio as the PNG. */
export const interiaMarkImageLayout = {
  width: interiaMarkAsset.intrinsicWidth / 10,
  height: interiaMarkAsset.intrinsicHeight / 10,
} as const;
