import LZString from "lz-string";

export function encodeData(payload: any): string {
  try {
    // Agar payload me koi galti se huge base64 data daal de (jaise data:image/... > 20000 chars)
    const jsonStr = JSON.stringify(payload);
    
    if (jsonStr.length > 50000) {
      alert("Warning: Photo/Audio ka URL bohot bada hai (Base64). Kripya homepage ke uploader se chhota direct link banayein!");
      return "";
    }

    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.error("Compression error:", err);
    return "";
  }
}

export function decodeData(encoded: string): any | null {
  try {
    const raw = LZString.decompressFromEncodedURIComponent(encoded);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
