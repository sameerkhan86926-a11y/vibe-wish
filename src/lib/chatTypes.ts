export interface ChatBirthdayPayload {
  name: string;
  senderName: string;
  avatarUrl?: string;
  relationship: "bestie" | "partner" | "sibling" | "friend";
  customLetter?: string;
  treatLocation?: string;
}
