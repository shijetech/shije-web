import VideoPlayer from "@/components/recordings/VideoPlayer";

export default function RecordingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            title="Database Indexing Deep Dive - Recording"
          />
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Lecture Summary & Notes</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              In this session, we explored B-tree indexing vs LSM-trees, query execution plans, composite indexes, and real-world optimization techniques.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="font-semibold text-slate-900 text-sm">Class Chapters</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex justify-between p-2 rounded hover:bg-slate-50 cursor-pointer">
                <span>1. Introduction & Agenda</span>
                <span className="font-mono text-indigo-600">00:00</span>
              </li>
              <li className="flex justify-between p-2 rounded hover:bg-slate-50 cursor-pointer">
                <span>2. B-Tree Data Structure Internals</span>
                <span className="font-mono text-indigo-600">14:20</span>
              </li>
              <li className="flex justify-between p-2 rounded hover:bg-slate-50 cursor-pointer">
                <span>3. EXPLAIN ANALYZE in PostgreSQL</span>
                <span className="font-mono text-indigo-600">45:10</span>
              </li>
              <li className="flex justify-between p-2 rounded hover:bg-slate-50 cursor-pointer">
                <span>4. Q&A and Common Mistakes</span>
                <span className="font-mono text-indigo-600">1:15:30</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
