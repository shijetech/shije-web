import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Learning Hub</h1>
          <p className="text-sm text-slate-500">Access your enrolled live sessions and archived recordings</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Live Classes */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Your Live Classes</h2>
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" /> LIVE NOW
              </span>
              <h3 className="mt-2 font-semibold text-slate-900">Distributed Caching with Redis & Go</h3>
              <p className="text-xs text-slate-500 mt-1">Instructor: Marcus Vance • Started 15m ago</p>
            </div>
            <Link
              href="/live/live-101"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Join Classroom
            </Link>
          </div>
        </div>

        {/* Recent Recordings */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Class Recordings</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="font-semibold text-sm text-slate-900">Database Indexing Deep Dive</h4>
              <p className="text-xs text-slate-500 mt-1">Recorded on Nov 02 • 1h 45m</p>
              <Link href="/recordings/rec-1" className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:underline">
                Watch Recording →
              </Link>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">Microservice Inter-communication</h4>
              <p className="text-xs text-slate-500 mt-1">Recorded on Oct 28 • 2h 10m</p>
              <Link href="/recordings/rec-2" className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:underline">
                Watch Recording →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
