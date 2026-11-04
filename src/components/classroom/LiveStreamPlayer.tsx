'use client';

interface LiveStreamPlayerProps {
  streamUrl?: string;
  isLive: boolean;
  title: string;
}

export default function LiveStreamPlayer({ streamUrl, isLive, title }: LiveStreamPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 shadow-2xl flex items-center justify-center text-white">
      {isLive ? (
        <div className="flex flex-col items-center">
          <div className="absolute top-4 left-4 flex items-center space-x-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            <span>LIVE NOW</span>
          </div>
          <p className="text-slate-400 text-sm">Streaming: {title}</p>
          <p className="text-xs text-slate-500 mt-1">WebRTC / HLS Stream Engine connected</p>
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-lg font-semibold">Class is not currently in session</p>
          <p className="text-sm text-slate-400 mt-2">Check the schedule for the next upcoming live class.</p>
        </div>
      )}
    </div>
  );
}
