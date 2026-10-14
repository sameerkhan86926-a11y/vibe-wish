export interface PhoneMemory {
  id: string;
  dateStr: string;
  imgUrl: string;
  caption: string;
}

export interface AakhriMessagePayload {
  recipientName: string;
  senderName: string;
  chatMessages: string[];
  memories: PhoneMemory[];
  voiceAudioUrl?: string; // Optional user audio upload / direct link
  voiceTranscript: string;
  unsentDraft: string;
  finalSecret: string;
}
