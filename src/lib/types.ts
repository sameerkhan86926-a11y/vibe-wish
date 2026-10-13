export type VibeType = "police_fir" | "spotify_lofi" | "forbes_boss" | "netflix_premiere";

export interface WishPayload {
  vibe: VibeType;
  to: string;
  from: string;
  headline: string;
  message: string;
  crimeOrTag: string; // FIR crime / Spotify Album name / Forbes rank
  ratingOrStat: string; // e.g. "Bail Denied: ₹0" ya "99% Match"
  photoUrl?: string;
}
