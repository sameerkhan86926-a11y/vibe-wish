export interface ProposalStoryCard {
  id: string;
  title: string;
  iconName: string;
  note: string;
  photoUrl?: string;
}

export interface BloomingLovePayload {
  partnerName: string;
  senderName: string;
  proposalType: "mine" | "marry";
  customLetter?: string;
  storyCards: ProposalStoryCard[];
}
