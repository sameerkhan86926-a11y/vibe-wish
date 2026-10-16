export interface StarterPackCard {
  question: string;
  answer: string;
}

export interface CouplePhoto {
  id: string;
  url: string;
  caption: string;
}

export interface ShaadiIdiotsPayload {
  groomName: string;
  brideName: string;
  senderName: string;
  roastLines: string[];
  starterPack: StarterPackCard[];
  photos: CouplePhoto[];
  heartfeltLetter: string;
  finalWish: string;
}
