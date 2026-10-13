import LZString from "lz-string";
import { WishPayload } from "./types";

export function encodeData(payload: WishPayload): string {
  const jsonStr = JSON.stringify(payload);
  return LZString.compressToEncodedURIComponent(jsonStr);
}

export function decodeData(encoded: string): WishPayload | null {
  try {
    const raw = LZString.decompressFromEncodedURIComponent(encoded);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
