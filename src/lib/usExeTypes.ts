export interface UsChapter {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  note: string;
  photoUrl?: string;
}

export interface UsExePayload {
  name1: string;
  name2: string;
  anniversaryDate?: string;
  stats?: {
    loveLevel?: string;
    cuteFights?: string;
    missingLevel?: string;
    hugUrgency?: string;
  };
  secretLetter?: string;
  finaleMessage?: string;
  chapters: UsChapter[];
}
