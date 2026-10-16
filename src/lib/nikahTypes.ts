export interface NikahPayload {
  brideName: string;
  groomName: string;
  brideFamily: string;
  groomFamily: string;
  weddingDate: string; // ISO string e.g. "2026-11-20T18:00:00" or readable
  nikahDay: string;
  nikahTime: string;
  venueName: string;
  venueAddress: string;
  mapsUrl?: string;
  hasWalima?: boolean;
  walimaDate?: string;
  walimaTime?: string;
  walimaVenue?: string;
  walimaAddress?: string;
  rsvpContactNumber?: string; // WhatsApp number for direct real RSVP
}
