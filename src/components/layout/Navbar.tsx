import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tight text-indigo-600">SHIJE</span>
          <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">Edu</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
          <Link href="/courses" className="hover:text-indigo-600 transition">Courses</Link>
          <Link href="/dashboard" className="hover:text-indigo-600 transition">Live Schedule</Link>
          <Link href="/dashboard" className="hover:text-indigo-600 transition">Recordings</Link>
        </nav>
        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Join Shije
          </Link>
        </div>
      </div>
    </header>
  );
}
