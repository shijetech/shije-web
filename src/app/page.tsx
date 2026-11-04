import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Interactive EdTech Platform
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Elevate Your Learning with <span className="text-indigo-600">Shije</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Join live interactive cohorts with top industry mentors, and never miss a beat with HD recordings, searchable lecture transcripts, and course notes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Explore Courses
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                View Live Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">🔴 Live Interactive Classes</h3>
              <p className="mt-3 text-slate-600">
                Engage directly with instructors in real-time. Ask questions via live chat, participate in polls, and collaborate with peers.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">📹 On-Demand Recordings</h3>
              <p className="mt-3 text-slate-600">
                Every live session is automatically archived in high resolution with chapter bookmarks, notes, and downloadable resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
