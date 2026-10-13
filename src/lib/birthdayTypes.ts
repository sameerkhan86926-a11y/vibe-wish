// src/lib/birthdayTypes.ts
export type BirthdayTheme = "romantic" | "luxury" | "bestie" | "cute";

export interface BirthdayMemory {
  id: string;
  imgUrl: string;
  caption: string;
  yearTag?: string;
}

export interface BirthdayPayload {
  name: string;
  senderName: string;
  birthDate?: string;
  theme: BirthdayTheme;
  heroHeadline: string;
  heroMessage: string;
  envelopeLetter: string;
  surpriseType: "gift" | "secret_photo" | "final_love";
  surpriseSecretNote: string;
  surprisePhotoUrl?: string;
  memories: BirthdayMemory[];
}
