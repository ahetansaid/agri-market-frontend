"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Image agricole par défaut (public/default-product.jpg, photo Pexels libre). */
export const DEFAULT_PRODUCT_IMAGE = "/default-product.jpg";

/**
 * Image de produit avec repli automatique sur l'image par défaut :
 * - `src` absent/null (annonce sans photo) → image par défaut ;
 * - `src` qui échoue au chargement (URL morte, disque Render effacé, 404)
 *   → bascule sur l'image par défaut via `onError`.
 */
export function ProductImage({
  src,
  alt,
  ...props
}: Omit<ImageProps, "src"> & { src: string | null | undefined }) {
  const [current, setCurrent] = useState<string>(src || DEFAULT_PRODUCT_IMAGE);
  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        // Garde anti-boucle : ne re-tente pas si le défaut lui-même échoue.
        if (current !== DEFAULT_PRODUCT_IMAGE) setCurrent(DEFAULT_PRODUCT_IMAGE);
      }}
    />
  );
}
