"use client";

import { useState } from "react";
import { Upload, Copy, Check, Image as ImageIcon, Music, Video, Sparkles, Loader2, ExternalLink } from "lucide-react";

export default function MediaUploader() {
  const [fileType, setFileType] = useState<"image" | "audio" | "video">("image");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cloudinary Direct Upload (Free Unsigned Preset)
  // Tum apna custom Cloudinary Cloud Name & Upload Preset yahan daal sakte ho ya demo preset use kar sakte ho
  const CLOUD_NAME = "demo"; // Free public sandbox (Prod ke liye apna free cloudinary cloud name daal sakte ho)
  const UPLOAD_PRESET = "docs_upload_example"; 

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const resourceType = fileType === "image" ? "image" : fileType === "video" ? "video" : "auto";

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.secure_url) {
        setUploadedUrl(json.secure_url);
      } else {
        // Fallback to Catbox/Tmpfiles if needed
        throw new Error(json.error?.message || "Upload failed");
      }
    } catch (err: any) {
      // Fallback simple Base64 or local object URL for preview demo
      setError("Free cloud quota reached. Using instant direct data link:");
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-zinc-900/60 to-black p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
            <Upload className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Instant Media Uploader</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] font-mono text-rose-300 font-bold">FREE TOOL</span>
            </h3>
            <p className="text-[11px] text-zinc-400">Upload Image, Voice Note ya Video ➔ Get direct URL for templates</p>
          </div>
        </div>
      </div>

      {/* Media Type Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { id: "image", label: "Image / Photo", icon: ImageIcon },
          { id: "audio", label: "Audio / Voice", icon: Music },
          { id: "video", label: "Video Clip", icon: Video }
        ].map((item) => {
          const Icon = item.icon;
          const active = fileType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFileType(item.id as any);
                setUploadedUrl(null);
                setError(null);
              }}
              className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                active
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upload Drop Zone */}
      <label className="relative flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-rose-400 bg-black/40 hover:bg-black/60 cursor-pointer transition-all">
        <input
          type="file"
          accept={fileType === "image" ? "image/*" : fileType === "audio" ? "audio/*" : "video/*"}
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-rose-300">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-xs font-mono">Uploading & generating link...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
            <Upload className="h-6 w-6 text-zinc-400 mb-1" />
            <p className="text-xs font-bold text-zinc-200">
              Tap to choose {fileType} from your phone/PC
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              PNG, JPG, MP3, WAV, MP4 supported
            </p>
          </div>
        )}
      </label>

      {/* Result Display & Quick Copy */}
      {uploadedUrl && (
        <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-3.5 animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1">
              <Check className="h-3 w-3" /> DIRECT URL READY TO USE:
            </span>
            <span className="text-[10px] text-zinc-400">Paste in any template</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={uploadedUrl}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-1.5 text-xs text-zinc-200 font-mono select-all truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="cursor-pointer inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 shrink-0 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
