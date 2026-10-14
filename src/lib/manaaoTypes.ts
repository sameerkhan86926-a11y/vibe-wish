export type TargetRelation = "gf" | "bf" | "bestie" | "special";

export interface ManaaoPayload {
  name: string;
  senderName: string;
  relation: TargetRelation;
  reasonTag?: string;
  customReason?: string;
  customLetter?: string;
  customPromise?: string;
}
