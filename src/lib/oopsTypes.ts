export interface OopsMemory {
  id: string;
  imgUrl: string;
  caption: string;
  sticker?: string;
}

export interface OopsBirthdayPayload {
  name: string;
  senderName: string;
  relationship: "bestie" | "partner" | "sibling" | "special";
  customRoast?: string;
  customLetter?: string;
  customFinalMessage?: string;
  memories: OopsMemory[];
}
