"use client";

import { useEffect, useState } from "react";
import {
  getUserActivities,
  deleteUserActivity,
  clearAllActivities,
  fetchLiveViews,
  UserActivityItem,
} from "@/lib/activityTracker";
import {
  History,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Activity,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function UserActivityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<UserActivityItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refreshActivities = async () => {
    const list = getUserActivities();
    setActivities(list);

    // Fetch live views for items
    for (const item of list) {
      fetchLiveViews(item.id).then((count) => {
        if (count !== null) {
          setActivities((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, viewsCount: Math.max(a.viewsCount || 0, count) } : a))
          );
        }
      });
    }
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

  const handleDelete = (id: string) => {
    deleteUserActivity(id);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          refreshActivities();
        }}
        className="fixed bottom-6 right-6 z-40 cursor-pointer flex items-center gap-2 rounded-full border border-rose-500/40 bg-zinc-950/90 px-4 py-2.5 text-xs font-mono font-bold text-rose-300 backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <History className="h-4 w-4 text-rose-400" />
        <span>Vibe Activity</span>
        {activities.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {activities.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md h-full bg-[#0d0a12] border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Vibe Activity & Clicks</h3>
                    <p className="text-[11px] text-zinc-400 font-mono">Live clicks, actions & link history</p>
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

              {/* Items List */}
              {activities.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <Sparkles className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-xs font-semibold text-zinc-300">Koi vibe create nahi hui abhi tak</p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Jaise hi aap link create karke share karenge, clicks aur activity yahan dikhegi.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((item) => {
                    const isExpanded = expandedId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all hover:border-zinc-700"
                      >
                        {/* Title & Delete */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                              {item.templateName}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-0.5">
                              For: {item.recipientName}
                            </h4>
                            <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                              Created: {item.createdAt}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="cursor-pointer p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                            title="Delete this item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Telemetry Stats: Views Count */}
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-black/60 px-3 py-2 border border-zinc-800/80">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{item.viewsCount ?? 1} Clicks / Opens</span>
                          </div>

                          {item.lastActions && item.lastActions.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : item.id)}
                              className="cursor-pointer text-[10px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                            >
                              <span>{item.lastActions.length} Actions</span>
                              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>
                          )}
                        </div>

                        {/* "Kya Kiya" Action Log Dropdown */}
                        {isExpanded && item.lastActions && (
                          <div className="mt-2 space-y-1 rounded-xl bg-zinc-950 p-2.5 border border-zinc-800/60 text-[10px] font-mono text-zinc-300 animate-in fade-in">
                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                              User Activity Timeline:
                            </span>
                            {item.lastActions.map((act, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-zinc-300">
                                <span className="h-1 w-1 rounded-full bg-rose-400" />
                                <span className="truncate">{act}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action buttons: Copy & Open */}
                        <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                          <button
                            type="button"
                            onClick={() => handleCopy(item.id, item.url)}
                            className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800 px-3 py-1.5 text-[11px] font-mono text-zinc-200 hover:bg-zinc-700 transition-colors"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
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
                            className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-[11px] font-mono font-bold text-white hover:bg-rose-500 transition-colors"
                          >
                            <span>Open Vibe</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {activities.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>{activities.length} total saved</span>
                <button
                  type="button"
                  onClick={clearAllActivities}
                  className="cursor-pointer hover:text-red-400 transition-colors"
                >
                  Delete all history
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
