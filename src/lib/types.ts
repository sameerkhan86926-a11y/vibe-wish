export type VibeType = "partner" | "friend" | "father" | "anniversary";

export interface WishPayload {
  vibe: VibeType;
  to: string;
  from: string;
  headline: string;
  message: string;
  badge?: string;
  counterDays?: string;
  photoUrl?: string;
}
