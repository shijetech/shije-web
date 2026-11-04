'use client';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
}

export default function VideoPlayer({ videoUrl, title, thumbnailUrl }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-black shadow-lg">
      <video
        controls
        poster={thumbnailUrl}
        className="h-full w-full max-h-[550px] object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bg-slate-900 p-4 text-white">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-xs text-slate-400 mt-1">HD Recording • On-demand replay available anytime</p>
      </div>
    </div>
  );
}
