"use client";

import { useEffect, useState } from "react";
import {
  getUserActivities,
  deleteUserActivity,
  clearAllActivities,
  UserActivityItem,
} from "@/lib/activityTracker";
import {
  Clock,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Sparkles,
  X,
  History,
} from "lucide-react";

export default function UserActivityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<UserActivityItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const refreshActivities = () => {
    setActivities(getUserActivities());
  };

  useEffect(() => {
    refreshActivities();

    const handleUpdate = () => refreshActivities();
    window.addEventListener("vibe_activity_updated", handleUpdate);
    return () => window.removeEventListener("vibe_activity_updated", handleUpdate);
  }, []);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Activity Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 cursor-pointer flex items-center gap-2 rounded-full border border-rose-500/30 bg-zinc-900/90 px-4 py-2.5 text-xs font-mono font-bold text-rose-300 backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 transition-all group"
      >
        <History className="h-4 w-4 text-rose-400 group-hover:rotate-45 transition-transform" />
        <span>My Created Vibes</span>
        {activities.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {activities.length}
          </span>
        )}
      </button>

      {/* Slide-over Activity Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md h-full bg-[#0c0910] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <History className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Your Created Vibes</h3>
                    <p className="text-[11px] text-zinc-400 font-mono">Saved locally in your browser</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Activity List */}
              {activities.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Sparkles className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-xs font-semibold text-zinc-300">No vibes created yet!</p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Jab aap koi template banayenge, uski direct link yahan automatically save ho jayegi.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all hover:border-rose-500/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                            {item.templateName}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-0.5">
                            For: {item.recipientName}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                            {item.createdAt}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteUserActivity(item.id)}
                          className="cursor-pointer opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-opacity"
                          title="Delete from history"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-zinc-800/50">
                        <button
                          type="button"
                          onClick={() => handleCopy(item.id, item.url)}
                          className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800 px-3 py-1.5 text-[11px] font-mono text-zinc-200 hover:bg-zinc-700"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-[11px] font-mono font-bold text-white hover:bg-rose-500"
                        >
                          <span>Open Vibe</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {activities.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>{activities.length} saved</span>
                <button
                  type="button"
                  onClick={clearAllActivities}
                  className="cursor-pointer hover:text-red-400 transition-colors"
                >
                  Clear all history
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
