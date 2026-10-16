export interface UserActivityAction {
  actionName: string;
  timestamp: string;
}

export interface UserActivityItem {
  id: string; // unique hash key used as telemetry ID
  templateId: string;
  templateName: string;
  recipientName: string;
  url: string;
  createdAt: string;
  viewsCount?: number;
  lastActions?: string[];
}

const STORAGE_KEY = "vibe_wish_user_activities";

export function saveUserActivity(activity: {
  id: string;
  templateId: string;
  templateName: string;
  recipientName: string;
  url: string;
}) {
  if (typeof window === "undefined") return;

  try {
    const existing = getUserActivities();
    const alreadyExists = existing.find((item) => item.id === activity.id);

    const newItem: UserActivityItem = {
      ...activity,
      createdAt: alreadyExists
        ? alreadyExists.createdAt
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
      viewsCount: alreadyExists ? alreadyExists.viewsCount || 1 : 1,
      lastActions: alreadyExists ? alreadyExists.lastActions || [] : ["Link Created"],
    };

    const updated = [newItem, ...existing.filter((item) => item.id !== activity.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("vibe_activity_updated"));
  } catch (err) {
    console.error("Failed to save activity:", err);
  }
}

export function getUserActivities(): UserActivityItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// 1. Delete Single Activity
export function deleteUserActivity(id: string) {
  if (typeof window === "undefined") return;
  try {
    const existing = getUserActivities();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("vibe_activity_updated"));
  } catch (err) {
    console.error("Failed to delete activity:", err);
  }
}

// 2. Clear All Activities
export function clearAllActivities() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("vibe_activity_updated"));
}

// 3. Live Telemetry: Track Clicks & Inside Actions (Free Counter API)
export async function trackVibeEvent(telemetryId: string, eventType: "view" | "action", actionDetail?: string) {
  if (typeof window === "undefined" || !telemetryId) return;

  const cleanNamespace = "vibewish_v1";
  const cleanKey = telemetryId.substring(0, 24).replace(/[^a-zA-Z0-9_-]/g, "");

  try {
    if (eventType === "view") {
      // Hit counter increment
      fetch(`https://api.counterapi.dev/v1/${cleanNamespace}/${cleanKey}/up`, { mode: "cors" }).catch(() => {});
    }

    // Also update local record if open on creator's device
    const existing = getUserActivities();
    const item = existing.find((i) => i.id === telemetryId);
    if (item) {
      if (eventType === "view") {
        item.viewsCount = (item.viewsCount || 0) + 1;
      }
      if (actionDetail) {
        item.lastActions = [
          `${actionDetail} (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
          ...(item.lastActions || []).slice(0, 4),
        ];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new Event("vibe_activity_updated"));
    }
  } catch {}
}

// Fetch live views from network
export async function fetchLiveViews(telemetryId: string): Promise<number | null> {
  const cleanNamespace = "vibewish_v1";
  const cleanKey = telemetryId.substring(0, 24).replace(/[^a-zA-Z0-9_-]/g, "");
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/${cleanNamespace}/${cleanKey}`, { mode: "cors" });
    const data = await res.json();
    return data && typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}
