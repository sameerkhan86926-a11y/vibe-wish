export interface WrappedCard {
  label: string;
  value: string;
  sub: string;
  accent: string;
}

export interface CameraRollPhoto {
  id: string;
  imgUrl: string;
  caption: string;
  dateTag?: string;
}

export interface NotificationAnniversaryPayload {
  partnerName: string;
  senderName: string;
  specialDate: string;
  chatDialogues: { sender: "you" | "them"; text: string; time: string }[];
  wrappedStats: WrappedCard[];
  cameraRoll: CameraRollPhoto[];
  blushingLetter: string;
  finalVow: string;
}
