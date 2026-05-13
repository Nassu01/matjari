import { useEffect, useMemo, useState } from "react";

export const images11ManifestUrl = "/images/11/images.json";

let cachedImages = null;
let pendingImagesRequest = null;

function normalizeImages(payload) {
  if (!Array.isArray(payload?.images)) return [];

  return payload.images.filter((image) => image?.url && image?.path);
}

export function getDisplayImages11(images) {
  const usable = Array.isArray(images) ? images : [];
  const nonSvg = usable
    .filter((image) => image.extension !== "svg")
    .sort((a, b) => Number(b.size || 0) - Number(a.size || 0));

  return nonSvg.length ? nonSvg : usable;
}

export function imageFromImages11(images, index = 0) {
  if (!Array.isArray(images) || images.length === 0) return null;
  return images[index % images.length] || null;
}

export function imageUrlFromImages11(images, index = 0) {
  return imageFromImages11(images, index)?.url || "";
}

async function loadImages11() {
  if (cachedImages) return cachedImages;

  if (!pendingImagesRequest) {
    pendingImagesRequest = fetch(images11ManifestUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Images request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        cachedImages = normalizeImages(payload);
        return cachedImages;
      })
      .finally(() => {
        pendingImagesRequest = null;
      });
  }

  return pendingImagesRequest;
}

export default function useImages11() {
  const [images, setImages] = useState(cachedImages || []);
  const [status, setStatus] = useState(cachedImages ? "success" : "loading");

  useEffect(() => {
    let active = true;

    loadImages11()
      .then((payload) => {
        if (!active) return;
        setImages(payload);
        setStatus("success");
      })
      .catch(() => {
        if (!active) return;
        setImages([]);
        setStatus("failed");
      });

    return () => {
      active = false;
    };
  }, []);

  const displayImages = useMemo(() => getDisplayImages11(images), [images]);

  return { images, displayImages, status };
}
