export interface UserActivityItem {
  id: string;
  templateId: string;
  templateName: string;
  recipientName: string;
  url: string;
  createdAt: string;
  badge?: string;
}

const STORAGE_KEY = "vibe_wish_user_activities";

export function saveUserActivity(activity: Omit<UserActivityItem, "id" | "createdAt">) {
  if (typeof window === "undefined") return;

  try {
    const existing = getUserActivities();
    const newItem: UserActivityItem = {
      ...activity,
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Filter duplicates of same URL and keep top 20 recent
    const updated = [newItem, ...existing.filter((item) => item.url !== activity.url)].slice(0, 20);
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

export function clearAllActivities() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("vibe_activity_updated"));
}
