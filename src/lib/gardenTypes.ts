export interface GardenMemoryItem {
  id: string;
  label: string;
  sublabel: string;
  imgUrl: string;
  storyNote: string;
}

export interface GardenUsPayload {
  partner1: string;
  partner2: string;
  specialDate: string;
  beginningNote?: string;
  secondFlowerNote?: string;
  thirdFlowerNote?: string;
  moonlightLetter?: string;
  finalMessage?: string;
  rosePickMessage?: string;
  tulipPickMessage?: string;
  whiteFlowerPickMessage?: string;
  memories: GardenMemoryItem[];
}
